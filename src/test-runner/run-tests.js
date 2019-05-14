import globby from 'globby'
import { join } from 'path'

import { runScript } from '../common/run-script'
import { testsGlobPattern } from '../common/constants'

export async function runTests () {
  const entryFilePaths = await globby(join(process.cwd(), testsGlobPattern))
  await runScript(entryFilePaths)
}
