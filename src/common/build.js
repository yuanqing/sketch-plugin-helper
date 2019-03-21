import { exists, remove } from 'fs-extra'
import { join } from 'path'

import readConfig from './read-config'
import writeAppcast from './appcast/write-appcast'
import writeBundle from './write-bundle'
import writeManifest from './write-manifest'

export default async function build (isDevelopment) {
  const config = await readConfig()
  const pluginInnerDirectoryPath = join(
    process.cwd(),
    `${config.pluginName}.sketchplugin`,
    'Contents',
    'Sketch'
  )
  if (await exists(pluginInnerDirectoryPath)) {
    await remove(pluginInnerDirectoryPath)
  }
  return Promise.all([
    await writeAppcast(config),
    await writeBundle({
      config,
      isDevelopment,
      outputDirectoryPath: pluginInnerDirectoryPath
    }),
    await writeManifest({
      config,
      outputDirectoryPath: pluginInnerDirectoryPath
    })
  ])
}
