const { assign } = Object

const kRegistered = Symbol.for('registered')

const defaultOptions = {
  target: 'es2015',
}

module.exports = function (moduleOptions = {}) {
  const options = assign({}, defaultOptions, this.options.esbuild || {}, moduleOptions)
  this.extendBuild((config) => {
    const jsxRuleIndex = config.module.rules.findIndex(r => '.jsx'.match(r.test))
    if (config.module.rules[jsxRuleIndex][kRegistered]) {
      return
    }
    const originalUse = config.module.rules[jsxRuleIndex].use
    if (this.options.dev || options.loader === 'ts') {
      config.module.rules.splice(jsxRuleIndex, 1, {
        test: /\.((m?jsx?)|(ts))$/,
        use: [
          {
            loader: 'esbuild-loader',
            options
          },
        ]
      })
    }
    if (!this.options.dev && options.loader === 'ts') {
      config.module.rules[jsxRuleIndex].use.push(...originalUse)
    }
    config.module.rules[jsxRuleIndex][kRegistered] = true
  })
}
