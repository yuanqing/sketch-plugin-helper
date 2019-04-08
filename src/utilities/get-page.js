import { getCurrentDocument } from './get-document'

export function getCurrentPage () {
  return getCurrentDocument().selectedPage
}

export function getAllPages () {
  return getCurrentDocument().pages
}
