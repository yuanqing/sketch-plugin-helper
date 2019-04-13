import { outputFile } from 'fs-extra'
import { join } from 'path'

import { bundleFileName, manifestFileName } from '../constants'
import {
  createActionIdentifier,
  createCommandIdentifier
} from '../create-identifier'

export async function buildManifest ({ config, outputDirectoryPath }) {
  const manifest = await createManifest(config)
  const outputFilePath = join(outputDirectoryPath, manifestFileName)
  const fileContent = JSON.stringify(manifest, null, 2) + '\n'
  return outputFile(outputFilePath, fileContent)
}

async function createManifest ({
  pluginName,
  pluginDescription,
  authorName,
  repository,
  pluginIdentifier,
  versions,
  menuConfig,
  actionsConfig
}) {
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
    homepage: `https://github.com/${repository}`,
    version: versions[0],
    identifier: pluginIdentifier,
    appcast: `https://raw.githubusercontent.com/${repository}/master/appcast.xml`,
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
      const identifier = createCommandIdentifier({
        pluginIdentifier,
        handlerName: handler
      })
      menu.items.push(identifier)
      const command = {
        name: label,
        identifier,
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
    const identifier = createActionIdentifier({
      pluginIdentifier,
      handlerName: name,
      actionName: actionConfig.action
    })
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
