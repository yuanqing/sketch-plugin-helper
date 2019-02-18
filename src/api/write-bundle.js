const webpack = require('webpack')

const { bundleFileName } = require('./constants')

function writeBundle ({ inputFilePath, outputDirectoryPath }) {
  return new Promise(function (resolve, reject) {
    webpack(
      {
        entry: inputFilePath,
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
