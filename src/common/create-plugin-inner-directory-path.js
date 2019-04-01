import { join } from 'path'

export function createPluginInnerDirectoryPath (pluginDirectoryPath) {
  return join(pluginDirectoryPath, 'Contents', 'Sketch')
}
