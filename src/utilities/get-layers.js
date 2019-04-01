import { getSelectedDocument } from './get-selected-document'

export function getPageLayers () {
  const document = getSelectedDocument()
  const page = document.selectedPage
  return page.layers
}

export function getSelectedLayers () {
  const document = getSelectedDocument()
  return document.selectedLayers.layers.reverse()
}

export function getSelectedOrPageLayers () {
  const selectedLayers = getSelectedLayers()
  return selectedLayers.length !== 0 ? selectedLayers : getAllLayers()
}

export function getAllArtboards () {
  return getAllLayers().filter(function (layer) {
    return layer.type === 'Artboard'
  })
}

export const getAllLayers = getPageLayers
export const getSelectedOrAllLayers = getSelectedOrPageLayers
