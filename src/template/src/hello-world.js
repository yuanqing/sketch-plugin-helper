const { readSettings, showMessage } = require('sketch-plugin-helper')

export default function () {
  const { greeting, name } = readSettings()
  showMessage(`${greeting}, ${name}`)
}
