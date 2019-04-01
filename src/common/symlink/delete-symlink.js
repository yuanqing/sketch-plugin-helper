import { exists, unlink } from 'fs-extra'

import { createPluginDirectoryPath } from '../create-plugin-directory-path'
import { readConfig } from '../read-config'

export async function deleteSymlink () {
  const { pluginName } = await readConfig()
  const pluginDirectoryName = `${pluginName}.sketchplugin`
  const symlinkPath = createPluginDirectoryPath(pluginDirectoryName)
  if (await exists(symlinkPath)) {
    return unlink(symlinkPath)
  }
  return Promise.reject(new Error('Plugin symbolic link does not exist'))
}
