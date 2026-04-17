// Optional LLM-based rubric scoring via local mlx_lm.server (path C of
// 2026-04-16 Research Loop). Graceful null return when the server is
// unreachable — the caller (scorer/index.js) should skip this dimension
// entirely in that case, preserving the 7-module rule-based floor.
//
// Status: POC stub, NOT wired into scorer/index.js aggregation. Master can
// import manually to A/B test before deciding on weight integration.
//
// To activate the backing server (master-local only):
//   /opt/anaconda3/bin/python3.13 -m mlx_lm.server \
//     --model mlx-community/Phi-3.5-mini-instruct-4bit \
//     --port 8080 --cors-allow "*"
//
// Server can be killed any time; this module silently returns null on the
// next fetch attempt — no errors surface to end users.

const ENDPOINT = 'http://localhost:8080/v1/chat/completions'
const TIMEOUT_MS = 8000

// Simplified 3-trait rubric — arxiv 2505.01035 (2025-05) shows simplified
// rubrics match full-rubric accuracy on TOEFL11 for 3 of 4 tested models,
// so we keep the prompt short to minimize inference time.
const RUBRIC_SYSTEM_PROMPT = `你是 TOEFL Independent Writing 评分员。按三个维度各打 0-5 整数分并返回 JSON。
1. coherence: 论点组织、段间衔接、逻辑链清晰度
2. task_response: 是否充分回应 prompt、立场明确、论据相关
3. lexical_sophistication: 高阶词汇多样性、搭配自然度

仅返回 JSON，不要任何解释或 code fence：
{"coherence":X,"task_response":Y,"lexical":Z,"rationale":"一句话评语"}`

/**
 * Score an essay via local MLX-backed LLM.
 * @param {string} text - essay content
 * @param {string} [taskType] - 'discussion' | 'email' | 'general' (unused by
 *   stub, kept for signature parity with other scorer modules)
 * @param {string} [promptText] - the original prompt if available
 * @returns {Promise<null | { value: number, details: string, rationale: string, errors: [] }>}
 *   null = LLM dimension unavailable (server off, network error, malformed
 *   response). Callers must handle null by falling back to rule-based score.
 */
export async function score(text, taskType = 'general', promptText = '') {
  if (!text || text.length < 40) return null

  const userPrompt = `Prompt: ${promptText || '(none)'}\n\nEssay:\n${text}`

  try {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)

    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: 'local',
        messages: [
          { role: 'system', content: RUBRIC_SYSTEM_PROMPT },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0,
        max_tokens: 150,
      }),
    })
    clearTimeout(timer)

    if (!response.ok) return null
    const data = await response.json()
    const content = data?.choices?.[0]?.message?.content ?? ''

    // Extract JSON — LLMs often wrap in code fences or add prose. The regex
    // targets the 3-trait JSON shape so stray ```json fences are handled.
    const jsonMatch = content.match(/\{[^{}]*(?:"coherence"|"task_response"|"lexical")[\s\S]*?\}/)
    if (!jsonMatch) return null

    let parsed
    try {
      parsed = JSON.parse(jsonMatch[0])
    } catch {
      return null
    }

    const coh = clamp01(Number(parsed.coherence) / 5)
    const tr = clamp01(Number(parsed.task_response) / 5)
    const lex = clamp01(Number(parsed.lexical) / 5)

    // Equal-weighted average of 3 traits → [0, 1] to match other scorer modules
    const value = (coh + tr + lex) / 3

    return {
      value,
      details: `LLM rubric: coh=${coh.toFixed(2)} tr=${tr.toFixed(2)} lex=${lex.toFixed(2)}`,
      rationale: typeof parsed.rationale === 'string' ? parsed.rationale : '',
      errors: [],
    }
  } catch {
    return null
  }
}

function clamp01(x) {
  if (!Number.isFinite(x)) return 0
  return Math.max(0, Math.min(1, x))
}

export function suggest(analysis) {
  if (!analysis?.rationale) return []
  return [`AI 评语：${analysis.rationale}`]
}
