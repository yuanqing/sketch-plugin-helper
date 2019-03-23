import dashify from 'dashify'
import { outputFile } from 'fs-extra'
import { join } from 'path'

import { bundleFileName, manifestFileName } from './constants'

export async function writeManifest ({ config, outputDirectoryPath }) {
  const manifest = await createManifest(config)
  const outputFilePath = join(outputDirectoryPath, manifestFileName)
  const fileContent = JSON.stringify(manifest, null, 2) + '\n'
  return outputFile(outputFilePath, fileContent)
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
  if (menuConfig) {
    parseMenuConfig({
      menuConfig,
      pluginIdentifier,
      commands,
      menu
    })
  }
  if (actionsConfig) {
    parseActionsConfig({
      actionsConfig,
      pluginIdentifier,
      commands
    })
  }
  if (menu.items.length === 1) {
    menu.isRoot = true
    delete menu.title
  }
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
    if (menuItem === '-') {
      menu.items.push('-')
      return
    }
    // menu item
    if (menuItem.handler) {
      const { label, handler, shortcut } = menuItem
      const menuItemIdentifier = [
        pluginIdentifier,
        ...handler.split('/').map(dashify)
      ].join('.')
      menu.items.push(menuItemIdentifier)
      const command = {
        name: label,
        identifier: menuItemIdentifier,
        script: bundleFileName,
        shortcut,
        handler
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
