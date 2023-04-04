# TypeScript Fullstack Monorepo Starter

## Project structure
  - Monorepo setup with `Yarn Workspaces`, TypeScript path aliases, `tsconfig-paths-plugin`
  - React SPA, Express server, Redux state slices all organized as independent subrepos.
  - Simple code sharing (types, constants, modules) between cross-platform frontend clients (mobile, electron) and backend services. 

## Stack 
- **Frontend**: `React`, `Redux Toolkit`, `RTK Query`, `Tailwind CSS`
- **Backend**: `Express.js`, `PostgreSQL`, `Docker Compose`
  - Express middleware: `express-rate-limit`, `express-slow-down`, `helmet`, `hpp`, `nocache`, `morgan`
- **Build**: `Webpack`
  - Transpilation, `ts-node`: **`SWC`**
    - [~60x speed improvement over `babel`, `tsc`. Better performance than `esbuild`.](https://swc.rs/docs/benchmarks)
    - Supports HMR with `react-refresh` (unlike `esbuild-loader`).
  - Minification: **`ESBuild`**
    - [10x+ performance compared to `terser`, `swc`.](https://github.com/privatenumber/minification-benchmarks)
- **Linters**: `ESLint`, `Prettier`
  - `VSCode Extensions`: `Headwind`, `Inline-sql-syntax`, `TypeScript import sorter`
- **Testing**: `Jest`, `React Testing Library`

## Demo app
<img width="883" alt="Screenshot 2023-04-04 at 7 56 07 AM" src="https://user-images.githubusercontent.com/34228073/229833362-827c56cd-1da7-4c00-a2dd-5671d1d416a3.png">
