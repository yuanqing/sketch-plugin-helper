import { join } from 'path'

export function createPluginDirectoryPath (pluginDirectoryName) {
  return join(
    process.env.HOME,
    'Library',
    'Application Support',
    'com.bohemiancoding.sketch3',
    'Plugins',
    pluginDirectoryName
  )
}
