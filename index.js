const { ESBuildPlugin } = require('esbuild-loader')

const kRegistered = Symbol.for('registered')

module.exports = function () {
  this.extendBuild((config) => {
    const jsxRuleIndex = config.module.rules.findIndex(r => '.jsx'.match(r.test))
    if (config.module.rules[jsxRuleIndex][kRegistered]) {
      return
    }
    config.module.plugins.push(new ESBuildPlugin())
    config.module.rules.splice(jsxRuleIndex, 1, {
      test: config.module.rules[jsxRuleIndex].test,
      use: [
        {
          loader: 'esbuild-loader',
          options: {
            target: 'es2015',
          }
        }
      ]
    })
    config.module.rules[jsxRuleIndex][kRegistered] = true
  })
}
