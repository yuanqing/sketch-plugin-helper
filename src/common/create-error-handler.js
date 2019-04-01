export function createErrorHandler (logger) {
  return function (error) {
    logger.fail(error)
    process.exit(1)
  }
}
