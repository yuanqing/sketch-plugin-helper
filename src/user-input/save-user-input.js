import { setSettingForKey } from 'sketch/settings'
import { showMessage } from '../utilities/show-message'

export function saveUserInput (userInput, options) {
  if (typeof userInput === 'undefined') {
    return
  }
  Object.keys(userInput).forEach(function (key) {
    const value = userInput[key]
    if (typeof value === 'undefined') {
      return
    }
    setSettingForKey(key, value)
  })
  if (options && options.successMessage) {
    showMessage(options.successMessage)
  }
}
