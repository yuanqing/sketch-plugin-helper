import { packageJsonConfigKey } from '../common/constants'
import { getPackageJson } from '../common/get-package-json'

export function getDefaultSettings () {
  const { defaultSettings } = getPackageJson()[packageJsonConfigKey]
  return defaultSettings || {}
}
