import { join } from 'path'

export function createPluginDirectoryPath (pluginDisplayName) {
  return join(
    process.env.HOME,
    'Library',
    'Application Support',
    'com.bohemiancoding.sketch3',
    'Plugins',
    `${pluginDisplayName}.sketchplugin`
  )
}

export function createPluginInnerDirectoryPath (pluginDirectoryPath) {
  return join(pluginDirectoryPath, 'Contents', 'Sketch')
}

export function createPluginResourcesDirectoryPath (pluginDirectoryPath) {
  return join(pluginDirectoryPath, 'Contents', 'Resources')
}
