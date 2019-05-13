export class TestSuite {
  constructor ({ name, expectedAssertionCount, resultsLogger }) {
    this.expectedCount = expectedAssertionCount
    this.actualCount = 0
    this.failed = false
    this.resultsLogger = resultsLogger
    this.resultsLogger.logTestName(name)
  }
  assertionPassed () {
    this.actualCount += 1
    this.resultsLogger.logAssertionPassed()
    if (this.actualCount > this.expectedCount) {
      this.failed = true
      this.resultsLogger.logAssertionFailed('plan != count')
    }
  }
  assertionFailed () {
    this.actualCount += 1
    this.resultsLogger.logAssertionFailed()
  }
  checkAssertionCounts () {
    if (this.failed === false && this.actualCount !== this.expectedCount) {
      this.resultsLogger.logAssertionFailed('plan != count')
    }
  }
  pass () {
    this.assertionPassed()
  }
  fail () {
    this.assertionFailed()
  }
  true (value) {
    if (value === true) {
      this.assertionPassed()
      return
    }
    this.assertionFailed()
  }
  false (value) {
    if (value === false) {
      this.assertionPassed()
      return
    }
    this.assertionFailed()
  }
}
