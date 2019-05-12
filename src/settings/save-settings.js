import { setSettingForKey, setSessionVariable } from 'sketch/settings'

import { flattenObject } from './nested-object/flatten-object'

export const saveSettings = saveSettingsFactory(setSettingForKey)
export const saveTemporarySettings = saveSettingsFactory(setSessionVariable)

function saveSettingsFactory (saveValue) {
  return function (settings) {
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
  }
}
