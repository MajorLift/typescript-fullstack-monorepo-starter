const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const { EsbuildPlugin } = require('esbuild-loader')
const path = require('path')

const mode = process.env.NODE_ENV || 'development'
const isDev = mode === 'development'

const baseConfig = {
  mode,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name]-[fullhash].bundle.js',
    chunkFilename: '[name]-[chunkhash].bundle.js',
    clean: true,
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.tsx', '.ts', '.js'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        loader: 'swc-loader',
      },
      {
        test: /\.(sa|s?c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(eot|woff2?|ttf|svg|png|jpe?g|gifv?|webp)$/i,
        type: 'asset', // replaces {file,raw,url}-loader in webpack 5.
        generator: {
          filename: 'static/[hash][ext][query]',
        },
      },
    ],
  },
  optimization: {
    minimizer: [
      new EsbuildPlugin({
        target: 'es6',
        css: true,
      }),
    ],
    usedExports: true,
    runtimeChunk: 'single',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'static/index.html'),
      hash: true,
      minify: !isDev,
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    new CspHtmlWebpackPlugin(
      {},
      {
        hashingMethod: 'sha512',
        hashEnabled: {
          'style-src': isDev,
        },
      }
    ),
    new MiniCssExtractPlugin(),
  ],
}

module.exports = baseConfig
