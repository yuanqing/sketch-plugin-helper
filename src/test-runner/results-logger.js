export class ResultsLogger {
  constructor () {
    this.count = 0
    this.passCount = 0
    this.log('TAP version 13')
  }
  log (message) {
    console.log(message)
  }
  logTestName (testName) {
    this.log(`# ${testName}`)
  }
  logAssertionPassed (message) {
    this.count += 1
    this.passCount += 1
    this.log(`ok ${this.count} ${message || ''}`.trim())
  }
  logAssertionFailed (message) {
    this.count += 1
    this.log(`not ok ${this.count} ${message || ''}`.trim())
  }
  logPlan () {
    this.log(`1..${this.count}`)
  }
  end () {
    this.log(`\n# tests ${this.count}`)
    this.log(`# pass  ${this.passCount}`)
    const failCount = this.count - this.passCount
    if (failCount > 0) {
      this.log(`# fail  ${failCount}`)
      this.log(`\n# not ok`)
    } else {
      this.log(`\n# ok`)
    }
  }
}
