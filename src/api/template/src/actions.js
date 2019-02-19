const methods = require('./methods')

module.exports = [
  {
    name: 'Hello World on Document Open',
    action: 'OpenDocument',
    handler: methods.helloWorld
  }
]
