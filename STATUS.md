# TOEFL Practice — 进度交接书

## 项目概述
TOEFL 2026 格式练习平台，覆盖 Reading + Writing 三大任务，写作模块内置 7 维度 e-rater 评分引擎（2026-04-12 对标 Attali & Burstein 重校正权重），词汇本支持主动回忆复习。面向备考学生。

## 当前状态
开发中，未部署。功能已相当完整：写作、阅读、词汇本、仪表盘全部打磨完毕。最高优先级阻断：部署（需用户提供 Vercel Secrets）。

## 技术栈
React 19 + Vite 6 + React Router 7 + Express (可选代理) — 纯 JSX，无 TypeScript

## 部署信息
- 线上地址：无
- 托管平台：无（可部署为 Vite 静态 SPA）
- 数据库：无（全部 localStorage）
- 仓库：https://github.com/chalessishas/TOEFL-Practice
- 主分支：`main`
- 其他分支：`claude/compassionate-tu`

## 环境变量清单
| 变量名 | 用途 | 获取方式 |
|--------|------|----------|
| `ANTHROPIC_API_KEY` | Express 代理转发 Anthropic API（可选） | Anthropic Console |
| `PORT` | 服务器端口（默认 3000） | 自定义 |

前端零环境变量依赖。

## 架构 / 数据流
```
路由结构：
/ (Home) → 仪表盘，3 个写作模块 + 阅读入口
/reading → 阅读练习（Legacy 文章 + Pack 6 模块）
/writing → 写作任务选择
  /writing/build-sentence → 拖拽造句 (10 题, 7 分钟)
  /writing/email → 邮件写作 (130-140 词, 7 分钟)
  /writing/discussion → 学术讨论 (120+ 词, 10 分钟)

写作评分流程：
用户提交 → scorer/index.js (加权 7 维, 2026-04-12 重校正)
  ├→ Organization (33%) — 结构、连贯性、peer engagement
  ├→ Development (28%) — 内容深度、举例（argument structure ceiling for essays）
  ├→ Vocabulary (14%) — 词汇丰富度
  ├→ Mechanics  (6%)  — 拼写、标点（275k 词典）
  ├→ Relevance  (5%)  — keyword overlap with prompt (stem-normalized)
  ├→ Grammar    (7%)  — 语法错误
  └→ Style      (7%)  — TTR/句长方差/句型多样性/casual penalty
  → 原始分 [0-1] 映射到 TOEFL 0-5 分 → 字母评级

状态存储：localStorage
  toefl-reading-progress / toefl-writing-build-sentence / toefl-completion-history
```

## 已完成
- [100%] 阅读模块：Urban Agriculture 文章 + 10 题 + Pack 6 (6 模块)
- [100%] 填空题 (Complete Words)
- [100%] 写作三大任务：造句（20 题选 10）/ 邮件（10 条 prompt）/ 讨论（10 条 prompt）
- [100%] e-rater 7 维评分引擎 + 275k 英文词典（拼写误报率接近 0）
- [100%] 字母评级系统 (Excellent/Good/Fair/Weak)
- [100%] 定时器 + 全屏任务界面
- [100%] 进度自动保存 (localStorage)
- [100%] 侧边栏 5 面板：练习 / 进度 / 笔记本 / 学习计划 / 设置

