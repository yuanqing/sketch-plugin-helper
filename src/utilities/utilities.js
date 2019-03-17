/* eslint-disable eqeqeq */

const dom = require('sketch/dom')
const UI = require('sketch/ui')

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

function getPage () {
  const document = dom.getSelectedDocument()
  return document.selectedPage
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
    if (layer.type == 'Artboard' || layer.type == 'Group') {
      iterateNestedLayers(layer.layers, callback)
    }
  })
}

function showErrorMessage (message) {
  showMessage(`🔴 ${message}`)
}

function showSuccessMessage (message) {
  showMessage(`✅ ${message}`)
}

function showMessage (message) {
  UI.message(message)
}

function showWarningMessage (message) {
  showMessage(`⚠️ ${message}`)
}

module.exports = {
  getAllArtboards,
  getAllLayers,
  getPage,
  getSelectedLayers,
  getSelectedOrAllLayers,
  iterateNestedLayers,
  showErrorMessage,
  showMessage,
  showSuccessMessage,
  showWarningMessage
}
