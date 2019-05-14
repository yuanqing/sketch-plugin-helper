const { join } = require('path')

const { packageJsonConfigKey } = require('../common/constants')

module.exports = function getPluginDisplayName () {
  const packageJsonPath = join(process.cwd(), 'package.json')
  const packageJson = require(packageJsonPath)
  const { displayName } = packageJson[packageJsonConfigKey]
  return displayName || packageJson.name
}
