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
