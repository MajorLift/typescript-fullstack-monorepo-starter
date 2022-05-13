const { ESBuildMinifyPlugin } = require('esbuild-loader')
const { optimize: WebpackOptimize } = require('webpack')
const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.config')

const { ModuleConcatenationPlugin } = WebpackOptimize

const config = merge(baseConfig, {
  mode: 'production',
  devtool: 'hidden-source-map',
  plugins: [new ModuleConcatenationPlugin()],
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        css: true,
      }),
    ],
    usedExports: true,
    splitChunks: {
      minSize: 0,
    },
    concatenateModules: true,
  },
})

module.exports = process.env.NODE_ENV === 'production' ? config : undefined
