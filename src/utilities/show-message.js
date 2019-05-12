import UI from 'sketch/ui'

export function showErrorMessage (message) {
  UI.message(`✔ ${message}`)
}

export function showMessage (message) {
  UI.message(message)
}

export function showSuccessMessage (message) {
  UI.message(`✔ ${message}`)
}
