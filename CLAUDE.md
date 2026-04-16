# TOEFL Practice App

React 19 TOEFL 备考平台，涵盖 Reading + Writing 模块。Writing 内置 7 维度 e-rater 评分引擎，纯前端离线运行，无后端依赖。

## Tech Stack

React 19 + React Router 7 + Vite 6, 纯 JSX（无 TypeScript）

## Architecture

```
index.html → src/main.jsx (BrowserRouter)
  └─ Layout.jsx (侧边栏 48px icon + 260px panel + 主内容)
       ├─ /               → Home.jsx (仪表盘)
       ├─ /reading        → Reading.jsx (orchestrator) → src/reading/ 子组件
       ├─ /writing        → Writing.jsx (任务选择器)
       ├─ /writing/build-sentence → BuildSentence.jsx
       ├─ /writing/email          → WriteEmail.jsx
       └─ /writing/discussion     → AcademicDiscussion.jsx

/writing/* 路由自动隐藏侧边栏（Layout.jsx 中 fullScreenPaths 控制）
```

### Data Flow

```
用户输入 → useState → useEffect 自动存 localStorage
提交 → scorer/index.js (6 模块加权) → WritingResult.jsx 展示
```

## Directory Structure

```
src/
├── main.jsx              # 路由定义
├── Layout.jsx            # 2 列布局壳
├── App.css               # 弹窗/计时器/响应式
├── index.css             # reset/动画/滚动条
├── data.js               # Urban Agriculture 阅读 + 10 MCQ
├── pack6.js              # 6 篇阅读文章 + 题目
├── CompleteWords.jsx     # 填空阅读子组件
├── pages/
│   ├── Home.jsx          # 欢迎页 + 模块卡片 (live stats from scoreHistory)
│   ├── Reading.jsx       # 阅读 orchestrator (228 行, 路由到 src/reading/)
│   └── Writing.jsx       # 写作任务选择
├── reading/              # Reading 子组件 (从 1200+ 行拆分)
│   ├── ReadingHome.jsx       # 模式选择入口
│   ├── DailyLifeReading.jsx  # Urban Agriculture + data.js
│   ├── AcademicPassage.jsx   # pack6.js 6 篇学术文章
│   └── LegacyReadingTest.jsx # 传统阅读测试模式
├── writing/
│   ├── BuildSentence.jsx # 造句: Landing→Test→Result→Review, 10 题 7 分钟, 错题优先复习
│   ├── WriteEmail.jsx    # 邮件写作: 左 40% 题目 + 右 60% 编辑, 7 分钟, 10 道题
│   ├── AcademicDiscussion.jsx # 学术讨论: 10 分钟, 最低 120 词, 10 道题
│   ├── WritingResult.jsx # 分数展示 (圆环 + 7 维柱状图 + personal best badge)
│   ├── scoreHistory.js   # localStorage 写作历史 (appendScore / getHistory)
│   ├── writing.css
│   ├── data/             # buildSentenceData / emailData(10) / discussionData(10)
│   └── scorer/
│       ├── index.js      # 加权聚合 → TOEFL [0-5] 标度
│       ├── grammar.js    # 7% - 片段句/连缀句/双重否定 (从属连词开头行跳过 comma splice 检测)
│       ├── mechanics.js  # 6% - 275k 词典拼写检查 (2026-04-12 from 10%; 拼写是底线，不是区分器)
│       ├── vocabulary.js # 14% - 词长 + 稀有词比例 (2026-04-12 from 18%)
│       ├── organization.js # 33% - 篇章标记词/段落/任务线索/peer engagement (2026-04-12 from 30%)
│       ├── development.js  # 28% - 字数范围/细节密度/argStructure ceiling (2026-04-12 from 24%; email 跳过 ceiling)
│       ├── style.js      # 7% - TTR/句长方差/重复惩罚/句型多样性/casual penalty (2026-04-12 from 3%)
│       ├── wordlist.js   # validWords 15k + commonWords 5k
│       ├── relevance.js  # 5% - keyword overlap with prompt (stem-normalized, 2026-04-12 from 8%)
│       └── english-words.js # 275k 词典 (2.7MB, Vite manual chunk)
└── shared/
    ├── Timer.jsx         # 倒计时, props: totalTime/paused/onTimeUp
    └── theme.js          # 设计 token: 颜色/字体/圆角/阴影
```

## Key Conventions

- **Design tokens**: `shared/theme.js` 导出所有颜色/字体/阴影，组件 inline style 引用
- **主色**: Teal #00695c, 标题 Georgia serif, 正文 DM Sans
- **State persistence**: 各模块用独立 localStorage key (`toefl-reading-progress`, `toefl-writing-email`, etc.)
- **评分等级**: Excellent (>=0.8) / Good (>=0.6) / Fair (>=0.4) / Weak (<0.4)
- **键盘快捷键**: Space 暂停, 方向键导航, 1-9 选答案
- **全屏任务**: Writing 任务页隐藏侧边栏, 沉浸式答题

## localStorage Keys

| Key | Owner |
|-----|-------|
| `toefl-reading-progress` | Reading.jsx |
| `toefl-completion-history` | Reading.jsx |
| `toefl-writing-build-sentence` | BuildSentence.jsx |
| `toefl-writing-email` | WriteEmail.jsx |
| `toefl-writing-discussion` | AcademicDiscussion.jsx |

## Known Pitfalls

1. **english-words.js 2.7MB**: Vite manual chunk 懒加载缓解，但首次仍慢。根治方案: WebWorker 或服务端查询
2. **Reading.jsx 已重构**: 拆为 src/reading/ 4 个子组件（ReadingHome / DailyLifeReading / AcademicPassage / LegacyReadingTest），orchestrator 228 行
3. **localStorage 无迁移机制**: 数据结构变更会导致旧数据失效，缺少版本号 + 迁移逻辑
4. **Grammar 模块误判**: 动词模式匹配阈值已调过一轮，但仍有边界 case
5. **Dark Mode 已接入**: ThemeContext + useTheme() hook，Settings 面板 toggle 可用，localStorage 持久化
6. **Error Boundary**: ErrorBoundary.jsx wraps Layout — shows error message + Go Home button on uncaught exceptions
7. **XSS 防护（2026-04-16 验证）**: 当前依赖 React 自动转义——所有 user text 通过 `{text}` 插值渲染，全项目 `src/` 扫描无 `dangerouslySetInnerHTML`/`innerHTML`/`eval`/`Function`，默认安全。**未来若引入 Markdown 渲染、富文本 WYSIWYG、或第三方 iframe，需重新审查**
8. **评分权重手动调整**: 未与真实 TOEFL 评分做基准验证
