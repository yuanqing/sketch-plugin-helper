import execa from 'execa'
import { join } from 'path'

import { sourceDirectory } from '../constants'

export async function fix () {
  const sourceFilesGlob = join(sourceDirectory, '/**/*.js')
  return execa('prettier-standard', [sourceFilesGlob]).stdout.pipe(
    process.stdout
  )
}
