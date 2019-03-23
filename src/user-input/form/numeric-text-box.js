import { textBox } from './text-box'

export const numericTextBox = textBox(function (value) {
  // eslint-disable-next-line no-eval
  return parseFloat(eval(value))
})
