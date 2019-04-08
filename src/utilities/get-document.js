import { fromNative } from 'sketch'

export function getCurrentDocument () {
  const documents = NSApplication.sharedApplication().orderedDocuments()
  return fromNative(documents[0])
}
