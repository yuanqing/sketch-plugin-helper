import { sessionVariable, settingForKey } from 'sketch/settings'

export function getSettings () {
  const defaultSettings = preval.require('./get-default-settings')
  if (!defaultSettings) {
    return {}
  }
  return Object.keys(defaultSettings).reduce(function (results, key) {
    const sessionValue = sessionVariable(key)
    const savedValue = settingForKey(key)
    const value =
      typeof sessionValue !== 'undefined' ? sessionValue : savedValue
    const defaultValue = defaultSettings[key]
    results[key] = typeof value !== 'undefined' ? value : defaultValue
    return results
  }, {})
}
