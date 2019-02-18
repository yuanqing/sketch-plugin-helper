const dashify = require('dashify')
const fs = require('fs-extra')
const path = require('path')

const { bundleFileName, manifestFileName } = require('./constants')

function writeManifest ({
  methodsFilePath,
  menuConfigFilePath,
  outputDirectoryPath,
  config
}) {
  const manifest = createManifest({
    methodsFilePath,
    menuConfigFilePath,
    config
  })
  const outputFilePath = path.join(outputDirectoryPath, manifestFileName)
  const fileContent = JSON.stringify(manifest, null, 2)
  return fs.outputFile(outputFilePath, fileContent)
}

function createManifest ({
  methodsFilePath,
  menuConfigFilePath,
  config: {
    pluginName,
    pluginDescription,
    authorName,
    githubUserName,
    githubRepositoryName,
    versions
  }
}) {
  const methods = require(methodsFilePath)
  const menuConfig = require(menuConfigFilePath)
  const pluginIdentifier = [githubUserName, githubRepositoryName].join('.')
  const commands = []
  const menu = {
    title: pluginName,
    items: []
  }
  parse({
    methods,
    menuConfig,
    pluginIdentifier,
    commands,
    menu
  })
  return {
    name: pluginName,
    description: pluginDescription,
    author: authorName,
    homepage: `https://github.com/${githubUserName}/${githubRepositoryName}`,
    version: versions[0],
    identifier: pluginIdentifier,
    appcast: `https://raw.githubusercontent.com/${githubUserName}/${githubRepositoryName}/master/appcast.xml`,
    compatibleVersion: '52.3',
    bundleVersion: 1,
    disableCocoaScriptPreprocessor: true,
    commands,
    menu
  }
}

function parse ({ methods, menuConfig, pluginIdentifier, commands, menu }) {
  menuConfig.forEach(function (menuItem) {
    // separator
    if (menuItem === '-') {
      menu.items.push('-')
      return
    }
    // menu item
    if (menuItem.handler) {
      const menuItemIdentifier = [
        pluginIdentifier,
        dashify(menuItem.name)
      ].join('.')
      const command = createCommand({
        name: menuItem.name,
        identifier: menuItemIdentifier,
        script: bundleFileName,
        shortcut: menuItem.shortcut,
        handler: menuItem.handler,
        methods
      })
      commands.push(command)
      menu.items.push(menuItemIdentifier)
      return
    }
    // parent menu item
    const parentMenuItemName = Object.keys(menuItem)[0]
    const parentMenuItem = {
      title: parentMenuItemName,
      items: []
    }
    menu.items.push(parentMenuItem)
    parse({
      menuConfig: menuItem[parentMenuItemName],
      pluginIdentifier,
      bundleFileName,
      commands,
      menu: parentMenuItem
    })
  })
}

function createCommand ({
  name,
  identifier,
  script,
  shortcut,
  handler,
  methods
}) {
  const result = {}
  result.name = name
  result.identifier = identifier
  if (shortcut) {
    result.shortcut = shortcut
  }
  result.script = script
  result.handler = findHandlerName(handler, methods)
  return result
}

function findHandlerName (handler, methods) {
  return Object.keys(methods).reduce(function (result, handlerName) {
    const method = methods[handlerName]
    return method === handler ? handlerName : result
  }, null)
}

module.exports = writeManifest
