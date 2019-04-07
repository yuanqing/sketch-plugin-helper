import {
  openSettingsDialog,
  saveSettings,
  showMessage,
  DROP_DOWN,
  TEXT_BOX
} from 'sketch-plugin-helper'

export default function helloWorld () {
  const settings = openSettingsDialog({
    title: 'Settings',
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
  saveSettings(settings)
  const { greeting, name } = settings
  showMessage(`${greeting}, ${name}`)
}
