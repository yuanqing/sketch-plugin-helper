import { spawn } from 'child_process'
import { outputFile, remove } from 'fs-extra'
import generate from 'nanoid/generate'
import lowercase from 'nanoid-dictionary/lowercase'
import { join } from 'path'

import { buildBundle } from './build-plugin/build-bundle'
import { bundleFileName, manifestFileName } from './constants'
import { createPluginDirectoryPath } from './create-plugin-directory-path'
import { createPluginInnerDirectoryPath } from './create-plugin-inner-directory-path'

const pluginDirectoryPath = createPluginDirectoryPath(
  'Sketch Plugin Helper.sketchplugin'
)
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

function executePluginCommand ({ pluginDirectoryPath, identifier }) {
  return new Promise(function (resolve, reject) {
    const child = spawn(sketchtoolBinaryPath, [
      'run',
      pluginDirectoryPath,
      identifier
    ])
    child.stdout.on('data', function (chunk) {
      console.log(stripQuotes(chunk.toString()))
    })
    child.stderr.pipe(process.stderr)
    child.on('exit', resolve)
    child.on('error', reject)
  })
}

const QUOTE_PREFIX = /^'/g
const QUOTE_POSTFIX = /'$/g
const QUOTE_BEFORE_NEWLINE = /'\n/g
const QUOTE_AFTER_NEWLINE = /\n'/g
const ESCAPED_NEWLINE = /\\n/g

function stripQuotes (string) {
  return string
    .replace(QUOTE_PREFIX, '')
    .replace(QUOTE_POSTFIX, '')
    .replace(QUOTE_BEFORE_NEWLINE, '\n')
    .replace(QUOTE_AFTER_NEWLINE, '\n')
    .replace(ESCAPED_NEWLINE, '\n')
}
