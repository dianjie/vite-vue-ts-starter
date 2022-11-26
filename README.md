# vite-vue-ts-starter

[![Vue3](https://img.shields.io/badge/Framework-Vue3-42b883)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Develop-Vite-747bff)](https://vitejs.dev)
[![Pinia](https://img.shields.io/badge/Store-Pinia-f7d336)](https://pinia.vuejs.org)
[![node-current](https://img.shields.io/node/v/vite)](https://nodejs.org/en/about/releases/)

Vue template for starter using Vue3 + TypeScript + Vite + Pinia 🚀

## Feature

-   [x] [Vue3.0](https://vuejs.org/)
-   [x] [Vue Router](https://github.com/vuejs/router)
-   [x] [TypeScript](https://www.typescriptlang.org/)
-   [x] [Vite](https://vitejs.dev/)
-   [x] [Pinia](https://pinia.vuejs.org/)
-   [x] [Element Plus](https://github.com/element-plus/element-plus)
-   [x] [Less](https://lesscss.org/)
-   [x] [Tailwindcss](https://tailwindcss.com/)
-   [x] [vueuse](https://github.com/vueuse/vueuse)
-   [x] [axios](https://github.com/axios/axios)
-   [x] [ESLint](https://eslint.org/)
-   [x] [Prettier](https://prettier.io/)
-   [x] [Stylelint](https://stylelint.io/)
-   [x] [Commitlint](https://github.com/conventional-changelog/commitlint)

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
