import { exists, unlink } from 'fs-extra'

import { createPluginDirectoryPath } from '../create-plugin-directory-path'
import { readConfig } from '../read-config'

export async function deleteSymlink () {
  const { pluginName } = await readConfig()
  const symlinkPath = createPluginDirectoryPath(pluginName)
  if (!(await exists(symlinkPath))) {
    return Promise.reject(new Error('Plugin symbolic link does not exist'))
  }
  return unlink(symlinkPath)
}
