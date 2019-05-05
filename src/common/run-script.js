import { outputFile, remove } from 'fs-extra'
import generate from 'nanoid/generate'
import lowercase from 'nanoid-dictionary/lowercase'
import { join } from 'path'

import { buildBundle } from './build-plugin/build-bundle'
import { bundleFileName, manifestFileName } from './constants'
import {
  createPluginDirectoryPath,
  createPluginInnerDirectoryPath
} from './create-plugin-directory-path'
import { runPluginCommand } from './run-plugin-command'

const pluginDirectoryPath = createPluginDirectoryPath('Sketch Plugin Helper')
const outputDirectoryPath = createPluginInnerDirectoryPath(pluginDirectoryPath)

export async function runScript (entryFilePaths) {
  const uuid = createUuid()
  try {
    await Promise.all([
      buildBundle({
        isDevelopment: true,
        entryFilePaths,
        outputDirectoryPath,
        library: uuid
      }),
      buildManifest({
        outputDirectoryPath,
        identifier: uuid
      })
    ])
    await runPluginCommand({
      pluginDirectoryPath,
      commandIdentifier: uuid,
      shouldRunInBackground: false
    })
  } catch (error) {
    throw error
  } finally {
    await remove(pluginDirectoryPath)
  }
}

function createUuid () {
  return generate(lowercase, 20)
}

function buildManifest ({ outputDirectoryPath, identifier }) {
  const manifest = {
    identifier,
    disableCocoaScriptPreprocessor: true,
    commands: [
      {
        identifier,
        script: bundleFileName,
        handler: identifier
      }
    ],
    menu: {
      items: []
    }
  }
  const outputFilePath = join(outputDirectoryPath, manifestFileName)
  const fileContent = JSON.stringify(manifest, null, 2) + '\n'
  return outputFile(outputFilePath, fileContent)
}
