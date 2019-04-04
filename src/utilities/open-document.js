import { Document } from 'sketch/dom'

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
