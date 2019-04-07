import { runPluginCommand } from './run-plugin-command'
import { readConfig } from './read-config'
import { createPluginDirectoryPath } from './create-plugin-directory-path'
import {
  createCommandIdentifier,
  createPluginIdentifier
} from './create-identifier'

export async function runHandler ({ handlerName, shouldRunInBackground }) {
  const {
    pluginName,
    githubUserName,
    githubRepositoryName
  } = await readConfig()
  const pluginDirectoryPath = createPluginDirectoryPath(pluginName)
  const pluginIdentifier = createPluginIdentifier({
    githubUserName,
    githubRepositoryName
  })
  const identifier = createCommandIdentifier({ pluginIdentifier, handlerName })
  return runPluginCommand({
    pluginDirectoryPath,
    identifier,
    shouldRunInBackground
  })
}
