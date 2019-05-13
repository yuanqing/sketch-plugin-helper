import globby from 'globby'
import { join } from 'path'

import { runScript } from '../common/run-script'

export async function runTests (globPatterns) {
  const entryFilePaths = await globby(
    globPatterns.map(function (globPattern) {
      return join(process.cwd(), globPattern)
    })
  )
  await runScript(entryFilePaths)
}
