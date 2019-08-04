import { sessionVariable, settingForKey } from 'sketch/settings'
import { flattenObject } from './nested-object/flatten-object'
import { unflattenObject } from './nested-object/unflatten-object'

export function getSettings (defaultSettings) {
  if (typeof defaultSettings === 'undefined') {
    return {}
  }
  const result = {}
  const flattenedDefaultSettings = flattenObject(defaultSettings)
  Object.keys(flattenedDefaultSettings).forEach(function (key) {
    const sessionValue = sessionVariable(key)
    const savedValue = settingForKey(key)
    const value =
      typeof sessionValue !== 'undefined' ? sessionValue : savedValue
    const defaultValue = flattenedDefaultSettings[key]
    result[key] = typeof value !== 'undefined' ? value : defaultValue
  })
  return unflattenObject(result)
}
