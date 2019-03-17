const Settings = require('sketch/settings')
const { showMessage } = require('../utilities/utilities')

function saveUserInput (userInput, options) {
  if (typeof userInput === 'undefined') {
    return
  }
  Object.keys(userInput).forEach(function (key) {
    const value = userInput[key]
    if (typeof value === 'undefined') {
      return
    }
    Settings.setSettingForKey(key, value)
  })
  if (options && options.successMessage) {
    showMessage(options.successMessage)
  }
}

module.exports = saveUserInput
