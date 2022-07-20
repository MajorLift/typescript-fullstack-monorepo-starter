# ts-fullstack-monorepo-starter

## Stack 
- **Frontend**: React, Redux Toolkit, Tailwind CSS
- **Backend**: Express.js, RTK Query, PostgreSQL
- **Project management**: Yarn Workspaces, TypeScript path aliases, tsconfig-paths-plugin
- **Build**: Webpack, Docker Compose
  - Transpilation, ts-node: **SWC**
    - [~60x speed improvement over babel, tsc. Better performance than esbuild.](https://swc.rs/docs/benchmarks)
    - Supports HMR with react-refresh (esbuild-loader doesn't).
  - Minification: **ESBuild**
    - [10x+ performance compared to terser, swc.](https://github.com/privatenumber/minification-benchmarks)
- **Linters**: ESLint, Prettier
  - VSCode Extensions: Typescript import sorter, Headwind, Inline-sql-syntax
- **Testing**: Jest, React Testing Library

## Monorepo
- React SPA, Express server, Redux and RTK Query store slices are all organized into indepenent modules. 
- Code and type definitions can be shared across the stack.
- Extensible: simple code sharing between mobile (native), desktop (electron), additional frontend apps or remote services etc. 

## Demo app
<img src="https://user-images.githubusercontent.com/34228073/179928197-62c4ef07-554c-453a-a25f-c83f95ef14f1.gif" width="360px" />
