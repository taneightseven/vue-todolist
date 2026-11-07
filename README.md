# vue-todolist

一个 TodoMVC 风格的待办清单应用，使用 Vue 3 + TypeScript 编写，Pinia 管理状态，Naive UI 提供界面，数据保存在浏览器 localStorage 中。

## 开发说明

本项目为个人学习项目，部分内容在 AI 辅助下完成：

- Vue 单文件组件的模板部分由 AI 协助编写。
- 项目最初使用 JavaScript 编写，在业务逻辑难以维护后进行重构。重构前先梳理了 Todo 的基本需求，并使用 Playwright MCP 调研现有成熟的 TodoMVC 项目，最终形成当前架构。
- TypeScript 类型约定文件在 AI 建议下建立，类型注释、核心架构与规范由本人完成。
- 业务 Vue 组件的接线文件（index）在 AI 提示下完成。
- 所有注释均由作者在理解模块职责后编写。
- readme在本人编辑完晦涩难懂的初稿后由ai大人润色完成

## 功能

- 新增待办：自动去除标题首尾空格，标题最长 200 个字符。
- 完成状态：勾选或取消勾选单条待办。
- 批量操作：一键全选 / 取消全选，部分完成时显示半选状态。
- 编辑待办：双击标题进入编辑，`Enter` 或失焦保存，`Esc` 取消；空标题不会覆盖原标题。
- 删除待办：点击条目右侧的 `×`。
- 筛选：`All` / `Active` / `Completed` 三种视图，筛选项为空时显示提示。
- 清除已完成：一键删除所有已完成条目。
- 本地持久化：刷新页面后数据仍然保留。

## 技术栈

| 分类 | 技术 |
| --- | --- |
| 框架 | Vue 3（Composition API + `<script setup>`） |
| 语言 | TypeScript |
| 构建工具 | Vite |
| 状态管理 | Pinia |
| 路由 | Vue Router（History 模式） |
| UI 组件库 | Naive UI（通过 `src/ui` 适配层使用） |
| 单元测试 | Vitest + Vue Test Utils + jsdom |
| 端到端测试 | Playwright |
| 代码检查 | oxlint + ESLint |

具体依赖版本见 [`package.json`](./package.json)。

## 快速开始

### 环境要求

- Node.js：`^22.18.0 || >=24.12.0`（来自 `package.json` 的 `engines` 字段）
- npm（项目使用 `package-lock.json`）

### 安装与启动

```bash
npm install
npm run dev
```

启动后访问 <http://localhost:5173>。

### 常用命令

| 命令 | 说明 |
| --- | --- |
| `npm run dev` | 启动 Vite 开发服务器，默认端口 5173 |
| `npm run build` | 类型检查 + 生产构建，产物输出到 `dist/` |
| `npm run preview` | 本地预览构建产物，默认端口 4173 |
| `npm run type-check` | 使用 `vue-tsc` 做类型检查 |
| `npm run test:unit` | 运行 Vitest 单元测试（默认监听模式） |
| `npm run test:unit -- --run` | 运行一次单元测试后退出，适合 CI |
| `npm run test:e2e` | 运行 Playwright E2E 测试（会自动启动开发服务器） |
| `npm run lint` | 依次运行 oxlint 和 ESLint，并自动修复可修复的问题 |

## 目录结构

