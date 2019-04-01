import { join } from 'path'
import { exists } from 'fs-extra'

import { readAppcastVersions } from './appcast/read-appcast-versions'
import { appcastFileName, packageJsonConfigKey } from './constants'
import { getPackageJson } from './get-package-json'

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
