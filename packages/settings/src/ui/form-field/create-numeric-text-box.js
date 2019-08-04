import { textBoxFactory } from './text-box-factory'

export const createNumericTextBox = textBoxFactory(function (value) {
  // eslint-disable-next-line no-eval
  return parseFloat(eval(value))
})
