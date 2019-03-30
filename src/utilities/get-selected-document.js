import { fromNative } from 'sketch'

export function getSelectedDocument () {
  const documents = NSApplication.sharedApplication().orderedDocuments()
  return fromNative(documents[0])
}
