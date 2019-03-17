const {
  openUserInputDialog,
  saveUserInput,
  showMessage,
  TEXT_BOX,
  DROP_DOWN
} = require('sketch-plugin-helper')

function helloWorld () {
  const userInput = openUserInputDialog({
    title: 'Settings',
    inputs: [
      {
        key: 'greeting',
        label: 'Greeting',
        type: DROP_DOWN,
        possibleValues: ['Hello', 'Goodbye']
      },
      {
        key: 'name',
        label: 'Name',
        type: TEXT_BOX
      }
    ]
  })
  if (userInput) {
    saveUserInput(userInput)
  }
  const { greeting, name } = userInput
  showMessage(`${greeting}, ${name}`)
}

module.exports = helloWorld
