export const checkBox = formFieldConfigFactory('CHECK_BOX')
export const dropDown = formFieldConfigFactory('DROP_DOWN')
export const numericTextBox = formFieldConfigFactory('NUMERIC_TEXT_BOX')
export const radioButtons = formFieldConfigFactory('RADIO_BUTTONS')
export const textBox = formFieldConfigFactory('TEXT_BOX')

function formFieldConfigFactory (type) {
  return function (config) {
    return {
      ...config,
      type
    }
  }
}
