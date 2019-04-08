import { getCurrentDocument } from './get-document'

export function addLayersToCurrentPage (layers) {
  const document = getCurrentDocument()
  return document.selectedPage.sketchObject.addLayers(layers)
}
