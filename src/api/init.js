const fs = require('fs-extra')
const isUtf8 = require('is-utf8')
const mustache = require('mustache')
const path = require('path')
const recursiveReaddir = require('recursive-readdir')

async function init (config) {
  const pluginDirectoryPath = path.join(
    config.outputDirectoryPath,
    config.githubRepositoryName
  )
  if (await fs.exists(pluginDirectoryPath)) {
    return Promise.reject(
      new Error(`Directory already exists: ${pluginDirectoryPath}`)
    )
  }
  return writePluginDirectory({ pluginDirectoryPath, config })
}

mustache.escape = function (text) {
  return text
}

const templateDirectoryPath = path.resolve(__dirname, 'template')

async function writePluginDirectory ({ pluginDirectoryPath, config }) {
  const filePaths = await recursiveReaddir(templateDirectoryPath)
  return Promise.all(
    filePaths.map(async function (filePath) {
      const buffer = await fs.readFile(filePath)
      const outputPath = path.join(
        pluginDirectoryPath,
        filePath.substring(templateDirectoryPath.length + 1)
      )
      const fileContents = isUtf8(buffer)
        ? mustache.render(buffer.toString(), config)
        : buffer
      return fs.outputFile(outputPath, fileContents)
    })
  )
}

module.exports = init