```text
vue-todolist/
├─ public/
│  └─ favicon.ico                  # 站点图标
│
├─ e2e/
│  ├─ tsconfig.json                # E2E 的 TypeScript 配置
│  └─ vue.spec.ts                  # Playwright 用例（仍为脚手架示例）
│
├─ src/
│  ├─ assets/                      # 脚手架样式与 logo（当前未使用）
│  ├─ components/
│  │  ├─ __tests__/
│  │  │  └─ HelloWorld.spec.ts     # 脚手架单元测试
│  │  ├─ icons/                    # 脚手架图标（当前未使用）
│  │  ├─ HelloWorld.vue            # 脚手架组件（当前未使用）
│  │  ├─ TheWelcome.vue            # 脚手架组件（当前未使用）
│  │  ├─ WelcomeItem.vue           # 脚手架组件（当前未使用）
│  │  └─ todo/
│  │     ├─ TodoInput.vue          # 新增输入
│  │     ├─ TodoItem.vue           # 单条待办的展示与编辑
│  │     └─ TodoFooter.vue         # 计数、筛选、清除已完成
│  │
│  ├─ constants/
│  │  └─ todo.ts                   # 标题长度上限等常量
│  ├─ router/
│  │  └─ index.ts                  # 路由表
│  ├─ stores/
│  │  ├─ counter.ts                # 脚手架示例 store（当前未使用）
│  │  └─ todos.ts                  # Todo 的 Pinia store
│  ├─ types/
│  │  └─ todo.ts                   # Todo / TodoFilter 类型
│  ├─ ui/
│  │  ├─ index.ts                  # Naive UI 适配层，统一导出 Ui*
│  │  ├─ theme.ts                  # 主题覆盖
│  │  └─ UiPage.vue                # 页面容器
│  ├─ utils/
│  │  └─ todo.ts                   # localStorage 读写、校验与清洗
│  ├─ views/
│  │  ├─ AboutView.vue             # /about 页面
│  │  ├─ HomeView.vue              # 脚手架页面（当前未使用）
│  │  └─ TodoView.vue              # Todo 主页面
│  │
│  ├─ App.vue                      # 应用壳：主题配置 + 路由出口 + 全局样式
│  └─ main.ts                      # 应用入口：创建应用并挂载
│
├─ .vscode/
│  ├─ extensions.json              # 推荐扩展
│  └─ settings.json                # 编辑器工作区设置
├─ .editorconfig                   # 编辑器格式约定
├─ .gitattributes                  # Git 换行策略
├─ .gitignore                      # 忽略 node_modules、dist、测试产物等
├─ .oxlintrc.json                  # oxlint 规则
├─ env.d.ts                        # Vite 客户端类型声明
├─ eslint.config.ts                # ESLint Flat Config
├─ index.html                      # HTML 入口，提供 #app 挂载点
├─ package-lock.json               # 依赖锁文件
├─ package.json                    # 脚本与依赖
├─ playwright.config.ts            # Playwright 配置
├─ tsconfig.app.json               # 应用代码的 TS 配置
├─ tsconfig.json                   # TS 总配置
├─ tsconfig.node.json              # Node 侧 TS 配置
├─ tsconfig.vitest.json            # 测试的 TS 配置
├─ vite.config.ts                  # Vite 配置与 @ 别名
└─ vitest.config.ts                # Vitest 配置
```

## 架构说明

### 分层

| 层 | 位置 | 职责 |
| --- | --- | --- |
| 入口层 | `index.html`、`src/main.ts` | 提供挂载点，创建应用并安装 Pinia、Router |
| 应用壳 | `src/App.vue` | 主题 Provider、路由出口、全局样式 |
| 路由层 | `src/router/index.ts` | 将 URL 映射到页面 |
| 页面层 | `src/views/TodoView.vue` | 页面编排、筛选项与编辑态、事件处理 |
| 展示组件层 | `src/components/todo/` | 输入、单条展示/编辑、底部操作栏 |
| 状态层 | `src/stores/todos.ts` | Todo 数据、派生值、业务动作、持久化监听 |
| 持久化层 | `src/utils/todo.ts` | localStorage 适配、数据校验与清洗 |
| 领域模型层 | `src/types/todo.ts`、`src/constants/todo.ts` | 类型与常量 |
| UI 适配层 | `src/ui/` | 统一封装 Naive UI，业务组件不直接依赖组件库 |

边界约定：

- `TodoView` 负责页面编排，不直接读写 localStorage。
- `TodoInput`、`TodoItem`、`TodoFooter` 不直接访问 store，只通过 props / emit 与页面通信。
- store 只管理数据与业务动作，不操作 DOM 或编辑框。
- `utils/todo.ts` 只做存储适配与数据清洗，不写业务规则。
- 业务组件统一从 `src/ui` 导入 UI 组件，不直接 import `naive-ui`。

### 启动链路

```text
index.html
  │  提供 <div id="app">
  ▼
src/main.ts
  │  createApp(App)
  │  .use(createPinia())
  │  .use(router)
  │  .mount('#app')
  ▼
src/App.vue
  │  UiConfigProvider
  │  RouterView
  │  UiGlobalStyle
  ▼
src/router/index.ts
  │  '/'      → TodoView.vue
  │  '/about' → AboutView.vue（懒加载）
  ▼
src/views/TodoView.vue
```

### 页面结构

```text
TodoView.vue
├─ 标题
├─ TodoInput.vue
├─ 全选 checkbox
├─ TodoItem.vue × N
├─ 当前筛选为空时的提示
└─ TodoFooter.vue
```

### 事件流

