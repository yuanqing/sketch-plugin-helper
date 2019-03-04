const Settings = require('sketch/settings')

const { packageJsonConfigKey } = require('../common/constants')
const getPackageJson = require('../common/get-package-json')

function readSettings () {
  const { defaultSettings } = getPackageJson()[packageJsonConfigKey]
  return Object.keys(defaultSettings).reduce(function (results, key) {
    const savedSetting = Settings.settingForKey(key)
    const defaultSetting = defaultSettings[key]
    results[key] =
      typeof savedSetting !== 'undefined' ? savedSetting : defaultSetting
    return results
  }, {})
}

module.exports = readSettings
