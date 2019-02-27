const { readSettings } = require('sketch-plugin-helper')

export default function (context) {
  const { greeting, name } = readSettings()
  context.document.showMessage(`${greeting}, ${name}`)
}
