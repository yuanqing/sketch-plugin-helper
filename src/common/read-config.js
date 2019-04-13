import { join } from 'path'
import { exists } from 'fs-extra'

import { readAppcastVersions } from './appcast/read-appcast-versions'
import { appcastFileName, packageJsonConfigKey } from './constants'
import { createPluginDirectoryPath } from './create-plugin-directory-path'
import { getPackageJson } from './get-package-json'

const slashRegularExpression = /\//g

export async function readConfig () {
  const packageJson = getPackageJson()
  const appcastPath = join(process.cwd(), appcastFileName)
  const sketchPluginHelperConfig = packageJson[packageJsonConfigKey]
  return {
    pluginName: sketchPluginHelperConfig.name,
    pluginDescription: packageJson.description,
    authorName: packageJson.author,
    repository: packageJson.repository,
    pluginIdentifier: packageJson.repository.replace(
      slashRegularExpression,
      '.'
    ),
    pluginDirectoryPath: createPluginDirectoryPath(
      sketchPluginHelperConfig.name
    ),
    versions: (await exists(appcastPath))
      ? await readAppcastVersions(appcastPath)
      : [packageJson.version],
    menuConfig: sketchPluginHelperConfig.menu,
    actionsConfig: sketchPluginHelperConfig.actions
  }
}
