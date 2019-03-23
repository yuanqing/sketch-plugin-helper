import { join } from 'path'
import { exists } from 'fs-extra'

import { readAppcastVersions } from './appcast/read-appcast-versions'
import { getPackageJson } from './get-package-json'
import { appcastFileName, packageJsonConfigKey } from './constants'

export async function readConfig () {
  const packageJson = getPackageJson()
  const appcastPath = join(process.cwd(), appcastFileName)
  const versions = (await exists(appcastPath))
    ? await readAppcastVersions(appcastPath)
    : [packageJson.version]
  return {
    ...packageJson[packageJsonConfigKey],
    versions
  }
}
