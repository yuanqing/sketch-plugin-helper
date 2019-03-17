const fs = require('fs-extra')
const path = require('path')

const createSymlinkPath = require('./create-symlink-path')
const readConfig = require('../read-config')

async function link () {
  const { pluginName } = await readConfig()
  const pluginDirectoryName = `${pluginName}.sketchplugin`
  const pluginDirectoryPath = path.join(process.cwd(), pluginDirectoryName)
  const symlinkPath = createSymlinkPath(pluginDirectoryName)
  if (await fs.exists(symlinkPath)) {
    return Promise.reject(new Error('Plugin already symlinked'))
  }
  return fs.symlink(pluginDirectoryPath, symlinkPath)
}

module.exports = link
