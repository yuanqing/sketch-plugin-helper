const {
  openSettingsDialog,
  saveSettings,
  TEXT_BOX,
  DROP_DOWN
} = require('sketch-plugin-helper')

export default function () {
  const settings = openSettingsDialog({
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
  if (settings) {
    saveSettings({ settings, successMessage: 'Settings saved' })
  }
}
