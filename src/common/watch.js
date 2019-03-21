import chokidar from 'chokidar'

import build from './build'
import { sourceDirectory } from './constants'

export default function watch ({ onReady, onChange, onSuccess }) {
  return new Promise(function (resolve, reject) {
    const watcher = chokidar.watch([sourceDirectory, './package.json'])
    watcher.on('ready', onReady)
    watcher.on('change', async function () {
      onChange()
      await build(true).catch(reject)
      onSuccess()
      resolve()
    })
  })
}
