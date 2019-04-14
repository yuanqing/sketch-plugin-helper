import { exists, remove } from 'fs-extra'
import { join } from 'path'
import tempWrite from 'temp-write'

import { buildAppcast } from '../appcast/build-appcast'
import { buildBundle } from './build-bundle'
import { buildManifest } from './build-manifest'
import { sourceDirectory } from '../constants'
import { createPluginInnerDirectoryPath } from '../create-plugin-inner-directory-path'
import { readConfig } from '../read-config'

export async function buildPlugin (isDevelopment) {
  const config = await readConfig()
  const outputDirectoryPath = createPluginInnerDirectoryPath(
    join(process.cwd(), `${config.pluginName}.sketchplugin`)
  )
  if (await exists(outputDirectoryPath)) {
    await remove(outputDirectoryPath)
  }
  const entryFilePath = await writeEntryFile(config)
  await Promise.all([
    await buildAppcast(config),
    await buildBundle({
      isDevelopment,
      entryFilePaths: [entryFilePath],
      outputDirectoryPath
    }),
    await buildManifest({
      config,
      outputDirectoryPath
    })
  ])
  return remove(entryFilePath)
}

function writeEntryFile (config) {
  const handlers = collectUniqueHandlers(
    [].concat(config.actionsConfig, config.menuConfig)
  )
  const entryFileContent = createEntryFileContent(handlers)
  return tempWrite(entryFileContent)
}

function collectUniqueHandlers (array) {
  const result = {}
  collectUniqueHandlersHelper(array, result)
  return Object.keys(result)
}

function collectUniqueHandlersHelper (array, result) {
  array.forEach(function (item) {
    if (item == null || typeof item === 'string') {
      return
    }
    if (item.handler) {
      result[item.handler] = true
      return
    }
    const values = Object.values(item)
    if (values.length === 1 && Array.isArray(values[0])) {
      collectUniqueHandlersHelper(values[0], result)
    }
  })
}

function createEntryFileContent (handlers) {
  const code = []
  handlers.forEach(function (handler) {
    code.push(
      `'${handler}':require('${join(
        process.cwd(),
        sourceDirectory,
        handler
      )}').default`
    )
  })
  return `module.exports={${code.join(',')}}`
}
