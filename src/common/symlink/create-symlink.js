import { symlink } from 'fs-extra'
import { join } from 'path'

import { readConfig } from '../read-config'

export async function createSymlink () {
  const { pluginName, pluginDirectoryPath } = await readConfig()
  const buildPath = join(process.cwd(), `${pluginName}.sketchplugin`)
  return symlink(buildPath, pluginDirectoryPath)
}
