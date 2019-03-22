import { getSelectedDocument } from 'sketch/dom'

export default function addLayersToPage (layers) {
  const document = getSelectedDocument()
  return document.selectedPage.sketchObject.addLayers(layers)
}
