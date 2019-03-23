import {
  openUserInputDialog,
  saveUserInput,
  showMessage,
  TEXT_BOX,
  DROP_DOWN
} from 'sketch-plugin-helper'

export function helloWorld () {
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
