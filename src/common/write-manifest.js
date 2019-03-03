/* eslint-disable eqeqeq */

const dashify = require('dashify')
const fs = require('fs-extra')
const path = require('path')

const { bundleFileName, manifestFileName } = require('./constants')

async function writeManifest ({ config, outputDirectoryPath }) {
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
  versions,
  menu: menuConfig,
  actions: actionsConfig
}) {
  const pluginIdentifier = [githubUserName, githubRepositoryName].join('.')
  const commands = []
  const menu = {
    title: pluginName,
    items: []
  }
  parseMenuConfig({
    menuConfig,
    pluginIdentifier,
    commands,
    menu
  })
  parseActionsConfig({
    actionsConfig,
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
    bundleVersion: 1,
    disableCocoaScriptPreprocessor: true,
    commands,
    menu
  }
}

function parseMenuConfig ({ menuConfig, pluginIdentifier, commands, menu }) {
  menuConfig.forEach(function (menuItem) {
    // separator
    if (menuItem == '-') {
      menu.items.push('-')
      return
    }
    // menu item
    if (menuItem.handler) {
      const name = menuItem.label
      const menuItemIdentifier = [pluginIdentifier, dashify(name)].join('.')
      menu.items.push(menuItemIdentifier)
      const command = {
        name,
        identifier: menuItemIdentifier,
        script: bundleFileName,
        shortcut: menuItem.shortcut,
        handler: menuItem.handler
      }
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
      menuConfig: menuItem[parentMenuItemName],
      pluginIdentifier,
      commands,
      menu: parentMenuItem
    })
  })
}

function parseActionsConfig ({ actionsConfig, pluginIdentifier, commands }) {
  actionsConfig.forEach(function (actionConfig) {
    const name = actionConfig.name || actionConfig.handler
    const identifier = [
      pluginIdentifier,
      dashify(name),
      dashify(actionConfig.action)
    ].join('.')
    const command = {
      name,
      identifier,
      script: bundleFileName,
      handlers: {
        actions: {
          [actionConfig.action]: actionConfig.handler
        }
      }
    }
    commands.push(command)
  })
}

module.exports = writeManifest
