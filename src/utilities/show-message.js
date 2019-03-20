import UI from 'sketch/ui'

export function showMessage (message, options) {
  UI.message(
    options && options.symbol ? `${options.symbol} ${message}` : message
  )
}

export function showSuccessMessage (message) {
  showMessage(message, { symbol: '✅' })
}

export function showWarningMessage (message) {
  showMessage(message, { symbol: '⚠️' })
}

export function showErrorMessage (message) {
  showMessage(message, { symbol: '🔴' })
}
