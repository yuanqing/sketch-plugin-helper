import { getSelectedDocument } from 'sketch/dom'

export function addLayersToPage (layers) {
  const document = getSelectedDocument()
  return document.selectedPage.sketchObject.addLayers(layers)
}
