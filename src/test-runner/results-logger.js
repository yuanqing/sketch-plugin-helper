export class ResultsLogger {
  constructor () {
    this.count = 0
    this.passCount = 0
    console.log('TAP version 13')
  }
  logTestName (testName) {
    console.log(`# ${testName}`)
  }
  logAssertionPassed (message) {
    this.count += 1
    this.passCount += 1
    console.log(`ok ${this.count} ${message || ''}`.trim())
  }
  logAssertionFailed (message) {
    this.count += 1
    console.log(`not ok ${this.count} ${message || ''}`.trim())
  }
  logResultsSummary () {
    console.log(`1..${this.count}`)
    console.log(`# tests ${this.count}`)
    console.log(`# pass  ${this.passCount}`)
    const failCount = this.count - this.passCount
    if (failCount !== 0) {
      console.log(`# fail  ${failCount}`)
    }
  }
}
