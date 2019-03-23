import { sessionVariable, settingForKey } from 'sketch/settings'

import { packageJsonConfigKey } from '../common/constants'
import { getPackageJson } from '../common/get-package-json'

export function getSettings () {
  const { defaults } = getPackageJson()[packageJsonConfigKey]
  if (typeof defaults === 'undefined') {
    return {}
  }
  return Object.keys(defaults).reduce(function (results, key) {
    const sessionValue = sessionVariable(key)
    const savedValue = settingForKey(key)
    const value =
      typeof sessionValue !== 'undefined' ? sessionValue : savedValue
    const defaultValue = defaults[key]
    results[key] = typeof value !== 'undefined' ? value : defaultValue
    return results
  }, {})
}
