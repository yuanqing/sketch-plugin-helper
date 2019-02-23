const {readSettings} = require('sketch-plugin-helper')

function helloWorld (context) {
  const {name} = readSettings()
  context.document.showMessage(`Hello, ${name}`)
}

module.exports = helloWorld
