import { setSettingForKey, setSessionVariable } from 'sketch/settings'
import { showMessage } from '../utilities/show-message'

export const saveTemporarySettings = saveSettingsFactory(setSessionVariable)
export const savePermanentSettings = saveSettingsFactory(setSettingForKey)
export const saveSettings = savePermanentSettings

function saveSettingsFactory (saveValue) {
  return function (userInput, options) {
    if (typeof userInput === 'undefined') {
      return
    }
    const successMessage =
      typeof options !== 'undefined' && options.successMessage
    Object.keys(userInput).forEach(function (key) {
      const value = userInput[key]
      if (typeof value === 'undefined') {
        return
      }
      saveValue(key, value)
    })
    if (successMessage) {
      showMessage(successMessage)
    }
  }
}
