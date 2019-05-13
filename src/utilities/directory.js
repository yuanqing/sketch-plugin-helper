export function getPluginDirectoryPath () {
  const pluginName = preval.require('./preval-get-plugin-name')
  return `${
    process.env.HOME
  }/Library/Application Support/com.bohemiancoding.sketch3/Plugins/${pluginName}.sketchplugin`
}

export function getPluginInnerDirectoryPath () {
  return `${getPluginDirectoryPath()}/Contents/Sketch`
}

export function getPluginResourcesDirectoryPath () {
  return `${getPluginDirectoryPath()}/Contents/Resources`
}
