const { openSettingsDialog, saveSettings } = require('sketch-plugin-helper')

export default function (context) {
  const settings = openSettingsDialog('Settings', [
    {
      key: 'greeting',
      name: 'Greeting',
      type: 'textBox'
    },
    {
      key: 'name',
      name: 'Name',
      type: 'textBox'
    }
  ])
  if (settings) {
    saveSettings(settings)
    context.document.showMessage('Settings saved')
  }
}
