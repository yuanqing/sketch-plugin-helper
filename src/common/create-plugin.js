import { exists, outputFile, readFile } from 'fs-extra'
import isUtf8 from 'is-utf8'
import { join, resolve } from 'path'
import recursiveReaddir from 'recursive-readdir'

import { interpolate } from './interpolate'

export async function createPlugin ({ outputDirectoryPath, config }) {
  const pluginDirectoryPath = join(
    outputDirectoryPath,
    config.githubRepositoryName
  )
  if (await exists(pluginDirectoryPath)) {
    return Promise.reject(
      new Error(`Directory already exists: ${pluginDirectoryPath}`)
    )
  }
  return writePluginDirectory({ pluginDirectoryPath, config })
}

async function writePluginDirectory ({ pluginDirectoryPath, config }) {
  const templateDirectoryPath = resolve(__dirname, '..', 'template')
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
