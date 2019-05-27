import { exists } from 'fs-extra'

import { readConfig } from '../read-config'

export async function symlinkExists () {
  const { pluginDirectoryPath } = await readConfig()
  return exists(pluginDirectoryPath)
}
