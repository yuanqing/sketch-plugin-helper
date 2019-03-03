const {
  openSettingsDialog,
  saveSettings,
  TEXT_BOX
} = require('sketch-plugin-helper')

export default function () {
  const settings = openSettingsDialog({
    title: 'Settings',
    inputs: [
      {
        key: 'greeting',
        label: 'Greeting',
        type: TEXT_BOX
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
