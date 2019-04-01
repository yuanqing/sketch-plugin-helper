import globby from 'globby'
import { join } from 'path'

import { runScript } from '../common/run-script'
import { createResultsServer } from './create-results-server'

export async function runTests (globPattern) {
  const endpoint = await createResultsServer()
  const entryFilePaths = await globby(join(process.cwd(), globPattern))
  await runScript({
    entryFilePaths,
    globals: {
      RESULTS_SERVER_ENDPOINT: endpoint
    }
  })
}
