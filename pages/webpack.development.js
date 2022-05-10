const ForkTsCheckerNotifierWebpackPlugin = require('fork-ts-checker-notifier-webpack-plugin')
const path = require('path')
const { merge } = require('webpack-merge')

require('webpack-dev-server')

const baseConfig = require('./webpack.config')

const devtool = process.env.DEVTOOL || 'eval-cheap-source-map'
const host = process.env.SERVE_HOST || 'localhost'
const port = process.env.PORT || 8080

const config = merge(baseConfig, {
  devtool,
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'build'),
    },
    host,
    port,
    hot: true,
    open: false,
    compress: true,
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    proxy: {
      '/api/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      '/static/**': {
        target: 'http://localhost:3000/',
        secure: false,
      },
    },
  },
  plugins: [
    new ForkTsCheckerNotifierWebpackPlugin({ title: 'TypeScript', excludeWarnings: false }),
  ],
})

module.exports = process.env.NODE_ENV === 'development' ? config : undefined
