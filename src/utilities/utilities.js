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

function getSelectedLayers () {
  const document = dom.getSelectedDocument()
  return document.selectedLayers
}

function showMessage (message) {
  UI.message(message)
}

module.exports = {
  getAllArtboards,
  getAllLayers,
  getSelectedLayers,
  showMessage
}
