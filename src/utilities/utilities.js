/* eslint-disable eqeqeq */

const dom = require('sketch/dom')
const UI = require('sketch/ui')

function addLayersToPage (layers) {
  const document = dom.getSelectedDocument()
  return document.selectedPage.sketchObject.addLayers(layers)
}

function getAllArtboards () {
  return getAllLayers().filter(function (layer) {
    return layer.type == 'Artboard'
  })
}

function getAllLayers () {
  const document = dom.getSelectedDocument()
  const page = document.selectedPage
  return page.layers
}

function getSelectedLayers () {
  const document = dom.getSelectedDocument()
  return document.selectedLayers.layers
}

function getSelectedOrAllLayers () {
  const selectedLayers = getSelectedLayers()
  return selectedLayers.length != 0 ? selectedLayers : getAllLayers()
}

function iterateNestedLayers (layers, callback) {
  layers.forEach(function (layer) {
    callback(layer)
    const type = layer.type
    if (type == 'Artboard' || type == 'Group') {
      iterateNestedLayers(layer.layers, callback)
    }
  })
}

function showErrorMessage (message) {
  showMessage(message, { symbol: '🔴' })
}

function showSuccessMessage (message) {
  showMessage(message, { symbol: '✅' })
}

function showMessage (message, options) {
  UI.message(
    options && options.symbol ? `${options.symbol} ${message}` : message
  )
}

function showWarningMessage (message) {
  showMessage(message, { symbol: '⚠️' })
}

module.exports = {
  addLayersToPage,
  getAllArtboards,
  getAllLayers,
  getSelectedLayers,
  getSelectedOrAllLayers,
  iterateNestedLayers,
  showErrorMessage,
  showMessage,
  showSuccessMessage,
  showWarningMessage
}
