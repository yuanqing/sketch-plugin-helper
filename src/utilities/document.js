import { fromNative } from 'sketch'
import { Document } from 'sketch/dom'

export function getCurrentDocument () {
  const documents = NSApplication.sharedApplication().orderedDocuments()
  return fromNative(documents[0])
}

export async function openDocument (filePath) {
  return new Promise(function (resolve, reject) {
    Document.open(filePath, function (error, document) {
      if (error) {
        return reject(error)
      }
      resolve(document)
    })
  })
}
