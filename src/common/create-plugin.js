const fs = require('fs-extra')
const isUtf8 = require('is-utf8')
const path = require('path')
const recursiveReaddir = require('recursive-readdir')

const interpolate = require('./interpolate')

async function create ({ outputDirectoryPath, config }) {
  const pluginDirectoryPath = path.join(
    outputDirectoryPath,
    config.githubRepositoryName
  )
  if (await fs.exists(pluginDirectoryPath)) {
    return Promise.reject(
      new Error(`Directory already exists: ${pluginDirectoryPath}`)
    )
  }
  return writePluginDirectory({ pluginDirectoryPath, config })
}

async function writePluginDirectory ({ pluginDirectoryPath, config }) {
  const templateDirectoryPath = path.resolve(__dirname, '..', 'template')
  const filePaths = await recursiveReaddir(templateDirectoryPath)
  return Promise.all(
    filePaths.map(async function (filePath) {
      const buffer = await fs.readFile(filePath)
      const outputPath = path.join(
        pluginDirectoryPath,
        filePath.substring(templateDirectoryPath.length + 1)
      )
      const fileContents = isUtf8(buffer)
        ? interpolate(buffer.toString(), config)
        : buffer
      return fs.outputFile(outputPath, fileContents)
    })
  )
}

module.exports = create
