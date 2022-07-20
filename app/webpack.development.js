const { merge } = require('webpack-merge')
require('webpack-dev-server')

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const path = require('path')

const baseConfig = require('./webpack.config')

// 'eval-source-map': slowest build, ok rebuild, high quality, non-transformed
// 'eval': fastest
const devtool = process.env.DEVTOOL || 'eval-cheap-module-source-map' // slow build, fast rebuild, transformed, original lines

const host = process.env.SERVE_HOST || 'localhost'
const port = process.env.PORT || 8080

const config = merge(baseConfig, {
  devtool,
  devServer: {
    host,
    port,
    static: {
      directory: path.resolve(__dirname, 'static'),
    },
    hot: true,
    liveReload: true,
    open: false,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    proxy: {
      context: ['/api/**', 'static/**'],
      target: 'http://localhost:3000/',
      secure: false,
    },
  },
  plugins: [new ReactRefreshWebpackPlugin()],
})

module.exports = config
