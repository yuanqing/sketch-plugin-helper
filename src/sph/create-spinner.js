import chalk from 'chalk'
import ora from 'ora'
import timestamp from 'time-stamp'

export function createSpinner () {
  return new Spinner()
}

class Spinner {
  constructor () {
    this.spinner = ora()
  }
  loading (text) {
    this.spinner.start(prependTimestamp(text))
    return this
  }
  info (text) {
    this.spinner.stopAndPersist({
      text: prependTimestamp(text)
    })
    return this
  }
  succeed (text) {
    this.spinner.succeed(prependTimestamp(text))
    return this
  }
  fail (text) {
    this.spinner.fail(prependTimestamp(text))
    return this
  }
}

function prependTimestamp (text) {
  return `${chalk.gray(timestamp('HH:mm:ss'))} ${text}`
}
