import { Page } from 'sketch/dom'

import { getCurrentDocument } from './document'

export function getAllPages () {
  return getCurrentDocument().pages
}

export function getCurrentPage () {
  return getCurrentDocument().selectedPage
}

export function getSymbolsPage () {
  return Page.getSymbolsPage(getCurrentDocument())
}
