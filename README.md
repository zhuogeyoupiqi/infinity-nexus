这是为你量身定制的 `README.md`，它将你的工程定位、技术栈和核心优势清晰地呈现给用户和协作者。这份 README 遵循了开源项目的最佳实践，信息完整，且极具吸引力。

-----

## 🌌 Infinity-Nexus

### 🚀 无限枢纽：未来前端技术与架构的实践场

`Infinity-Nexus` 是一个基于 **Vue 3 + Micro-app** 构建的 **企业级 Monorepo 微前端架构** 模板。本项目致力于探索和实践前端前沿技术，提供一个开箱即用的、高性能的、高扩展性的技术展示平台和开发基座。

在这里，每一个子应用（`lab-*`）都是一个独立的技术试验田，通过微前端技术无缝集成到统一的**控制中心 (`main-hub`)** 中。

### ✨ 核心技术栈

| 类别 | 技术名称 | 角色定位 |
| :--- | :--- | :--- |
| **微前端/架构** | `Micro-app` | 京东轻量级微前端框架，实现应用隔离与集成。 |
| **Monorepo 管理** | `pnpm` + `Turborepo` | **pnpm** 管理依赖，**Turborepo** 实现超高性能的并行构建和智能缓存。 |
| **主框架** | `Vue 3` + `Vite` | 核心框架 + 极速开发与构建体验。 |
| **状态管理** | `Pinia` | 简单、类型安全、高性能的 Vue 状态管理库。 |
| **语言/类型** | `TypeScript` | 提供强大的类型约束和代码质量保证。 |
| **UI 组件库** | `Ant Design Vue 4` | 企业级 UI 组件库，保证界面的专业性和美观。 |
| **代码规范** | `ESLint` + `Prettier` | 统一的代码风格和质量控制。 |

### 📁 工程目录结构 (Monorepo)

本项目采用 pnpm Monorepo 结构，所有应用和公共库集中管理，实现代码和依赖的高效复用。

```text
infinity-nexus/
├── apps/                         # 所有独立的 Web 应用 (微前端基座和子应用)
│   ├── main-hub/                 # 🌌 基座应用：核心控制中心，负责路由和微应用加载
│   └── lab-visual/               # 🧪 子应用：一个技术实验室，用于展示炫酷的可视化组件
├── packages/                     # 可共享的内部库 (无需发布到 NPM 即可复用)
│   ├── infinity-ui/              # 💎 核心：基于 Ant Design Vue 封装的高阶组件
│   └── infinity-utils/           # 🧩 核心：全局通用的工具函数和配置
├── turbo.json                    # Turborepo 核心配置 (缓存、依赖图)
├── pnpm-workspace.yaml           # pnpm 工作区定义
└── package.json                  # 根配置和全局命令脚本
```

### ⚙️ 快速启动

本项目所有操作均在根目录执行，并通过 `turbo` 命令进行调度。

#### 1\. 环境准备

确保您的环境中已安装 **Node.js (\>=18)** 和 **pnpm**。

```bash
# 安装 pnpm
npm install -g pnpm
```

#### 2\. 安装依赖

在项目根目录下安装所有子包的依赖。

```bash
pnpm install
```

#### 3\. 开发模式启动

使用 `turbo run dev` 命令一键启动所有应用（基座和所有子应用）的开发服务。

```bash
pnpm dev
```

  * **基座应用 (main-hub):** 运行于 `http://localhost:3000`
  * **子应用 (lab-visual):** 运行于 `http://localhost:4001`

> 🚀 **提示：** Turborepo 会并行启动所有服务，极大提高开发效率。

#### 4\. 构建与部署

使用 `build` 命令可以一次性构建所有应用，并利用 Turborepo 的缓存机制只重新构建发生变化的项目。

```bash
pnpm build
```

构建产物将输出到各个项目下的 `dist/` 目录中。

### 🤝 贡献与扩展

欢迎通过以下方式扩展您的 `Infinity-Nexus`！

#### 1\. 创建新的子应用 (Lab)

在 `apps/` 目录下创建新项目，例如 `lab-lowcode`。

1.  运行 `pnpm create vite apps/lab-lowcode --template vue-ts`。
2.  在基座 `main-hub` 中配置新的 `<micro-app name='lab-lowcode' url='http://localhost:4002/' />`。
3.  在新应用的 `vite.config.ts` 中设置端口 `4002`，并开启跨域。

#### 2\. 在应用中使用 `infinity-ui`

`infinity-ui` 封装了基于 Ant Design Vue 的定制组件，实现了组件逻辑的复用。

无需安装，在任何 `apps/*` 或其他 `packages/*` 中，只需运行：

```bash
pnpm add @infinity/ui --filter <应用名称> # 例如：pnpm add @infinity/ui --filter main-hub
```

随后即可在您的 Vue 组件中导入使用：

```typescript
import { createNiceTable } from '@infinity/ui'
```

### 📜 许可协议

本项目基于 MIT 协议开源，详情请参阅 [LICENSE](https://www.google.com/search?q=LICENSE) 文件。