import { unlink } from 'fs-extra'
import { join } from 'path'
import tempWrite from 'temp-write'
import webpack from 'webpack'

import { bundleFileName, sourceDirectory } from './constants'

export default async function writeBundle ({
  config,
  isDevelopment,
  outputDirectoryPath
}) {
  const handlers = collectUniqueHandlers([].concat(config.actions, config.menu))
  const entryFileContent = generateEntryFileContent(handlers)
  const entryFilePath = await tempWrite(entryFileContent)
  const webpackConfig = createWebpackConfig({
    entryFilePath,
    isDevelopment,
    outputDirectoryPath
  })
  return new Promise(function (resolve, reject) {
    webpack(webpackConfig, async function (error, stats) {
      await unlink(entryFilePath)
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

function collectUniqueHandlers (array) {
  const result = {}
  collectUniqueHandlersHelper(array, result)
  return Object.keys(result)
}

function collectUniqueHandlersHelper (array, result) {
  array.forEach(function (item) {
    if (item == null || typeof item === 'string') {
      return
    }
    if (item.handler) {
      result[item.handler] = true
      return
    }
    const values = Object.values(item)
    if (values.length === 1 && Array.isArray(values[0])) {
      collectUniqueHandlersHelper(values[0], result)
    }
  })
}

function generateEntryFileContent (handlers) {
  const code = []
  handlers.forEach(function (handler) {
    code.push(
      `'${handler}':require('${join(
        process.cwd(),
        sourceDirectory,
        handler
      )}').default`
    )
  })
  return `module.exports={${code.join(',')}}`
}

const sketchModuleRegex = /^sketch(\/\w+)?$/
const brfsWrapperPath = join(__dirname, 'brfs-wrapper')

function createWebpackConfig ({
  entryFilePath,
  isDevelopment,
  outputDirectoryPath
}) {
  const mode = isDevelopment ? 'development' : 'production'
  return {
    mode,
    entry: entryFilePath,
    output: {
      path: outputDirectoryPath,
      filename: bundleFileName,
      libraryTarget: 'this'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loader: `transform-loader?${brfsWrapperPath}`
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
}
