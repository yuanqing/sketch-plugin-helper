import Settings from 'sketch/settings'

import { packageJsonConfigKey } from '../common/constants'
import getPackageJson from '../common/get-package-json'
import isNumber from './is-number'

export default function getSavedUserInput () {
  const { defaults } = getPackageJson()[packageJsonConfigKey]
  if (typeof defaults == 'undefined') {
    return {}
  }
  return Object.keys(defaults).reduce(function (results, key) {
    const savedSetting = Settings.settingForKey(key)
    const defaultValue = defaults[key]
    const value =
      typeof savedSetting == 'undefined' ? defaultValue : savedSetting
    results[key] = isNumber(defaultValue) ? eval(value) : value
    return results
  }, {})
}
