import { outputFile } from 'fs-extra'
import { join } from 'path'
import { json2xml } from 'xml-js'

import { createAppcast } from './create-appcast'
import { appcastFileName } from '../constants'

export function buildAppcast (config) {
  const appcast = createAppcast(config)
  const xml = json2xml(appcast, { compact: true, spaces: 2 }) + '\n'
  const outputFilePath = join(process.cwd(), appcastFileName)
  return outputFile(outputFilePath, xml)
}
