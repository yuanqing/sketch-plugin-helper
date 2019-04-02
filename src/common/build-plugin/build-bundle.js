import { join } from 'path'
import webpack from 'webpack'

import { bundleFileName } from '../constants'

const sketchModuleRegex = /^sketch(\/\w+)?$/
const inlineFsReadFileSyncTransformFilePath = join(
  __dirname,
  'inline-fs-read-file-sync-transform'
)

export async function buildBundle ({
  isDevelopment,
  entryFilePaths,
  outputDirectoryPath,
  library
}) {
  const mode = isDevelopment ? 'development' : 'production'
  const webpackConfig = {
    mode,
    entry: entryFilePaths,
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
          loader: `transform-loader?${inlineFsReadFileSyncTransformFilePath}`
        }
      ]
    },
    devtool: isDevelopment ? 'source-map' : 'none',
    target: 'node',
    externals: [
      function (context, request, callback) {
        if (sketchModuleRegex.test(request)) {
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
    ]
  }
  return new Promise(function (resolve, reject) {
    webpack(webpackConfig, async function (error, stats) {
      if (error) {
        console.error(error.details)
      }
      if (stats.hasErrors()) {
        console.error(stats.toJson())
      }
      stats.hasErrors() ? reject(stats.toString()) : resolve()
    })
  })
}
