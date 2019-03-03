const fs = require('fs-extra')
const path = require('path')
const tempWrite = require('temp-write')
const webpack = require('webpack')

const { bundleFileName, sourceDirectory } = require('./constants')

async function writeBundle ({ config, isDevelopment, outputDirectoryPath }) {
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
      await fs.unlink(entryFilePath)
      console.log(stats.toString({ colors: true }))
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
  const handlers = {}
  array.forEach(function (item) {
    if (item.handler) {
      handlers[item.handler] = true
    }
  })
  return Object.keys(handlers)
}

function generateEntryFileContent (handlers) {
  const code = []
  handlers.forEach(function (handler) {
    code.push(
      `'${handler}':require('${path.join(
        process.cwd(),
        sourceDirectory,
        handler
      )}').default`
    )
  })
  return `module.exports={${code.join(',')}}`
}

const sketchModuleRegex = /^sketch(\/\w+)?$/

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
          loader: 'transform-loader?brfs'
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
    stats: 'minimal',
    plugins: [
      new webpack.EnvironmentPlugin({
        NODE_ENV: mode
      })
    ]
  }
}

module.exports = writeBundle
