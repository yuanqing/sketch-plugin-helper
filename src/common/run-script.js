import { outputFile, remove } from 'fs-extra'
import generate from 'nanoid/generate'
import lowercase from 'nanoid-dictionary/lowercase'
import { join } from 'path'

import { buildBundle } from './build-plugin/build-bundle'
import { bundleFileName, manifestFileName } from './constants'
import { createPluginDirectoryPath } from './create-plugin-directory-path'
import { createPluginInnerDirectoryPath } from './create-plugin-inner-directory-path'
import { runPluginCommand } from './run-plugin-command'

const pluginDirectoryPath = createPluginDirectoryPath('Sketch Plugin Helper')
const outputDirectoryPath = createPluginInnerDirectoryPath(pluginDirectoryPath)

export async function runScript (entryFilePaths) {
  const identifier = createUniqueIdentifier()
  try {
    await Promise.all([
      buildBundle({
        isDevelopment: true,
        entryFilePaths,
        outputDirectoryPath,
        library: identifier
      }),
      buildManifest({
        outputDirectoryPath,
        identifier
      })
    ])
    await runPluginCommand({
      pluginDirectoryPath,
      identifier,
      shouldRunInBackground: false
    })
  } catch (error) {
    throw error
  } finally {
    await remove(pluginDirectoryPath)
  }
}

function createUniqueIdentifier () {
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
    ]
  }
  const outputFilePath = join(outputDirectoryPath, manifestFileName)
  const fileContent = JSON.stringify(manifest, null, 2) + '\n'
  return outputFile(outputFilePath, fileContent)
}
