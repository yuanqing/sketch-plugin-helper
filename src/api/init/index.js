const fs = require('fs-extra')
const isUtf8 = require('is-utf8')
const mustache = require('mustache')
const path = require('path')
const recursiveReaddir = require('recursive-readdir')

mustache.escape = function (text) {
  return text
}

const templatePath = path.resolve(__dirname, 'template')

async function outputPluginDirectory ({ pluginDirectoryPath, config }) {
  const filePaths = await recursiveReaddir(templatePath)
  return Promise.all(
    filePaths.map(async function (filePath) {
      const buffer = await fs.readFile(filePath)
      const outputPath = path.join(
        pluginDirectoryPath,
        filePath.substring(templatePath.length + 1)
      )
      const fileContents = isUtf8(buffer)
        ? mustache.render(buffer.toString(), config)
        : buffer
      return fs.outputFile(outputPath, fileContents)
    })
  )
}

async function init ({ outputDirectoryPath, config }) {
  const pluginDirectoryPath = path.join(
    outputDirectoryPath,
    config.githubRepositoryName
  )
  if (await fs.exists(pluginDirectoryPath)) {
    return Promise.reject(`Directory already exists: ${pluginDirectoryPath}`)
  }
  return outputPluginDirectory({ pluginDirectoryPath, config })
}

module.exports = init
