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
