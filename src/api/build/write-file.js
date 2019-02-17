const fs = require('fs-extra')
const path = require('path')

async function writeFile ({
  fileContent,
  outputDirectoryPath,
  outputFileName
}) {
  const outputFilePath = path.join(outputDirectoryPath, outputFileName)
  return fs.outputFile(outputFilePath, fileContent)
}

module.exports = writeFile
