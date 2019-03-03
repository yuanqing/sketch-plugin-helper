const { readSettings } = require('sketch-plugin-helper')
const UI = require('sketch/ui')

export default function () {
  const { greeting, name } = readSettings()
  UI.message(`${greeting}, ${name}`)
}
