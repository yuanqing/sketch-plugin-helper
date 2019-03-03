const { openSettingsDialog, saveSettings } = require('sketch-plugin-helper')

export default function (context) {
  const settings = openSettingsDialog('Settings', [
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
  ])
  if (settings) {
    saveSettings(settings)
    context.document.showMessage('Settings saved')
  }
}
