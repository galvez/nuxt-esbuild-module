# Nuxt ESBuild module

Enables [`esbuild-loader`](https://github.com/egoist/esbuild-loader) 
to transpile **JavaScript** and **TypeScript** in Nuxt.

**Use cases**:

- If you don't use TypeScript, **it's only enabled for dev**, effectively giving you a modern build to develop with, but will be disabled when building for production and only pass through Babel then. It doesn't make sense to run both esbuild-loader and babel-loader in this case because the speed gain offered by esbuild doesn't compensate well for the cost of running the entire source through Babel afterwards for targeting older browsers.

- If you do use TypeScript, it'll use esbuild to quickly transpile TypeScript and **additionally still do a final pass with the original Babel settings for production**. In this case it's doing two transpilations, the difference being it uses esbuild-loader instead of the official [ts-loader](https://github.com/TypeStrong/ts-loader), and, in this case, the speed gain is worthwhile.

This is similar to [Vite](https://github.com/vitejs/vite)'s approach.

## Install

```sh
npm i nuxt-esbuild --save
```

In `nuxt.config.js`:

```js
modules: [
  'nuxt-esbuild'
]
```

## Enabling TypeScript

In `nuxt.config.js`:

```js
modules: [
  'nuxt-esbuild'
],
esbuild: {
  loader: 'ts',
  // Seems to work alright without tsconfig.json though
  tsconfig: 'path-to-tsconfig.json',
},
```

## Notice

This is entirely experimental, no guarantees it will work for everyone.

Follow the [esbuild project](https://github.com/evanw/esbuild) for latest info on its reliability and options.
