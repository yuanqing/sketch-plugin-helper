import { spawn } from 'child_process'
import { outputFile, remove } from 'fs-extra'
import generate from 'nanoid/generate'
import lowercase from 'nanoid-dictionary/lowercase'
import { join } from 'path'
import { Transform } from 'stream'

import { buildBundle } from './build-plugin/build-bundle'
import { bundleFileName, manifestFileName } from './constants'
import { createPluginDirectoryPath } from './create-plugin-directory-path'
import { createPluginInnerDirectoryPath } from './create-plugin-inner-directory-path'

export async function runScript (entryFilePaths) {
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
        library: identifier
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

const PREFIX_QUOTE = /\n'/g
const POSTFIX_QUOTE = /'\n/g
const NEWLINE = /\\n/g

function stripQuotes (string) {
  return string
    .substring(1)
    .replace(PREFIX_QUOTE, '\n')
    .replace(POSTFIX_QUOTE, '\n')
    .replace(NEWLINE, '\n')
}

export function executePluginCommand ({ pluginDirectoryPath, identifier }) {
  const transformStream = new Transform({
    transform: function (chunk, encoding, callback) {
      callback(null, stripQuotes(chunk.toString()))
    }
  })
  return new Promise(function (resolve, reject) {
    const child = spawn(sketchtoolBinaryPath, [
      'run',
      pluginDirectoryPath,
      identifier
    ])
    child.stdout.pipe(transformStream).pipe(process.stdout)
    child.stderr.pipe(process.stderr)
    child.on('exit', resolve)
    child.on('error', reject)
  })
}
