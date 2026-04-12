# TOEFL Practice — 进度交接书

## 项目概述
TOEFL 练习平台，包含阅读和写作两大模块，写作模块内置 e-rater 风格的 6 维评分引擎。面向备考学生。

## 当前状态
开发中，未部署。写作评分引擎是近期开发重点，已完成 275k 词典集成和字母评级系统。

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
用户提交 → scorer/index.js (加权 6 维)
  ├→ Organization (32%) — 结构、连贯性
  ├→ Development (30%) — 内容深度、举例
  ├→ Vocabulary (14%) — 词汇丰富度
  ├→ Mechanics (10%) — 拼写、标点
  ├→ Grammar (7%) — 语法错误
  └→ Style (7%) — 语域、风格
  → 原始分 [0-1] 映射到 TOEFL 0-5 分 → 字母评级

状态存储：localStorage
  toefl-reading-progress / toefl-writing-build-sentence / toefl-completion-history
```

## 已完成
- [100%] 阅读模块：Urban Agriculture 文章 + 10 题 + Pack 6 (6 模块)
- [100%] 填空题 (Complete Words)
- [100%] 写作三大任务：造句（20 题选 10）/ 邮件（10 条 prompt）/ 讨论（10 条 prompt）
- [100%] e-rater 6 维评分引擎 + 275k 英文词典（拼写误报率接近 0）
- [100%] 字母评级系统 (Excellent/Good/Fair/Weak)
- [100%] 定时器 + 全屏任务界面
- [100%] 进度自动保存 (localStorage)
- [100%] 侧边栏 5 面板：练习 / 进度 / 笔记本 / 学习计划 / 设置

## 进行中 / 待完成
- [100%] 深色模式 — 全站覆盖，含 Reading 4 个子组件 (0a555fe)
- [100%] 设置项联动 — 计时器显隐 + 快捷键提示 + 暗色模式，localStorage 持久化 (d854931)
- [100%] 写作内容扩充 — BuildSentence 20题(每次随机10)，邮件10组，讨论10组 (4c4284e)
- [0%] 笔记本/生词本后端持久化
- [0%] 学习计划动态化（当前是静态占位）
- [0%] 用户认证系统
- [0%] 部署上线

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
