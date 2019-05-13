import isPromise from 'is-promise'
import pEachSeries from 'p-each-series'

import { compareSketchDocuments } from './compare-sketch-documents'
import { openDocument } from '../utilities/document'
import { ResultsLogger } from './results-logger'
import { TestSuite } from './test-suite'

const tests = []
let isQueued = false

export function test (name, handler) {
  tests.push({
    name,
    handler
  })
  if (!isQueued) {
    isQueued = true
    setTimeout(runAllTests, 0)
  }
}

export function snapshotTest (name, inputFilePath, snapshotFilePath, handler) {
  tests.push({
    name,
    handler: createSnapshotTest({ inputFilePath, snapshotFilePath, handler })
  })
  if (!isQueued) {
    isQueued = true
    setTimeout(runAllTests, 0)
  }
}

function createSnapshotTest ({ inputFilePath, snapshotFilePath, handler }) {
  return async function (t) {
    t.plan(1)
    const inputFile = await openDocument(inputFilePath)
    handler(inputFile)
    const snapshotFile = await openDocument(snapshotFilePath)
    t.true(compareSketchDocuments(inputFile, snapshotFile))
    inputFile.close()
    snapshotFile.close()
  }
}

async function runAllTests () {
  const resultsLogger = new ResultsLogger()
  try {
    await pEachSeries(tests, async function ({ name, handler }) {
      const testSuite = new TestSuite({ name, resultsLogger })
      const result = handler(testSuite)
      if (isPromise(result)) {
        await result
      }
      testSuite.checkAssertionCounts()
      return Promise.resolve()
    })
  } catch (error) {
    throw error
  } finally {
    resultsLogger.logResultsSummary()
  }
}
