import { exists, unlink } from 'fs-extra'

import { readConfig } from '../read-config'

export async function deleteSymlink () {
  const { pluginDirectoryPath } = await readConfig()
  if (!(await exists(pluginDirectoryPath))) {
    return Promise.reject(new Error('Plugin symbolic link does not exist'))
  }
  return unlink(pluginDirectoryPath)
}