## 进行中 / 待完成
- [100%] 深色模式 — 全站覆盖，含 Reading 4 个子组件 (0a555fe)
- [100%] 设置项联动 — 计时器显隐 + 快捷键提示 + 暗色模式，localStorage 持久化 (d854931)
- [100%] 写作内容扩充 — BuildSentence 20题(每次随机10)，邮件10组，讨论10组 (4c4284e)
- [100%] 学习计划动态化 — 7 日滚动日历 + streak 计数 + 今日高亮 (5a69994)
- [100%] 个人最佳记录 — WritingResult 显示 ★ New personal best! 或 delta (191a93c)
- [100%] 笔记本生词本 — localStorage 持久化，支持新增/删除，预置 5 词
- [100%] 笔记本升级 (2026-04-12) — 掌握度三级（new/learning/known）彩点 + 点击循环 (8607cf7)
- [100%] 笔记本上下文语境句 — 添加时可录入，卡片正面截断展示 (8607cf7)
- [100%] 笔记本主动回忆 review mode — 弱词优先（new→learning→known），Space/←/→ 键盘操作 (f08d30d→667b43b→f1445ec)
- [100%] 笔记本 mastery filter tabs — All/New/Learning/Known 四级过滤 + ▶ Review 入口 (8e89dd4)
- [100%] 笔记本 TSV 导出 — Anki 兼容格式 (8edfbb8)
- [100%] Home 仪表盘升级 — 5 项统计（含 Reading Accuracy + Day Streak 🔥）(8607cf7→bc1d694)
- [100%] Home 写作趋势 sparkline — 固定 0-5 轴，delta 徽章，三条参考线 (8a1ea63→8edfbb8)
- [100%] 阅读分数展示 — 模块卡片 "8/10" 彩色徽章，历史保留最高分 (bc1d694→110f41c)
- [100%] 评分权重重校正 — 对标 Attali & Burstein 2006 + ETS RR-04-04 (80e53b6)
- [100%] pack6 题型扩展 — negative_fact + sentence_simplification，共 6 题型 (a3ca6d7)
- [100%] pack6 text_insertion 题型 — ■A/■B/■C/■D 段落内嵌标记 + insert_sentence 展示框 (fba8874)
- [100%] pack6 M2 内容补全 — dl1（社区太阳能邮件）+ dl2（办公室节能通知），5 道新题 (507df20)
- [100%] pack6 M3 新增 — 气候系统填词 + 海洋酸化学术段落 + dl1/dl2 日常场景，11 道新题 (29d0692)
- [100%] pack6 M4 新增 — 古代贸易路线填词 + 哥伦布大交换学术段落，11 道新题 (acd8269)
- [100%] pack6 M5 新增 — 记忆与大脑填词 + 记忆重构学术段落，12 道新题 (f2dc7eb)
- [100%] pack6 M6 新增 — 人类交流填词 + 语言习得关键期学术段落，12 道新题 (84568ee) ← Pack 6 完整 6 模块达成
- [100%] 评分引擎 v2 (2026-04-12) — style casual penalty + development argStructure ceiling + mechanics 6%/style 7% reweight
- [100%] 笔记本 share-via-URL — ?vocab= Base64 param，导入时与本地 merge，URL 加载后自动清除
- [100%] ReadingHome "Shorter Than Exam" 徽章 — 修正方向（平台文章 200-500w，真实考试 ~700w）
- [100%] DailyLifeReading 邮件头优化 — From/To/Subject 三行展示
- [100%] argumentStructureScore email 修复 — email 任务跳过 thesis/reason ceiling，避免虚假惩罚 (7897849)
- [100%] organization suggest() 任务类型感知 — email/general 不再显示 discussion 专属提示 (5468609)
- [100%] style.js 词边界修复 — 'cause' 不再匹配 'because'，'thing' 不再匹配 'something' (f215a7d)
- [100%] grammar.js comma splice 误报修复 — "While X, I believe Y" 不再被标记为逗号粘连 (1f2c804)
- [100%] development.js THESIS_MARKERS 扩展 — "I side with/support/contend" 等 14 个模式加入，ETS sampleResponse argScore 0.35→1.00 (089e766)
- [100%] development.suggest() 修复 — 有 1 个 example 时不再建议"加例子"，条件改为仅 0 标记触发 (b4ba2dc)
- [100%] grammar.js 称呼误报修复 — "Dear Mr" 不再被标记为句子片段，salutationPattern 守卫 (b4ba2dc)
- [100%] organization.js 结尾位置奖惩 — 结语词在末段 +0.1，在首段 -0.1 (f383dd4)
- [100%] development.js 重复主张惩罚 — 3+ 无支撑的意见句 -0.15（敷衍重复的识别）(f383dd4)
- [100%] pack6 M5 Q12 text_insertion 段落索引修复 — paragraph 1→3，■A/■B/■C/■D 现在指向正确段落 (edece28)
- [100%] grammar.js SVA 检测 — 4 个高精度模式（everyone/each/the number of/不可数名词，ESL #1 错误类型）(5beef55)
- [100%] relevance.js 邮件逐条 goal 评分 — 3 个 goals 独立覆盖检测，suggest() 精确指出未覆盖的 goal (64e31cc)
- [100%] organization.js 话语标记类别多样性 — 6 种功能类别（对比/补充/结论/举例/顺序/阐发）+ inferential/concessive 比例奖励 (145384e)
- [100%] 评分引擎 v3 校准 (2026-04-12) — Email 样例平均 4.73/5（原 3.85），Discussion 样例平均 4.01/5（原 3.52）；邮件/讨论任务各维度权重独立校准 (c2087ae)
- [100%] vocabulary.js MTLD — 双向 MTLD 替换 TTR（McCarthy & Jarvis 2010，与人工评分 r=0.79 vs TTR r=0.61）
- [100%] organization.js 3-zone bonus — discussion 三区结构检测（Burstein 2003，位置模型 org-score Pearson +4）
- [100%] scorer/index.js build-a-sentence guard — 2026 新题型直接返回 0 不走 prose 评分
- [100%] grammar.js a/an 冠词错误检测 — 7/7 真错误命中，0 误报（排除 university/European/unique 等 /j/ 音词）(78fa6b1)
- [100%] mechanics.js 误报修复 — 字典未加载时跳过拼写检查（原行为：15k fallback 将 "commute/eliminates/mentorship" 等正确词误标为拼写错误）(54bab35)
- [100%] grammar.js SVA 扩展 — 新增 3 条高精度模式：he/she/it have→has、he/she/it are→is、you/we/they was→were；0 误报 (ed87925)
- [100%] development.js DETAIL_MARKERS 扩展 — 补入学术引证模式（research shows/suggests、as evidenced by 等），高分段不再因回避 "for example" 被低估 (76be0ea)
- [100%] style.js 缩写惩罚 — 添加 23 条缩写词到 CASUAL_TERMS，修复 TTR 虚增 bug (55cd1d6)
- [100%] grammar.js 介词搭配错误 — 8 条高精度模式（depend of/interested on/discuss about 等），ESL #3 错误类型 (a67669c)
- [100%] development.js 反驳论证标记 — REASON_MARKERS 新增 "one might argue/critics argue/admittedly" 等；AESPA 2025 确认有无反驳意识分差 0.3-0.5 分 (a67669c)
- [100%] relevance.js 同义词扩展 — 11 个 TOEFL 话题同义词组，近义词击中计 0.6 分，配套设置 floor=0.4（≥2 组命中时），释义式回答不再被过度惩罚 (a67669c) — 添加 23 条缩写词（it's/can't/don't/I'm/you're 等）到 CASUAL_TERMS；缩写原先因 TTR 唯一 token 误增分，现正确下调；重度缩写文本 0.40 vs 正式文本 0.74 (55cd1d6) — 补入学术引证模式（"research shows", "studies suggest", "as evidenced by", "based on" 等），高分段写作不再因回避 "for example" 被低估 (76be0ea)：he/she/it have→has、he/she/it are→is、you/we/they was→were；0 误报（modal 构式通过）(ed87925) — 字典未加载时跳过拼写检查（原行为：15k fallback 将 "commute/eliminates/mentorship" 等正确词误标为拼写错误）(54bab35) — 7/7 真错误命中，0 误报（排除 university/European/unique 等 /j/ 音词）(78fa6b1)
- [100%] vocabulary.js AWL 扩展 — sublists 4-6+ 补入 ~100 新词（inevitable/empirical/contradict/explicit 等），AWL_CORE 从 ~100 扩至 ~200 词 (020b338)
- [100%] style.js COMPLEX_PATTERNS — 5→10 模式，修复大写首字母大小写 bug（Despite/Whether 等句首词原本不命中），高级文章 6/10 vs 简单文章 1/10，区分度显著提升 (020b338)
- [100%] E2E 实测通过 — Discussion 4.3/5、Email 4.9/5，7 维 breakdown 正常，On-Topic 维度展示正确
- [100%] text_insertion 题型标注 "Pre-2026" — Research Loop 3 确认该题型已于 2026-01-21 从 TOEFL 移除，typeLabels 添加 ✦ Pre-2026 提示
- [100%] grammar.js 中文 L1 迁移错误检测 — 双连词错误（although...but / because...so，中文虽然/但是/因为/所以配对迁移）+ 系动词脱落（he/she very ADJ，中文谓语形容词无需 be 动词）；12/12 测试通过，0 误报 (d46b0c0)
- [100%] grammar.js 量词+单数名词复数脱落 — 17 条常用可数名词白名单（"many student"→错，"several factor"→错），中文无复数词缀迁移；含正确复数变形（approach→approaches, strategy→strategies）；6/6 错误命中，0 误报 (6a14a93)
- [100%] organization.js hedging 第 7 类话语标记 — perhaps/arguably/this suggests 等 11 个认识立场标记；e-rater 明确追踪学术写作中的观点修饰用词；同步补充 8 个各类别缺失标记（by contrast/likewise/it follows that/a case in point 等）(b629851)
- [100%] grammar.js 数量词+不可数名词错误 — "many research/several evidence/numerous information" 等 11 个 TOEFL 高频不可数名词；负向前瞻排除定语用法（"several research papers" 不标）；与 QUANT_BARE_RE 合称「量词三件套」(e21801c)
- [100%] organization.js 2026 peer engagement 扩展 — 新增 "as [Name] noted/mentioned/argued"（引语归属）+ "to expand on/expanding on/I would add to/responding to"（展开建构）；Score 4→5 区分度提升 (4752c8a)
- [100%] development.js 隐式例证标记 — "take the case/consider the fact/far more than/this is evident" 等 11 条；Sample 5 分范文 dev 0.648→0.71；高分段不再因不写"for example"而被低估 (f605e83)
- [0%] 笔记本后端同步（跨设备）
- [0%] 用户认证系统
- [0%] Listening 模块（需用户决策：真实音频 or 浏览器 TTS）
- [0%] 部署上线（需提供 VERCEL_TOKEN / VERCEL_ORG_ID / VERCEL_PROJECT_ID）

## 关键决策记录
| 日期 | 决策 | 原因 |
|------|------|------|
| - | 用 275k 词典替代简单拼写检查 | 99.8% 准确率，几乎消除拼写误报 |
| - | 百分制改为字母评级 | 百分制给用户错误的精度预期，字母评级更直观 |
| - | 纯客户端评分，不调 API | 零延迟 + 离线可用，且不产生 API 成本 |
| - | english-words.js 单独 chunk | 2.7MB 文件，Vite manual chunk 避免阻塞首屏加载 |

## 已知问题
- english-words.js 2.7MB，首次加载可能较慢
- Reading.jsx 已拆分为 4 个组件 (affb832) ✓
- Git remote URL 已使用 HTTPS（无嵌入 token），凭证由系统 credential helper 管理

## 快速上手
```bash
git clone https://github.com/chalessishas/TOEFL-Practice.git
cd TOEFL-Practice
npm install
npm run dev        # Vite 前端 → localhost:5173
npm run server     # Express 代理（可选）→ localhost:3000
```
