import chokidar from 'chokidar'

import { sourceGlobPattern } from './constants'

export function watchSourceDirectory ({ onReady, onChange }) {
  const watcher = chokidar.watch([sourceGlobPattern, './package.json'])
  watcher.on('ready', onReady)
  watcher.on('change', onChange)
  return Promise.resolve()
}
