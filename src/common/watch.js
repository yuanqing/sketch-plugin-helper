import chokidar from 'chokidar'

import { buildPlugin } from './build-plugin/build-plugin'
import { sourceDirectory } from './constants'

export function watch ({ onReady, onChange, onSuccess }) {
  return new Promise(function (resolve, reject) {
    const watcher = chokidar.watch([sourceDirectory, './package.json'])
    watcher.on('ready', onReady)
    watcher.on('change', async function () {
      onChange()
      await buildPlugin(true).catch(reject)
      onSuccess()
      resolve()
    })
  })
}
