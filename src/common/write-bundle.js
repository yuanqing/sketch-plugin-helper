const webpack = require('webpack')

const createWebpackConfig = require('./create-webpack-config')

function writeBundle ({isDevelopment, outputPath}) {
  const webpackConfig = createWebpackConfig({isDevelopment, outputPath})
  return new Promise(function (resolve, reject) {
    webpack(webpackConfig, function (error, stats) {
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

module.exports = writeBundle
