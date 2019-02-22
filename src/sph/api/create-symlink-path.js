const path = require('path')

function createSymlinkPath (pluginDirectoryName) {
  return path.join(
    process.env.HOME,
    '/Library/Application Support/com.bohemiancoding.sketch3/Plugins',
    pluginDirectoryName
  )
}

module.exports = createSymlinkPath
