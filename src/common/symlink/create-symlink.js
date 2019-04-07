import { symlink } from 'fs-extra'
import { join } from 'path'

import { createPluginDirectoryPath } from '../create-plugin-directory-path'
import { readConfig } from '../read-config'

export async function createSymlink () {
  const { pluginName } = await readConfig()
  const buildPath = join(process.cwd(), `${pluginName}.sketchplugin`)
  const symlinkPath = createPluginDirectoryPath(pluginName)
  return symlink(buildPath, symlinkPath)
}
