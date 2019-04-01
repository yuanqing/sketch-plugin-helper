import { exists, symlink } from 'fs-extra'
import { join } from 'path'

import { createPluginDirectoryPath } from '../create-plugin-directory-path'
import { readConfig } from '../read-config'

export async function createSymlink () {
  const { pluginName } = await readConfig()
  const pluginDirectoryName = `${pluginName}.sketchplugin`
  const pluginDirectoryPath = join(process.cwd(), pluginDirectoryName)
  const symlinkPath = createPluginDirectoryPath(pluginDirectoryName)
  if (await exists(symlinkPath)) {
    return Promise.reject(new Error('Plugin already symlinked'))
  }
  return symlink(pluginDirectoryPath, symlinkPath)
}
