import { runPluginCommand } from './run-plugin-command'
import { readConfig } from './read-config'
import { createCommandIdentifier } from './create-identifier'

export async function runHandler (handlerName) {
  const { pluginDirectoryPath, pluginIdentifier } = await readConfig()
  const commandIdentifier = createCommandIdentifier({
    pluginIdentifier,
    handlerName
  })
  return runPluginCommand({
    pluginDirectoryPath,
    commandIdentifier
  })
}
