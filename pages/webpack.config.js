const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

const mode = process.env.NODE_ENV || 'development'
const isDev = mode === 'development'

const baseConfig = {
  mode,
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json'],
    symlinks: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/i,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        loader: 'esbuild-loader',
        options: {
          loader: 'tsx',
          target: 'es2015',
        },
      },
      {
        test: /\.(sa|s?c)ss$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
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
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, 'static/index.html'),
      hash: true,
      minify: isDev
        ? undefined
        : {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          },
    }),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    new CspHtmlWebpackPlugin(
      {
        'script-src': [isDev ? "'unsafe-eval'" : "'self'"],
        'style-src': ["'self'"],
      },
      {
        hashingMethod: 'sha512',
        hashEnabled: {
          'style-src': isDev,
        },
      }
    ),
    new MiniCssExtractPlugin(),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        mode: 'write-references', // write-references for babel-loader, write-tsbuildinfo for ts-loader, write-dts for ts-loader with transpile-only flag.
        diagnosticOptions: {
          semantic: isDev,
          syntactic: true,
        },
        // memoryLimit: 4096,
      },
      eslint: {
        files: './src/**/*.{ts,tsx,js,jsx}', // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
        // memoryLimit: 4096,
      },
      issue: {
        include: {
          file: './src/**/*',
        },
        exclude: [
          {
            origin: 'eslint',
            severity: 'warning', // don't report eslint warnings.
          },
          {
            origin: 'eslint',
            file: '**/__tests__/**/*', // exclude eslint issues from jest test files.
          },
          {
            file: './*.ts', // exclude config files.
          },
        ],
      },
    }),
  ],
}

module.exports = baseConfig
