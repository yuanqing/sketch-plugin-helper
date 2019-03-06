module.exports = {
  openSettingsDialog: require('./settings/open-settings-dialog'),
  readSettings: require('./settings/read-settings'),
  saveSettings: require('./settings/save-settings'),
  ...require('./settings/input/input-types')
}
