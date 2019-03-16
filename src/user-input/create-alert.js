function createAlert (title) {
  const alert = NSAlert.alloc().init()
  alert.window().setAutorecalculatesKeyViewLoop(true)
  alert.setMessageText(title)
  alert.addButtonWithTitle('OK')
  alert.addButtonWithTitle('Cancel')
  return alert
}

module.exports = createAlert
