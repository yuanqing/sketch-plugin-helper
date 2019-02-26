const { openSettingsDialog, saveSettings } = require('sketch-plugin-helper')

export default function (context) {
  const settings = openSettingsDialog([
    {
      key: 'name',
      type: 'textBox'
    }
  ])
  if (settings) {
    saveSettings(settings)
    context.document.showMessage('Settings saved')
  }
}
