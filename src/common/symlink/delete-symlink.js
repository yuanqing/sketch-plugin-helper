import { exists, unlink } from 'fs-extra'

import { readConfig } from '../read-config'

export async function deleteSymlink () {
  const { pluginDirectoryPath } = await readConfig()
  if (!(await exists(pluginDirectoryPath))) {
    return Promise.resolve()
  }
  return unlink(pluginDirectoryPath)
}
