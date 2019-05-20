import { join, resolve } from 'path'
import webpack from 'webpack'
import TerserPlugin from 'terser-webpack-plugin'

import { bundleFileName } from '../constants'

const sketchModuleRegularExpression = /^sketch(\/\w+)?$/

const babelPluginTransformRelativePaths = join(
  __dirname,
  'babel-plugin-transform-relative-paths'
)

export async function buildBundle ({
  development,
  entryFilePaths,
  outputDirectoryPath,
  library
}) {
  const mode = development ? 'development' : 'production'
  const webpackConfig = {
    mode,
    entry: entryFilePaths.map(function (entryFilePath) {
      return resolve(entryFilePath)
    }),
    output: {
      path: outputDirectoryPath,
      filename: bundleFileName,
      libraryTarget: 'this',
      library
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: ['preval', babelPluginTransformRelativePaths]
            }
          }
        }
      ]
    },
    devtool: development ? 'source-map' : 'none',
    target: 'node',
    externals: [
      function (context, request, callback) {
        if (sketchModuleRegularExpression.test(request)) {
          return callback(null, `commonjs ${request}`)
        }
        return callback()
      }
    ],
    stats: 'errors-only',
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode
      })
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false
            }
          }
        })
      ]
    }
  }
  return new Promise(function (resolve, reject) {
    webpack(webpackConfig, async function (error, stats) {
      if (stats.hasErrors()) {
        reject(stats.toJson().errors.join('\n'))
        return
      }
      if (error) {
        reject(error)
        return
      }
      resolve()
    })
  })
}
