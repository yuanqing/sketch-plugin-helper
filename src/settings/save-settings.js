const Settings = require('sketch/settings')

function saveSettings (newSettings) {
  if (typeof newSettings === 'undefined') {
    return
  }
  Object.keys(newSettings).forEach(function (key) {
    const newSetting = newSettings[key]
    if (typeof newSetting === 'undefined') {
      return
    }
    Settings.setSettingForKey(key, newSetting)
  })
}

module.exports = saveSettings
