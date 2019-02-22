const webpack = require('webpack')

const { bundleFileName, methodsFilePath } = require('./constants')

function writeBundle (outputDirectoryPath) {
  return new Promise(function (resolve, reject) {
    webpack(
      {
        entry: methodsFilePath,
        output: {
          path: outputDirectoryPath,
          filename: bundleFileName,
          libraryTarget: 'this'
        }
      },
      function (error) {
        error ? reject(error) : resolve()
      }
    )
  })
}

module.exports = writeBundle
