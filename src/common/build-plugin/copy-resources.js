import { copy, exists } from 'fs-extra'
import { join } from 'path'

import { resourcesDirectory } from '../constants'

export async function copyResources (outputDirectoryPath) {
  const source = join(process.cwd(), resourcesDirectory)
  if (await exists(source)) {
    return copy(source, outputDirectoryPath)
  }
  return Promise.resolve()
}
