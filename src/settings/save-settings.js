import { setSettingForKey, setSessionVariable } from 'sketch/settings'
import { showMessage } from '../utilities/show-message'

export const saveSettings = saveSettingsFactory(setSettingForKey)
export const saveTemporarySettings = saveSettingsFactory(setSessionVariable)

function saveSettingsFactory (saveValue) {
  return function (settings, options) {
    if (typeof settings === 'undefined') {
      return
    }
    Object.keys(settings).forEach(function (key) {
      const value = settings[key]
      if (typeof value === 'undefined') {
        return
      }
      saveValue(key, value)
    })
    const successMessage =
      typeof options !== 'undefined' && options.successMessage
    if (successMessage) {
      showMessage(successMessage)
    }
  }
}
