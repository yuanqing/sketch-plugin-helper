import { exists, symlink } from 'fs-extra'
import { join } from 'path'

import { createSymlinkPath } from './create-symlink-path'
import { readConfig } from '../read-config'

export async function createSymlink () {
  const { pluginName } = await readConfig()
  const pluginDirectoryName = `${pluginName}.sketchplugin`
  const pluginDirectoryPath = join(process.cwd(), pluginDirectoryName)
  const symlinkPath = createSymlinkPath(pluginDirectoryName)
  if (await exists(symlinkPath)) {
    return Promise.reject(new Error('Plugin already symlinked'))
  }
  return symlink(pluginDirectoryPath, symlinkPath)
}
