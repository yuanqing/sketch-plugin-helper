const { join } = require('path')

const { packageJsonConfigKey } = require('../common/constants')

module.exports = function getPluginName () {
  const packageJsonPath = join(process.cwd(), 'package.json')
  const packageJson = require(packageJsonPath)
  const { name } = packageJson[packageJsonConfigKey]
  return name || packageJson.name
}
