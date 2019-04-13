import {
  openSettingsDialog,
  saveTemporarySettings,
  showMessage,
  DROP_DOWN,
  TEXT_BOX
} from 'sketch-plugin-helper'

export default function helloWorld () {
  const settings = openSettingsDialog({
    title: 'Hello, World',
    inputs: [
      {
        type: DROP_DOWN,
        key: 'greeting',
        label: 'Greeting',
        possibleValues: ['Hello', 'Goodbye']
      },
      {
        type: TEXT_BOX,
        key: 'name',
        label: 'Name'
      }
    ]
  })
  if (!settings) {
    return
  }
  saveTemporarySettings(settings)
  const { greeting, name } = settings
  showMessage(`${greeting}, ${name}`)
}
