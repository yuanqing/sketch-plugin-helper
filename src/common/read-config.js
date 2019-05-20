import { join } from 'path'
import { exists } from 'fs-extra'

import { readAppcastVersions } from './appcast/read-appcast-versions'
import { appcastFileName, packageJsonConfigKey } from './constants'
import { createPluginDirectoryPath } from './create-plugin-directory-path'

const slashRegularExpression = /\//g

export async function readConfig () {
  const packageJsonPath = join(process.cwd(), 'package.json')
  const packageJson = require(packageJsonPath)
  const appcastPath = join(process.cwd(), appcastFileName)
  const sketchPluginHelperConfig = packageJson[packageJsonConfigKey]
  const appcastVersions = (await exists(appcastPath))
    ? await readAppcastVersions(appcastPath)
    : null
  return {
    pluginName: packageJson.name,
    pluginDisplayName: sketchPluginHelperConfig.name,
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
    versions: appcastVersions || [packageJson.version],
    menuConfig: sketchPluginHelperConfig.menu,
    actionsConfig: sketchPluginHelperConfig.actions
  }
}
