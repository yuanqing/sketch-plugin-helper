import { unlink } from 'fs-extra'

import { readConfig } from '../read-config'
import { symlinkExists } from './symlink-exists'

export async function deleteSymlink () {
  if (!(await symlinkExists())) {
    return Promise.reject(new Error('Symlink does not exist'))
  }
  const { pluginDirectoryPath } = await readConfig()
  return unlink(pluginDirectoryPath)
}
