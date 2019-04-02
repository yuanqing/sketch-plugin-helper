import globby from 'globby'
import { join } from 'path'

import { runScript } from '../common/run-script'

export async function runTests (globPattern) {
  const entryFilePaths = await globby(join(process.cwd(), globPattern))
  await runScript(entryFilePaths)
}
