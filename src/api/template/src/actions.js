const methods = require('./')

module.exports = [
  {
    name: 'Hello World on Document Open',
    action: 'OpenDocument',
    handler: methods.helloWorld
  }
]
