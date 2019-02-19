const dashify = require('dashify')
const fs = require('fs-extra')
const path = require('path')

const {
  bundleFileName,
  actionsConfigFilePath,
  menuConfigFilePath,
  methodsFilePath,
  manifestFileName
} = require('./constants')

async function writeManifest ({ outputDirectoryPath, config }) {
  const manifest = await createManifest(config)
  const outputFilePath = path.join(outputDirectoryPath, manifestFileName)
  const fileContent = JSON.stringify(manifest, null, 2)
  return fs.outputFile(outputFilePath, fileContent)
}

async function createManifest ({
  pluginName,
  pluginDescription,
  authorName,
  githubUserName,
  githubRepositoryName,
  versions
}) {
  const actionsConfig = (await requireIfExists(actionsConfigFilePath)) || []
  const menuConfig = (await requireIfExists(menuConfigFilePath)) || []
  const methods = require(path.join(process.cwd(), methodsFilePath))
  const pluginIdentifier = [githubUserName, githubRepositoryName].join('.')
  const commands = []
  const menu = {
    title: pluginName,
    items: []
  }
  parseMenuConfig({
    menuConfig,
    methods,
    pluginIdentifier,
    commands,
    menu
  })
  parseActionsConfig({
    actionsConfig,
    methods,
    pluginIdentifier,
    commands
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

async function requireIfExists (filePath) {
  const absolutePath = path.join(process.cwd(), filePath)
  if (await fs.exists(absolutePath)) {
    return require(absolutePath)
  }
  return null
}

function parseActionsConfig ({
  methods,
  actionsConfig,
  pluginIdentifier,
  commands
}) {
  actionsConfig.forEach(function (actionConfig) {
    const identifier = [
      pluginIdentifier,
      dashify(actionConfig.name),
      dashify(actionConfig.action)
    ].join('.')
    const handlerName = findHandlerName(actionConfig.handler, methods)
    const command = {
      name: actionConfig.name,
      identifier,
      script: bundleFileName,
      handlers: {
        actions: {
          [actionConfig.action]: handlerName
        }
      }
    }
    commands.push(command)
  })
}

function parseMenuConfig ({
  methods,
  menuConfig,
  pluginIdentifier,
  commands,
  menu
}) {
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
      menu.items.push(menuItemIdentifier)
      const command = createMenuItemCommand({
        name: menuItem.name,
        identifier: menuItemIdentifier,
        script: bundleFileName,
        shortcut: menuItem.shortcut,
        handler: menuItem.handler,
        methods
      })
      commands.push(command)
      return
    }
    // parent menu item
    const parentMenuItemName = Object.keys(menuItem)[0]
    const parentMenuItem = {
      title: parentMenuItemName,
      items: []
    }
    menu.items.push(parentMenuItem)
    parseMenuConfig({
      methods,
      menuConfig: menuItem[parentMenuItemName],
      pluginIdentifier,
      commands,
      menu: parentMenuItem
    })
  })
}

function createMenuItemCommand ({
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
