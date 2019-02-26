const { readSettings } = require('sketch-plugin-helper')

export default function (context) {
  const { name } = readSettings()
  context.document.showMessage(`Hello, ${name}`)
}
