export function createAlert (title) {
  const view = NSAlert.alloc().init()
  view.setMessageText(title)
  view.addButtonWithTitle('OK')
  view.addButtonWithTitle('Cancel')
  return view
}
