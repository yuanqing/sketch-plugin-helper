import { setSettingForKey, setSessionVariable } from 'sketch/settings'

import { packageJsonConfigKey } from '../common/constants'
import { getPackageJson } from '../common/get-package-json'

export function resetSettings () {
  const { defaults } = getPackageJson()[packageJsonConfigKey]
  if (typeof defaults === 'undefined') {
    return
  }
  Object.keys(defaults).forEach(function (key) {
    setSettingForKey(key, undefined)
    setSessionVariable(key, undefined)
  })
}
