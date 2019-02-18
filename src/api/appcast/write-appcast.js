const fs = require('fs-extra')
const path = require('path')
const xmlJs = require('xml-js')

const createAppcast = require('./create-appcast')
const { appcastFileName } = require('../constants')

function writeAppcast (config) {
  const appcast = createAppcast(config)
  const xml = xmlJs.json2xml(appcast, { compact: true, spaces: 2 })
  const outputFilePath = path.join(process.cwd(), appcastFileName)
  return fs.outputFile(outputFilePath, xml + '\n')
}

module.exports = writeAppcast
