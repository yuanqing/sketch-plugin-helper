import { setSettingForKey, setSessionVariable } from 'sketch/settings'

import { flattenObject } from './nested-object/flatten-object'
import { showMessage } from '../utilities/show-message'

export const saveSettings = saveSettingsFactory(setSettingForKey)
export const saveTemporarySettings = saveSettingsFactory(setSessionVariable)

function saveSettingsFactory (saveValue) {
  return function (settings, options) {
    if (!settings) {
      return
    }
    const flattenedSettings = flattenObject(settings)
    Object.keys(flattenedSettings).forEach(function (key) {
      const value = flattenedSettings[key]
      if (value == null) {
        return
      }
      saveValue(key, value)
    })
    const successMessage = options && options.successMessage
    if (successMessage) {
      showMessage(successMessage)
    }
  }
}
