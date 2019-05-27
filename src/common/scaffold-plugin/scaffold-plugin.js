import { exists, outputFile, readFile } from 'fs-extra'
import isUtf8 from 'is-utf8'
import { join, resolve } from 'path'
import mustache from 'mustache'
import recursiveReaddir from 'recursive-readdir'

import { showPrompt } from './show-prompt'

mustache.escape = function (text) {
  return text
}

export async function scaffoldPlugin ({ outputDirectoryPath, pluginName }) {
  const pluginDirectoryPath = join(outputDirectoryPath, pluginName)
  if (await exists(pluginDirectoryPath)) {
    return Promise.reject(
      new Error(`Directory already exists: ${pluginDirectoryPath}`)
    )
  }
  const config = await showPrompt(pluginName)
  return buildPluginDirectory({
    pluginDirectoryPath,
    config: {
      ...config,
      pluginName
    }
  })
}

async function buildPluginDirectory ({ pluginDirectoryPath, config }) {
  const templateDirectoryPath = resolve(__dirname, 'template')
  const filePaths = await recursiveReaddir(templateDirectoryPath)
  return Promise.all(
    filePaths.map(async function (filePath) {
      const buffer = await readFile(filePath)
      const outputPath = join(
        pluginDirectoryPath,
        filePath.substring(templateDirectoryPath.length + 1)
      )
      const fileContents = isUtf8(buffer)
        ? interpolate(buffer.toString(), config)
        : buffer
      return outputFile(outputPath, fileContents)
    })
  )
}

function interpolate (string, data) {
  return mustache.render(string, data)
}
