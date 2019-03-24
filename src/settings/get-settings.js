import { sessionVariable, settingForKey } from 'sketch/settings'

import { packageJsonConfigKey } from '../common/constants'
import { getPackageJson } from '../common/get-package-json'

export function getSettings () {
  const { defaultSettings } = getPackageJson()[packageJsonConfigKey]
  if (typeof defaultSettings === 'undefined') {
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
