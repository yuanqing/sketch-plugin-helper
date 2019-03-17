function errorHandler (spinner) {
  return function (error) {
    spinner.fail(error)
    process.exit(0)
  }
}

module.exports = errorHandler
