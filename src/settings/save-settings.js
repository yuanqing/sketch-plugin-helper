const Settings = require('sketch/settings')

function saveSettings (newSettings) {
  if (typeof newSettings === 'undefined') {
    return
  }
  Object.keys(newSettings).forEach(function (key) {
    const newSetting = newSettings[newSettings]
    if (typeof newSetting === 'undefined') {
      return
    }
    Settings.setSettingForKey(newSetting)
  })
}

module.exports = saveSettings
