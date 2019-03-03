const Settings = require('sketch/settings')
const UI = require('sketch/ui')

function saveSettings ({ settings, successMessage }) {
  if (typeof settings === 'undefined') {
    return
  }
  Object.keys(settings).forEach(function (key) {
    const value = settings[key]
    if (typeof value === 'undefined') {
      return
    }
    Settings.setSettingForKey(key, value)
  })
  if (successMessage) {
    UI.message(successMessage)
  }
}

module.exports = saveSettings
