import { sessionVariable, settingForKey } from 'sketch/settings'

export function getSettings ({
  keyPrefix = null,
  shouldRemoveKeyPrefix = true
} = {}) {
  const defaultSettings = preval.require('./get-default-settings')
  if (!defaultSettings) {
    return {}
  }
  const result = {}
  Object.keys(defaultSettings).forEach(function (key) {
    const sessionValue = sessionVariable(key)
    const savedValue = settingForKey(key)
    const value =
      typeof sessionValue !== 'undefined' ? sessionValue : savedValue
    const defaultValue = defaultSettings[key]
    result[key] = typeof value !== 'undefined' ? value : defaultValue
  })
  /* eslint-disable indent */
  return keyPrefix
    ? filterSettingsByKeyPrefix({
        settings: result,
        keyPrefix: `${keyPrefix}.`,
        shouldRemoveKeyPrefix
      })
    : result
  /* eslint-enable indent */
}

function filterSettingsByKeyPrefix ({
  settings,
  keyPrefix,
  shouldRemoveKeyPrefix
}) {
  const keyPrefixLength = keyPrefix.length
  const result = {}
  Object.keys(settings).forEach(function (key) {
    if (key.indexOf(keyPrefix) === -1) {
      return
    }
    result[shouldRemoveKeyPrefix ? key.substring(keyPrefixLength) : key] =
      settings[key]
  })
  return result
}
