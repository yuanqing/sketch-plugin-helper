import { exists, unlink } from 'fs-extra'

import { createSymlinkPath } from './create-symlink-path'
import { readConfig } from '../read-config'

export async function deleteSymlink () {
  const { pluginName } = await readConfig()
  const pluginDirectoryName = `${pluginName}.sketchplugin`
  const symlinkPath = createSymlinkPath(pluginDirectoryName)
  if (await exists(symlinkPath)) {
    return unlink(symlinkPath)
  }
  return Promise.reject(new Error('Plugin symbolic link does not exist'))
}
