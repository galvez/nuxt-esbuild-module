const { ESBuildPlugin } = require('esbuild-loader')

const { assign } = Object
const kRegistered = Symbol.for('registered')

const defaultOptions = {
  target: 'es2015',
}

module.exports = function (moduleOptions = {}) {
  if (!this.options.dev) {
    return
  }
  this.extendBuild((config) => {
    const jsxRuleIndex = config.module.rules.findIndex(r => '.jsx'.match(r.test))
    if (config.module.rules[jsxRuleIndex][kRegistered]) {
      return
    }
    config.plugins.push(new ESBuildPlugin())
    config.module.rules.splice(jsxRuleIndex, 1, {
      test: /\.((jsx?)|(ts))$/,
      use: [
        {
          loader: 'esbuild-loader',
          options: assign(defaultOptions, this.options.esbuild || {}, moduleOptions)
        }
      ]
    })
    config.module.rules[jsxRuleIndex][kRegistered] = true
  })
}
