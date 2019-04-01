import execa from 'execa'
import { outputFile, remove } from 'fs-extra'
import generate from 'nanoid/generate'
import lowercase from 'nanoid-dictionary/lowercase'
import { join } from 'path'

import { buildBundle } from './build-plugin/build-bundle'
import { bundleFileName, manifestFileName } from './constants'
import { createPluginDirectoryPath } from './create-plugin-directory-path'
import { createPluginInnerDirectoryPath } from './create-plugin-inner-directory-path'

export async function runScript ({ entryFilePaths, globals }) {
  const identifier = `__${createUniqueIdentifier()}`
  const pluginDirectoryPath = createPluginDirectoryPath(
    `${identifier}.sketchplugin`
  )
  const outputDirectoryPath = createPluginInnerDirectoryPath(
    pluginDirectoryPath
  )
  try {
    await Promise.all([
      buildBundle({
        isDevelopment: true,
        entryFilePaths,
        outputDirectoryPath,
        library: identifier,
        globals
      }),
      buildManifest({
        outputDirectoryPath,
        identifier
      })
    ])
    await executePluginCommand({
      pluginDirectoryPath,
      identifier
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

async function buildManifest ({ outputDirectoryPath, identifier }) {
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

const sketchtoolBinaryPath = join(
  '/',
  'Applications',
  'Sketch.app',
  'Contents',
  'Resources',
  'sketchtool',
  'bin',
  'sketchtool'
)

export async function executePluginCommand ({
  pluginDirectoryPath,
  identifier
}) {
  return execa(sketchtoolBinaryPath, [
    'run',
    pluginDirectoryPath,
    identifier,
    '--without-activating'
  ])
}
