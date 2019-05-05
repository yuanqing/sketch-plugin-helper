import chokidar from 'chokidar'

import { sourceDirectory } from './constants'

export function watchSourceDirectory ({ onReady, onChange }) {
  const watcher = chokidar.watch([sourceDirectory, './package.json'])
  watcher.on('ready', onReady)
  watcher.on('change', onChange)
  return Promise.resolve()
}
