const {openSettingsDialog, saveSettings} = require('sketch-plugin-helper')

function settings (context) {
  const settings = openSettingsDialog([
    {
      key: 'foo',
      type: 'textBox'
    }
  ])
  if (settings) {
    saveSettings(settings)
    context.document.showMessage('Settings saved')
  }
}

module.exports = settings
