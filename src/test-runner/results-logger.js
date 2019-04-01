import fetch from 'sketch-polyfill-fetch'

export class ResultsLogger {
  constructor () {
    this.count = 0
    this.passCount = 0
    this.logs = ['TAP version 13']
  }
  log (message) {
    this.logs.push(message)
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
    const body = {
      logs: this.logs,
      failed: failCount > 0
    }
    fetch(process.env.RESULTS_SERVER_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
  }
}
