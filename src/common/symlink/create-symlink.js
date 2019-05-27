import { exists, symlink } from 'fs-extra'
import { join } from 'path'

import { readConfig } from '../read-config'
import { symlinkExists } from './symlink-exists'

export async function createSymlink () {
  const { pluginDisplayName, pluginDirectoryPath } = await readConfig()
  if (await symlinkExists()) {
    return Promise.reject(new Error('Symlink already exists'))
  }
  const buildPath = join(process.cwd(), `${pluginDisplayName}.sketchplugin`)
  if (!(await exists(buildPath))) {
    return Promise.reject(
      new Error('Plugin does not exist; do `npm run build` first')
    )
  }
  return symlink(buildPath, pluginDirectoryPath)
}
