export function getPluginDirectoryPath () {
  const pluginDisplayName = preval.require('./preval-get-plugin-display-name')
  return `${
    process.env.HOME
  }/Library/Application Support/com.bohemiancoding.sketch3/Plugins/${pluginDisplayName}.sketchplugin`
}

export function getPluginInnerDirectoryPath () {
  return `${getPluginDirectoryPath()}/Contents/Sketch`
}

export function getPluginResourcesDirectoryPath () {
  return `${getPluginDirectoryPath()}/Contents/Resources`
}
