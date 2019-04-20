import { getCurrentDocument } from './get-document'

export function addLayersToPage ({ layers, page }) {
  return page.sketchObject.addLayers(layers)
}

export function addLayersToCurrentPage (layers) {
  const document = getCurrentDocument()
  return document.selectedPage.sketchObject.addLayers(layers)
}
