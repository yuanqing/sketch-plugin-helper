const fs = require('fs-extra')

const createSymlinkPath = require('./create-symlink-path')
const readConfig = require('../read-config')

async function unlink () {
  const { pluginName } = await readConfig()
  const pluginDirectoryName = `${pluginName}.sketchplugin`
  const symlinkPath = createSymlinkPath(pluginDirectoryName)
  if (await fs.exists(symlinkPath)) {
    return fs.unlink(symlinkPath)
  }
  return Promise.reject(new Error('Plugin symbolic link does not exist'))
}

module.exports = unlink
