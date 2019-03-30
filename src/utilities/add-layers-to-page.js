import { getSelectedDocument } from './get-selected-document'

export function addLayersToPage (layers) {
  const document = getSelectedDocument()
  return document.selectedPage.sketchObject.addLayers(layers)
}
