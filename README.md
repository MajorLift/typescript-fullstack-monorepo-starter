# TypeScript Fullstack Monorepo Starter

- This project brings the blazing-fast DX of a **modern JS build system** to codebases reliant on *Webpack*. 
- It also implements a convenient monorepo setup that is extensible to any number of frontend clients or backend services.

## Features

### Speed Improvements
- Transpilation: **`SWC`**
    - [~60x speed improvement over `babel`, `tsc`. Better performance than `esbuild`.](https://swc.rs/docs/benchmarks)
    - Supports HMR with `react-refresh` (unlike `esbuild-loader`).
- Minification: **`ESBuild`**
    - [10x+ performance compared to `swc`, `terser`.](https://github.com/privatenumber/minification-benchmarks)

### Project structure
  - Monorepo setup with `Yarn Workspaces`, TypeScript path aliases, `tsconfig-paths-plugin`
  - React SPA, Express server, Redux state slices all organized as independent subrepos.
  - Simple code sharing (types, constants, modules) between cross-platform frontend clients (mobile, electron) and backend services. 

## Stack 
- **Frontend**: `React`, `Redux Toolkit`, `RTK Query`, `Tailwind CSS`
- **Backend**: `Express.js`, `ts-node`, `PostgreSQL`, `Docker Compose`
- **Express middleware**: `express-rate-limit`, `express-slow-down`, `helmet`, `hpp`, `nocache`, `morgan`
- **Build**: `Webpack`
- **Linters**: `ESLint`, `Prettier`, `Headwind`, `TypeScript Import Sorter`
- **Testing**: `Jest`, `React Testing Library`

## Getting Started 

### Install

Click the green `Use this Template` button on GitHub, or run this command.

```bash
git clone --depth 1 https://github.com/MajorLift/typescript-fullstack-monorepo-starter
```

Yarn is required to use this template.

```bash
npm install --global yarn
```

Docker is used to launch the Postgres DB. Download it [here](https://docs.docker.com/engine/install/).

### Scripts

1. To run the project in dev mode, navigate to the project directory and run:
```bash
yarn dev
```
- This will concurrently spawn...
  - The React app at [http://localhost:8080](http://localhost:8080)
  - The Express server at [http://localhost:3000](http://localhost:3000)
  - The Postgres DB at [http://localhost:5333](http://localhost:5333)

2. To generate a production build
```bash
yarn build
```

3. To preview the production build with `ts-node` running on `nodemon`
```bash
yarn start
```

4. To clean up or reload the DB
```bash
yarn docker-clean
yarn docker-reload
```

5. To run the linter
```bash
yarn lint
```

6. To run the test suite
```bash
yarn test
```
