import * as log from './log'

export function errorHandler (error) {
  log.error(error.message)
  process.exit(1)
}
