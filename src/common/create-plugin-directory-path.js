import { join } from 'path'

export function createPluginDirectoryPath (pluginName) {
  return join(
    process.env.HOME,
    'Library',
    'Application Support',
    'com.bohemiancoding.sketch3',
    'Plugins',
    `${pluginName}.sketchplugin`
  )
}

export function createPluginInnerDirectoryPath (pluginDirectoryPath) {
  return join(pluginDirectoryPath, 'Contents', 'Sketch')
}

export function createPluginResourcesDirectoryPath (pluginDirectoryPath) {
  return join(pluginDirectoryPath, 'Contents', 'Resources')
}
