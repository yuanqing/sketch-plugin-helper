import { setSettingForKey, setSessionVariable } from 'sketch/settings'
import { showMessage } from '@sketch-plugin-helper/utilities'
import { flattenObject } from './nested-object/flatten-object'

export function resetSettings (defaultSettings) {
  const flattenedDefaultSettings = flattenObject(defaultSettings)
  Object.keys(flattenedDefaultSettings).forEach(function (key) {
    setSettingForKey(key, undefined)
    setSessionVariable(key, undefined)
  })
  showMessage('Reset settings')
}
