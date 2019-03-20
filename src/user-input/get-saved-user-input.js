const Settings = require('sketch/settings')

const { packageJsonConfigKey } = require('../common/constants')
const getPackageJson = require('../common/get-package-json')

export function getSavedUserInput () {
  const { defaults } = getPackageJson()[packageJsonConfigKey]
  return Object.keys(defaults).reduce(function (results, key) {
    const savedSetting = Settings.settingForKey(key)
    results[key] =
      typeof savedSetting !== 'undefined' ? savedSetting : defaults[key]
    return results
  }, {})
}
