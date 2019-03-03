const { openSettingsDialog, saveSettings } = require('sketch-plugin-helper')

export default function () {
  const settings = openSettingsDialog({
    title: 'Settings',
    inputs: [
      {
        key: 'greeting',
        label: 'Greeting',
        type: 'textBox'
      },
      {
        key: 'name',
        label: 'Name',
        type: 'textBox'
      }
    ]
  })
  if (settings) {
    saveSettings({ settings, successMessage: 'Settings saved' })
  }
}
