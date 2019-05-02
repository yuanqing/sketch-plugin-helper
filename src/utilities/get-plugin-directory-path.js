export function getPluginDirectoryPath () {
  const pluginName = preval.require('../settings/get-plugin-name')
  return `${
    process.env.HOME
  }/Library/Application Support/com.bohemiancoding.sketch3/Plugins/${pluginName}.sketchplugin`
}

export function getPluginResourcesDirectoryPath () {
  return `${getPluginDirectoryPath()}/Contents/Resources`
}

export function getPluginInnerDirectoryPath () {
  return `${getPluginDirectoryPath()}/Contents/Sketch`
}
