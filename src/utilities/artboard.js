import { getLayersOnAllPages, getLayersOnCurrentPage } from './layer'

export function getArtboardsOnAllPages () {
  return getLayersOnAllPages().filter(filterArtboardsCallback)
}

export function getArtboardsOnCurrentPage () {
  return getLayersOnCurrentPage().filter(filterArtboardsCallback)
}

export function getSelectedArtboards () {
  return getSelectedLayers().filter(filterArtboardsCallback)
}

function filterArtboardsCallback (layer) {
  return layer.type === 'Artboard'
}
