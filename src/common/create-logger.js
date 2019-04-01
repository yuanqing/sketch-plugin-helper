import chalk from 'chalk'
import ora from 'ora'
import timestamp from 'time-stamp'

export function createLogger () {
  return new Logger()
}

class Logger {
  constructor () {
    this.logger = ora()
  }
  loading (text) {
    this.logger.start(prependTimestamp(text))
    return this
  }
  info (text) {
    this.logger.stopAndPersist({
      text: prependTimestamp(text)
    })
    return this
  }
  succeed (text) {
    this.logger.succeed(prependTimestamp(text))
    return this
  }
  fail (text) {
    this.logger.fail(prependTimestamp(text))
    return this
  }
}

function prependTimestamp (text) {
  return `${chalk.gray(timestamp('HH:mm:ss'))} ${text}`
}
