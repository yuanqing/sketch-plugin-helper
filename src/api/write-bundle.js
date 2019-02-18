const webpack = require('webpack')

function writeBundle ({ inputFilePath, outputDirectoryPath, outputFileName }) {
  return new Promise(function (resolve, reject) {
    webpack(
      {
        entry: inputFilePath,
        output: {
          path: outputDirectoryPath,
          filename: outputFileName,
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
