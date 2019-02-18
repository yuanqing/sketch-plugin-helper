const fs = require('fs-extra')
const path = require('path')
const xmlJs = require('xml-js')

const createAppcast = require('./create-appcast')

function writeAppcast ({ outputDirectoryPath, outputFileName, config }) {
  const appcast = createAppcast(config)
  const xml = xmlJs.json2xml(appcast, { compact: true, spaces: 2 })
  const outputFilePath = path.join(outputDirectoryPath, outputFileName)
  return fs.outputFile(outputFilePath, xml + '\n')
}

module.exports = writeAppcast
