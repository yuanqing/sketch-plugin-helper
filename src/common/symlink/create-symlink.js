import { symlink } from 'fs-extra'
import { join } from 'path'

import { readConfig } from '../read-config'

export async function createSymlink () {
  const { pluginDisplayName, pluginDirectoryPath } = await readConfig()
  const buildPath = join(process.cwd(), `${pluginDisplayName}.sketchplugin`)
  return symlink(buildPath, pluginDirectoryPath)
}
