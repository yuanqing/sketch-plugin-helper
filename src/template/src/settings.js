const {
  openUserInputDialog,
  saveUserInput,
  TEXT_BOX,
  DROP_DOWN
} = require('sketch-plugin-helper')

export default function () {
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
    saveUserInput(userInput, { successMessage: 'Settings saved' })
  }
}
