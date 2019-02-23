const Settings = require('sketch/settings')
const { defaultSettings } = require('../common/get-package-json').sph

function readSettings () {
  return Object.keys(defaultSettings).reduce(function (results, key) {
    const savedSetting = Settings.settingForKey(key)
    const defaultSetting = defaultSettings[key]
    results[key] =
      typeof savedSetting !== 'undefined' ? savedSetting : defaultSetting
    return results
  }, {})
}

module.exports = readSettings
