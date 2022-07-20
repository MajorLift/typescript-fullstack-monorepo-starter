const { optimize: WebpackOptimize } = require('webpack')
const { ModuleConcatenationPlugin } = WebpackOptimize

const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.config')

// 'source-map': slowest build and rebuild, high-quality, non-transformed
// 'hidden-cheap-source-map': ok build, slow rebuild, error-reporting only
const devtool = process.env.DEVTOOL || 'nosources-source-map' // fastest

const config = merge(baseConfig, {
  mode: 'production',
  devtool,
  optimization: {
    concatenateModules: true,
  },
  plugins: [new ModuleConcatenationPlugin()],
})

module.exports = config
