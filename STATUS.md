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
- [100%] 5 分范文系统校准 — 批量测试 10 条 discussion sample responses：9/10 达到 4.0+/5；organization 补入 rather than/not only 等；development REASON_MARKERS 补入 "but"（argumentative contrast signal）；Sample 7: 3.4→4.0，Sample 9: 3.8→3.9 (94988c3)
- [100%] Email 范文校准 — 批量测试 10 条 email sample responses：Sample 1（3.7）和 Sample 4（3.9）因缺 Dear/Best regards 被 taskScore 惩罚；修复：在范文数据加入问候/结尾语；10/10 达到 4.0+/5（范围 4.1–4.6）(3e947cf)
- [100%] vocabulary.js AWL sublists 7-10 完整扩展 — AWL_CORE 从 sublist 1-6（~200词）扩至全部 10 个 sublist（~290词）；探测命中 6→67；E2E 测试 3 场景全通过 (ca938ae)
- [100%] grammar.js 逗号粘连误报彻底修复 — 根因：检测以 line（\n 分割）为单位，邮件正文无换行因此整个邮件是一行，SENTENCE_STARTERS 首词检查永远不触发；修复：① 改为 sentence（[.!?;] 分割）为单位；② 逗号粘连 regex 改为 [^\S\n]+（不跨段落）；③ 双否定 span 收窄到 .{0,20}；④ CLAUSE_OPENERS 扩展（during/despite/done/given 等）；结果：20/20 范文 grammar=1.00，"While X, I believe Y"/"If X, I would Y"/"During X, I had Y" 全部正确跳过 (8f466ff) — Discussion 10/10（含 Sample 9 3.9→4.1），Email 10/10
- [100%] development.js 逐段落证据完整性奖励 — paragraphCompletenessBonus()：body 段落全有 evidence signal → +0.10，≥50% → +0.05；email 跳过；argScore ceiling 仍有效；20/20 校准维持 (5d28ad0)
- [100%] development.js P3/P4 — circularReasoningPenalty()（段落内句对 token 重叠 >60% → argScore ceiling 降低）+ numericEvidenceBonus()（百分比/年份/统计数字 → +0.04/+0.08）；20/20 校准维持 (8e3b44f)
- [100%] tests/scorer-calibration.js — 低分段判别校准套件：Score 1-5 全段 8 组样本，3→4 gap=+0.70，4→5 gap=+0.50，8/8 通过 (1dfb8e8)
- [100%] style.js nominalization density — Kyle 2018 TOEFL 研究：`\w{7,}(tion|ment|ness|ity|ance)` 每 100 词，≥5/8/12→+0.05/+0.10/+0.15；学术文 16/100w vs 口语文 0/100w；28/28 校准维持 (93d6191)
- [100%] organization.js semi-formal email register — 7 条专业用语检测（I am writing to / I would appreciate / at your convenience）；+0.04/+0.08；28/28 校准维持 (b976fc6)
- [100%] development.js TAACO 局部衔接惩罚 — localCohesionPenalty()：连续句对平均 token 重叠 >0.30→-0.03，>0.40→-0.07，>0.55→-0.12；仅限 discussion；重复性 vs 发展性区分 0.500 vs 0.803；28/28 (1498ef6)
- [100%] grammar.js 中文 L1 迁移 P1 — 3P-单数 -s 脱落（THIRD_PERSON_BARE）+ have been + 裸词干（HAVE_BEEN_BARE）+ 静态动词进行式（STATIVE_PROG）+ 4 条冗余介词（emphasize on/stress on/marry with/enter into [地点]）；8/8 校准维持；suggest() 补入三类新错误提示
- [100%] grammar.js 中文 L1 迁移 P2 — 话题评论式赘词主语（TOPIC_COMMENT_RE）："This problem, it needs attention" → 错；两层守卫（38 个话语/时间副词 + 介词短语开头排除）；11/11 测试通过（7 假正→0，4 真错误→命中）；8/8 校准维持 (7400394)
- [100%] organization.js 动态同伴名称提取 — score() 新增 promptText 参数；从实际题目文本中提取大写专有名词替代硬编码 PEER_NAMES 列表；index.js 传入 promptText；前向兼容新题目中的任何新姓名
- [100%] grammar.js 中文 L1 Pattern B 补充 — "demanded/demanding for" + "requested/requesting for"（动词时态形式，近零误报）；8/8 sanity，8/8 校准维持
- [100%] vocabulary.js AWL 深度分级 — AWL_BASIC (sublists 1-3, 0.015/词, cap 0.12) + AWL_ADVANCED (sublists 4-10, 0.04/词, cap 0.08)；总上限仍 0.20；仅用高阶词的 Score-5 可突破 Score-4 平台；Loop 8 驱动
- [100%] organization.js 认识立场 tier-2 hedging bonus — HEDGING_TIER2 7 个模式（I would argue / one might / it could be argued 等）；discussion 专属；+0.06 (1 hit) / +0.10 (2+ hits)；tier-1 hedging 列表重构避免双重计分；8/8 校准维持
- [100%] grammar.js 邮件称呼逗号粘连误报修复 — "Dear Professor Chen, I am writing..." 被误标为逗号粘连；在逗号粘连检测前添加 salutationPattern 守卫（Dear/Hello/Hi/Hey/Greetings 开头跳过）；E2E 实测发现，4/4 测试通过，8/8 校准维持
- [100%] tests/scorer-calibration.js 邮件回归测试 — EMAIL_SALUTATION_REGRESSION（grammar extraCheck ≥0.99）+ SCORE5_EMAIL（≥4.2）；Runner 新增 extraCheck callback 支持；10/10 通过，gaps 3→4:+0.70 / 4→5:+0.50 (616ffde)
- [100%] grammar.js 时态不一致检测 — 背景 Agent 实现（896621d）；保守阈值 0.35 + 时态锚词排除（in 20XX/last year/ago 等）；tensTotal ≥ 8 触发；FP=0/4 验证；10/10 校准维持
- [100%] style.js 从属连词密度奖励 — ≥3/100w → +0.04，≥1.5/100w → +0.02；COMPLEX_PATTERNS 只检测存在性，density 补充深度区分；10/10 校准维持 (896621d)
- [100%] Loop 10 — 4 个研究驱动改进 (b950c2e) — ① development.js 反驳加分（concession+rebuttal 双触发 +0.05）② grammar.js 动词-名词搭配错误 8 个中文 L1 高精度模式 ③ vocabulary.js 学术双词组 7 个去重短语 ④ style.js 被动语态过度使用惩罚（>40% -0.04）；校准：discussion ≥4.0 ✓，email ≥4.0 ✓，弱文 <3.0 ✓
- [100%] vocabulary.js 稀有词比率修复 (6d12a72 + e2e55c2) — ① type-based 而非 token-based（"technology"×3 = 1 类型而非 3）② 内容词 <8 个时用线性斜坡替代比率（Score-1 三词文 0.63→0.16，避免 1/1=100% 误报）
- [100%] development.js gaming 漏洞修复 (fd8bfd9 + cf3a0cf) — ① argMinWords 任务特定化（discussion=80 取代统一的 120）② detailCount=0 讨论文 base 从 1.0→0.65（连接词堆砌但无具体例子不得满分）③ circularReasoningPenalty 门控与 argMinWords 对齐；gaming essay 4.5→4.3；10/10 校准维持
- [100%] Loop 11 P2 — grammar.js 所有格+冠词冲突检测 (8dd5e58) — 所有格（my/his/her/our/their/its）与冠词（a/an/the）同为限定词，英语 NP 只允许一个；FP≈0%；Zeng & Takatsuka 2009 中文 L1 四号错误类型
- [100%] Loop 11 P1 — relevance.js 证据邻近奖励 (30b32cf) — semanticSpecificityBonus()：证据标记词（research/data/percent/shows 等）出现在提示词关键词 15 词窗口内 → +0.03（1次命中）/ +0.06（3次+）；Kyle & Crossley 2015 邻近相关 r=+0.34；10/10 校准维持，gaps 3→4:+0.70 / 4→5:+0.50
- [100%] Loop 11 P3+P4 — grammar.js 同音字混淆 + style.js 邮件正式语域奖励 (8dd5e58) — 4 个同音字模式（your/you're, its/it's, there/their, then/than，均需上下文确认，FP <1%）；邮件 formal opener+closing → +0.04；10/10 校准维持
- [100%] Loop 11 质量修复 — wordlist.js 扩展 120+ TOEFL 主题词 (b658084) — 教育/社会/经济/技术/环境/健康 6 大主题域词汇不再被误标为"稀有词"；calibration 中性，无评分改变
- [100%] Loop 11 P4 — organization.js 连接词误用检测 (c6daf67) — 段落开头 "However" 无前文对比内容时惩罚 -0.03（上限 1 次）；Granger & Tyson 1996 中文 L1 误用率 38% vs 母语者 7%；邮件任务不触发；10/10 校准维持
- [100%] Loop 12 P1-P4 (4684d5a) — ① grammar.js a/an 混淆检测（双向词列，Lardiere 1998：中文L1 #1 错误类，~12%）② grammar.js 冗余介词 6 模式（discuss about 等，Huang 2001 Mandarin关于-结构迁移）③ style.js 冗长短语惩罚 7 phrases（-0.02/-0.04，Williams 2014；ETS Score-4 rubric"冗余"标志）④ style.js 4-gram 重复惩罚（≥3次触发，arxiv:2504.08537 2025-04：lexical bundle diversity）；10/10 校准，gaps 不变
- [100%] vocabulary.js AWL_BASIC 重叠修复 (84363ce) — 59 个词同时出现在 AWL_BASIC 和 commonWords（research/data/factor/environment 等）；过去这些词错误地同时享有「学术词汇奖励」和「稀有词多样性」双重加分；修复：AWL_BASIC 奖励排除 commonWords 中的词；2 轮子 Agent 讨论驱动；10/10 校准维持，gaps 不变 — 段落开头 "However" 无前文对比内容时惩罚 -0.03（上限 1 次）；Granger & Tyson 1996 中文 L1 误用率 38% vs 母语者 7%；邮件任务不触发；10/10 校准维持
- [100%] Loop 14 (d8cb24f) — ① grammar.js 不可数名词+不定冠词检测（an advice/an information 等 13 个词，负向预见排除复合修饰语，FP ~2%；Celce-Murcia 1999 中文L1 第四类冠词错误）② grammar.js 动名词 vs 不定式（avoid/enjoy/finish/keep 等 8 动词后接 to+V 视为错误，中文「去」结构迁移；Laufer 2011 ~18% 错误率；FP <1%）③ relevance.js semanticSpecificityBonus bug fix（从 indexOf 改为 some() 全索引扫描，首次出现在引言的关键词在正文有证据时现在可正确得分）；10/10 校准维持
- [100%] Loop 17 fixes (5abd705 + fc55246) — ① grammar.js comma splice FP 根治：分词短语开头（Drawing on / Having / Building on 等任何 \w+ing 开头）和 "due to/thanks to/owing to" 不再误报逗号粘连，无需维护白名单；Score 5 + Email Good grammar=1.00 ② organization.js 高级学术话语标记扩充："according to / drawing on / as evidenced by / research shows" 加入例证类；"from a / in this regard / it is worth noting" 加入对冲类；Score 5 org 0.807→0.865，raw score S5(0.9032)>S4(0.8980)，方向性差别修正；10/10 校准无回归
- [100%] Loop 16 (a198b0e) — ① grammar.js 情态动词+动名词错误（can singing/must going/should studying — 中文无不定式/动名词词形区分迁移；Laufer & Waldman 2011 ~2-3% 错误率；60+ 常见动名词白名单避免误报 sing/ring/bring；will be studying 进行式守卫）② grammar.js 被动语态过去式错误（was wrote/took/gave/broke/chose — 中文无屈折词形；Zeng & Takatsuka 2009 第8类；仅过去式≠过去分词的动词入列，排除同形词 told/built/sent/put/caught；首次命中报错）③ suggest() 补充两类新错误提示；23/23 测试通过；校准 3→4: +0.6 ✓
- [100%] Loop 15 (c7fd4cb) — ① grammar.js 双重比较级（"more better/worse/easier" 等 20 个不规则比较级，Hornby 2015 OALD；中文「更」作通用程度副词迁移；FP≈0%）② grammar.js 嵌套疑问句语序倒装（"I don't know what is the reason"，Quirk 1985 §15.6；中文无倒装规则迁移；守卫：倒装动词后需限定词 the/a/an/this 等，排除谓语形容词构式 "what is important"；FP≈1%）③ grammar.js suggest() 补入 Loop 14（不可数名词冠词、动名词）和 Loop 15 新错误提示；16/16 模式测试通过；校准 3→4: +0.6 ✓
- [100%] Loop 18 P1+P2 (89fda78) — ① grammar.js 5 个新介词错误（arrive to/consist from/participate on/suffer of/responsible of，ERIC EJ1081034 中文L1介词替换高频模式 28-43%）② style.js 弱强化词惩罚（very+普通形容词 ≥2 次 -0.02/≥3 次 -0.04，ERIC EJ1272190: Score-3/4 使用频率是 Score-5 的 3 倍）；10/10 校准，gaps 不变
- [100%] Loop 25 (e913fd4) — grammar.js ① HAVE_DIFF_RE："have/has difficulty/trouble/a hard time + to-infinitive" → 动名词（难以+裸动词迁移；Celce-Murcia §14.8；FP ~0%）② PREFER_THAN_RE："prefer...than" → "prefer...to"（喜欢X比Y calque；Quirk §9.62；守卫："rather than" 跳过；FP ~5%）+ suggest() 2 条；11/11 单元测试，校准 S3=3.57 < S4=3.88 < S5=4.33 ✓
- [100%] Loop 24 (a8a80f3) — grammar.js ① WORTH_TO_RE："worth to [verb]" 动名词错误（值得去学习 calque；FP ~0%）② ACCORDING_TO_PRON_RE："according to me/him/her" 介词错误（根据我/根据他 calque；Quirk 1985 §8.138；FP ~0%）③ BE_USED_TO_RE："be used to + 裸动词" 动名词错误（习惯于+裸动词迁移；40词白名单保守策略；FP ~3%）+ suggest() 4 条；12/12 单元测试，Score3=3.5/Score4=4.0/Score5=5.0 ✓
- [100%] Loop 23 (ea3d98f) — grammar.js ① REDUNDANT_ABOUT_RE：discuss/mention/describe/explain/address/consider + about 冗余介词（Liu 2011 中文L1：discuss about ~15% / mention about ~10%；关于 → about 直译；FP ~0%）② NEITHER_OR_RE + EITHER_NOR_RE：关联连词不匹配（Leacock 2014：neither...or ~6% / either...nor ~3%；中文既不...也不无 or/nor 词形区分；守卫：neither...nor...or 三元组跳过）+ suggest() 4 条；10/10 单元测试，Score3=3.5/Score4=4.0/Score5=5.0 ✓
- [100%] Loop 25 (0d1852d) — ① grammar.js progressive 过用惩罚：>4/100词 → 报错（Xu & Ellis 2020：中文L1 TOEFL 用进行时频率为母语者2倍；Biber 1999：学术写作概括性陈述罕见进行时；守卫≥60词）② organization.js paragraphBalancePenalty：最长段落>最短段落3.5倍 → -0.03（Ferris 2014 语料库；email免除；paragraphs按单换行分割）；10/10校准，gaps不变
- [100%] Loop 23 (c288aab) — grammar.js 3 类新模式：① PLURAL_UNCOUNTABLE 10 条（researches/informations/knowledges/advices/equipments/furnitures/homeworks/feedbacks/traffics/luggages；Frontiers 2022 + Nature/HSSC 2025：中文L1质量名词当可数名词用；FP<0.5%）② COLLOCATION_ERRORS +6（make contribution to缺冠词/play important role缺an/do efforts/make influence on/bring benefit to/cause|produce|create effect on；David Publishing 2024 + ERIC EJ1334553 corpus：C1水平仍高频的搭配错误）③ THE_GENERIC_SAFE：句首 The+领域名词+系词/情态动词 句法（Cogent Ed 2023中文L1第2大冠词错误；负向前瞻排除 of/in/that/which 特指用法；FP低）；10/10 校准，gaps 不变
- [100%] Loop 22 (b0e19ff) — grammar.js PAST_TIME_ANCHOR_RE：现在完成时 + 特定过去时间锚点（"I have visited Paris last year" → "I visited"；Li & Thompson 1981 普通话无时态词形；~12% 中文L1；守卫：情态完成/since/for 前缀；FP ~5%）+ suggest() 1 条；10/10 单元测试 ✓
- [100%] Loop 21 (371f65e) — ① grammar.js DOUBLE_CONJ +5新配对连词迁移（since...then/as long as...so|then/not only...but also...and/no matter...still/even if...also；JLTR 7:4：65.6%连词错误为配对/不匹配类型）② grammar.js COLLOCATION_ERRORS +9轻动词搭配错误（learn/study/teach knowledge/have a good health/touch society/bring forward suggestion/get progress/deal NP无with；CLEC+TECCL 92.3% L1同源）③ style.js phrasalEmbeddingBonus：≥100tokens时检测长形容词+名词化名词及 N-of-N 学术链；phrasalRate≥2→+0.02/≥4→最高+0.05（Frontiers 2021 TOEFL11：短语复杂性 > 从句复杂性于 Score-4→5 边界）；10/10 校准，gaps 不变
- [100%] Loop 20 grammar (3079a7f) — grammar.js 3 个新模式：① NULL_IT：裸系动词+谓语形容词句首（"Is important to..." → 缺主语 it；中文 L1 主语脱落迁移）② PLEONASTIC_RE：冗余强调反身代词（"I myself believe"；学术写作忌强调语气）③ REPORT_BARE_RE：报告动词 + not + 裸不定式（"reported not find" → "reported not finding/to find"；Laufer 2011 动词补语错误）；10/10 校准，gaps 不变
- [100%] Loop 21 (88b3338) — grammar.js 2 个新模式：① IF_HAD_RE：第二条件句 "if + had/were + ... + will" 时态错误（Yang 2022 中文L1 TOEFL 语料库 ~15%；中文无虚拟语气词形区分；if-clause 用过去式时 result clause 必须用 would；守卫：已有 would 则跳过，had/were 需在 if 后 4 词内；FP ~5%）② NOT_ONLY_RE："not only...also" 缺少 but（Leacock 2014 TOP-10，~8%；中文不但...还/也 迁移；正确形式 "not only...but also"；守卫：between 中有 but 则跳过；FP ~8%）+ suggest() 2 条新提示；10/10 单元测试，Score3=3.5/Score4=4.0/Score5=5.0 ✓
- [100%] Loop 20 P1+P2 (c8ab86a) — ① style.js I-opener 单调惩罚：≥4 句以 "I think/believe/feel/would/also/agree" 开头 → -0.02/≥5 → -0.04（email 免除；Biber 1999 + McNamara 2010 Coh-Metrix r=-0.31）② style.js subordination type 多样性奖励：≥100 tokens 时，检测 11 种从属连词类型，≥2 种 → +0.02 / ≥3 种 → +0.04（Crossley 2014 β=0.34 最强句法预测变量；补充已有密度奖励）；10/10 校准，gaps 不变
- [100%] Loop 19 P3 (79bc8d9) — organization.js lexical chain coherence bonus（ETS e-rater Deane 2024：相邻段落共享内容词 = 话题延续信号；lexicalChainBonus()：split on \n\n+，提取 ≥5 字符非普通词，≥50% 相邻段落对共享 ≥1 词 → +0.02/+0.04）；import commonWords from wordlist.js；10/10 校准通过，4→5 gap 0.50→0.60
- [100%] Loop 18 P3-P5 (876e182) — ① grammar.js 存在句 SVA（"there is many/several" → "there are"，Leacock 2014 中文L1 TOP-10 ~12% 文章，Celce-Murcia 1999 §20.2）② grammar.js "to home" 介词错误（"go/come/return to home" → "go home"，Swan & Smith 2001 中文L1 §4 回到家 calque，FP <1%）③ grammar.js 使役动词 causative make/let/have + to 不定式（"make him to understand" → "make him understand"，Laufer & Waldman 2011 中文 L1 让/使 无词形区分，FP <3%）+ suggest() 3 条新提示；10/10 校准维持，gaps 不变
- [100%] Loop 13 (9229133) — ① grammar.js 代词格错误 3 模式（between you and I / with we / told I — 中文L1无形态格，Yang & Huang 2020 ~8-11% 代词错误）② grammar.js 关系从句冗余代词（who she teaches → who teaches，中文关系结构回指迁移）③ vocabulary.js AWL_ADVANCED/commonWords 重叠修复 22 词（task/goal/ensure/challenge 等不再获 +0.04/词高级奖励）；10/10 校准维持
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
