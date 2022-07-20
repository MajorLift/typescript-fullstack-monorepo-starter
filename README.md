# ts-react-redux-express-monorepo-template

## Monorepo
- React SPA, Express server, Redux and RTK Query store slices are all organized into indepenent modules. 
- Code and type definitions can be shared across the stack.
- Extensible: simple code sharing between mobile (native), desktop (electron), additional frontend apps or remote services etc. 

## Stack 
- **Frontend**: React, Redux Toolkit, Tailwind CSS
- **Backend**: Express.js, RTK Query, PostgreSQL
- **Project management**: Yarn Workspaces, TypeScript path aliases, tsconfig-paths-plugin
- **Build**: Webpack, Docker Compose
  - transpilation: swc-loader (faster, supports HMR)
  - minification: esbuild-loader (faster)
- **Linters**: eslint, prettier
  - VSCode Extensions: Typescript import sorter, Headwind, Inline-sql-syntax
- **Testing**: Jest, React Testing Library

## Demo app
![Demo-app-gif](https://user-images.githubusercontent.com/34228073/179928197-62c4ef07-554c-453a-a25f-c83f95ef14f1.gif)
