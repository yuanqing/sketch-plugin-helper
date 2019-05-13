const { join } = require('path')

const { packageJsonConfigKey } = require('../common/constants')

module.exports = function getDefaultSettings () {
  const packageJsonPath = join(process.cwd(), 'package.json')
  const { defaultSettings } = require(packageJsonPath)[packageJsonConfigKey]
  return defaultSettings || null
}
