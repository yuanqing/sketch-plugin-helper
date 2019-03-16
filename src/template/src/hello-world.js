const { getSavedUserInput, showMessage } = require('sketch-plugin-helper')

export default function () {
  const { greeting, name } = getSavedUserInput()
  showMessage(`${greeting}, ${name}`)
}