```text
TodoInput  ── add ──────────────┐
TodoItem   ── toggle ───────────┤
           ── remove ───────────┤
           ── start-edit ───────┤
           ── update-draft ─────┤
           ── commit ───────────┤
           ── cancel ───────────┤
TodoFooter ── update:filter ────┤
           ── clear-completed ──┘
                                ▼
                            TodoView
                                │ 调用 store action
                                ▼
                       stores/todos.ts
                                │ watch(todos, { deep: true })
                                ▼
                         utils/todo.ts
                                │
                                ▼
                           localStorage
```

### 读写链路

读取：

```text
localStorage
  → loadTodos()
  → stores/todos.ts 中的 todos
  → TodoView 通过 storeToRefs 获取
  → 通过 props 传给 TodoInput / TodoItem / TodoFooter
  → 渲染页面
```

写入：

```text
用户操作
  → 子组件 emit 事件
  → TodoView 的事件处理函数
  → store action
  → todos 发生变化
  → watch(todos, { deep: true })
  → saveTodos()
  → localStorage.setItem()
```

## Store 说明

`src/stores/todos.ts` 对外提供以下内容：

| 成员 | 类型 | 说明 |
| --- | --- | --- |
| `todos` | `Ref<Todo[]>` | 全部待办 |
| `activeCount` | `ComputedRef<number>` | 未完成数量 |
| `completedCount` | `ComputedRef<number>` | 已完成数量 |
| `allCompleted` | `ComputedRef<boolean>` | 是否全部完成（空列表为 `false`） |
| `hasCompleted` | `ComputedRef<boolean>` | 是否存在已完成项 |
| `addTodo(title)` | `(string) => boolean` | 新增待办，空标题返回 `false` |
| `toggleTodo(id)` | `(string) => void` | 切换单条完成状态 |
| `toggleAll()` | `() => void` | 全选或取消全选 |
| `updateTodoTitle(id, title)` | `(string, string) => boolean` | 修改标题，空标题返回 `false` |
| `removeTodo(id)` | `(string) => void` | 删除单条待办 |
| `clearCompleted()` | `() => void` | 清除所有已完成待办 |

数据变化通过下面的监听自动写回 localStorage：

```ts
watch(todos, (value) => saveTodos(value), { deep: true })
```

## 数据持久化

- 存储键：`vue-todolist.todos.v1`
- 存储版本：`1`
- 存储结构：

```json
{
  "version": 1,
  "todos": [
    {
      "id": "todo-id",
      "title": "买牛奶",
      "completed": false
    }
  ]
}
```

读取时会做完整校验与清洗：

1. `getItem` 取出字符串并 `JSON.parse`。
2. 兼容两种格式：旧格式直接是数组，新格式是 `{ version, todos }`。
3. 逐条校验 `id`、`title`、`completed` 的类型。
4. 标题重新 `trim` 并截断到 200 个字符。
5. 丢弃空标题、重复 `id` 以及结构不正确的条目。
6. 返回清洗后的 `Todo[]`。

如果 localStorage 不可用、JSON 解析失败或写入失败，应用会静默降级为空列表或仅保留内存状态，不会阻止页面继续使用。

## 路由

| 路径 | 页面 | 说明 |
| --- | --- | --- |
| `/` | `src/views/TodoView.vue` | Todo 主页面 |
| `/about` | `src/views/AboutView.vue` | 脚手架保留的关于页，按需加载 |

## 测试

| 测试 | 位置 | 当前状态 |
| --- | --- | --- |
| 单元测试 | `src/components/__tests__/HelloWorld.spec.ts` | 脚手架示例，尚未覆盖 Todo 业务 |
| 端到端测试 | `e2e/vue.spec.ts` | 脚手架示例，断言仍指向旧首页标题，尚未覆盖 Todo 功能 |

运行方式：

```bash
npm run test:unit
npm run test:e2e
```

Playwright 默认使用 Chromium、Firefox、WebKit 三个浏览器项目；本地测试会自动启动 `npm run dev`，CI 环境使用 `npm run preview`。

## 已知事项

- `src/components/` 下的 `HelloWorld.vue`、`TheWelcome.vue`、`WelcomeItem.vue`、`icons/`，以及 `src/views/HomeView.vue`、`src/stores/counter.ts`、`src/assets/` 均为脚手架遗留文件，当前 Todo 页面没有使用。
- 单元测试与 E2E 测试仍是脚手架默认内容，需要后续补齐 Todo 相关用例。
- 应用界面文案目前为英文，代码注释与本文档为中文。

