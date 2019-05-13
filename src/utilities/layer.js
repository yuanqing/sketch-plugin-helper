import { getCurrentDocument } from './document'
import { getCurrentPage, getAllPages } from './page'

export function addLayersToCurrentPage (layers) {
  return getCurrentDocument().selectedPage.sketchObject.addLayers(layers)
}

export function adjustParentGroupsToFit (layer) {
  adjustParentGroupsToFitHelper(layer, {})
}
function adjustParentGroupsToFitHelper (layer, adjustedGroupIds) {
  const parent = layer.parent
  if (parent && parent.type === 'Group' && !adjustedGroupIds[parent.id]) {
    parent.adjustToFit()
    adjustedGroupIds[parent.id] = true
    adjustParentGroupsToFitHelper(parent, adjustedGroupIds)
  }
}

export function calculateCoordinatesRelativeToArtboard (layer) {
  if (layer.parent.type === 'Page') {
    return null
  }
  return calculateCoordinatesRelativeToArtboardHelper(layer, {
    x: layer.frame.x,
    y: layer.frame.y
  })
}
function calculateCoordinatesRelativeToArtboardHelper (layer, result) {
  const parent = layer.parent
  if (parent.type === 'Artboard') {
    return result
  }
  const newResult = {
    x: result.x + parent.frame.x,
    y: result.y + parent.frame.y
  }
  return calculateCoordinatesRelativeToArtboardHelper(parent, newResult)
}

export function calculateCoordinatesRelativeToPage (layer) {
  return calculateCoordinatesRelativeToPageHelper(layer, {
    x: layer.frame.x,
    y: layer.frame.y
  })
}
function calculateCoordinatesRelativeToPageHelper (layer, result) {
  const parent = layer.parent
  if (parent.type === 'Page') {
    return result
  }
  const newResult = {
    x: result.x + parent.frame.x,
    y: result.y + parent.frame.y
  }
  if (parent.type === 'Artboard') {
    return newResult
  }
  return calculateCoordinatesRelativeToPageHelper(parent, newResult)
}

export function findLayersByNameOnCurrentPage (name) {
  const result = []
  iterateChildLayers(getLayersOnCurrentPage(), function (layer) {
    if (layer.name === name) {
      result.push(layer)
    }
  })
  return result
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

export function getLayersOnCurrentPage () {
  return getCurrentPage().layers
}

export function getSelectedLayers () {
  const document = getCurrentDocument()
  return document.selectedLayers.layers.reverse()
}

export function getSelectedLayersOrLayersOnCurrentPage () {
  const selectedLayers = getSelectedLayers()
  return selectedLayers.length !== 0 ? selectedLayers : getLayersOnCurrentPage()
}

export function iterateChildLayers (layers, callback) {
  layers.forEach(function (layer) {
    callback(layer)
    const type = layer.type
    if (type === 'Artboard' || type === 'Group') {
      iterateChildLayers(layer.layers, callback)
    }
  })
}

export function iterateParentLayers (layer, callback) {
  while (layer.parent != null && layer.parent.type !== 'Page') {
    callback(layer.parent)
    layer = layer.parent
  }
}
