import { getCurrentDocument } from './get-document'
import { getCurrentPage, getAllPages } from './get-page'

export function getLayersOnCurrentPage () {
  return getCurrentPage().layers
}

export function getLayersOnAllPages () {
  const result = []
  getAllPages().forEach(function ({ layers }) {
    layers.forEach(function (layer) {
      result.push(layer)
    })
  })
  return result
}

export function getArtboardsOnCurrentPage () {
  return getLayersOnCurrentPage().filter(function (layer) {
    return layer.type === 'Artboard'
  })
}

export function getSelectedLayers () {
  const document = getCurrentDocument()
  return document.selectedLayers.layers.reverse()
}

export function getSelectedLayersOrLayersOnCurrentPage () {
  const selectedLayers = getSelectedLayers()
  return selectedLayers.length !== 0 ? selectedLayers : getLayersOnCurrentPage()
}
