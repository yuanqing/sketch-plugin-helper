const chalk = require('chalk')
const ora = require('ora')
const timestamp = require('time-stamp')

function prependTimestamp (text) {
  return `${chalk.gray(timestamp('HH:mm:ss'))} ${text}`
}

function createSpinner (text) {
  const spinner = ora()
  function wrapper (text) {
    spinner.start(prependTimestamp(text))
    return wrapper
  }
  wrapper.info = function (text) {
    spinner.stopAndPersist({
      text: prependTimestamp(text)
    })
    return wrapper
  }
  wrapper.succeed = function (text) {
    spinner.succeed(prependTimestamp(text))
    return wrapper
  }
  wrapper.fail = function (text) {
    spinner.fail(prependTimestamp(text))
    return wrapper
  }
  return wrapper(text)
}

module.exports = createSpinner
