import { scaffoldPlugin } from '../common/scaffold-plugin/scaffold-plugin'
import * as log from '../common/log'
import { errorHandler } from '../common/error-handler'

export const create = {
  command: 'create <name>',
  describe: 'Scaffolds a new Sketch plugin',
  builder: function (yargs) {
    yargs.positional('name', {
      type: 'string'
    })
  },
  handler: async function ({ name }) {
    log.info('Scaffolding new plugin…')
    const outputDirectoryPath = process.cwd()
    await scaffoldPlugin({
      outputDirectoryPath,
      pluginName: name
    }).catch(errorHandler)
    log.clearLine()
    log.success('Scaffolded new plugin')
    return Promise.resolve()
  }
}
