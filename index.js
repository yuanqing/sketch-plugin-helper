module.exports = {
  openSettingsDialog: require('./src/settings/open-settings-dialog'),
  readSettings: require('./src/settings/read-settings'),
  saveSettings: require('./src/settings/save-settings'),
  ...require('./src/settings/input/input-types')
}
