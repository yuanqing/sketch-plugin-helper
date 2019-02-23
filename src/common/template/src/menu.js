const methods = require('./methods')

module.exports = [
  {
    name: 'Hello World',
    handler: methods.helloWorld
  },
  {
    name: 'Settings',
    handler: methods.settings
  }
]
