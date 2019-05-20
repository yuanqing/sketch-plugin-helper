import { showPrompt } from '../common/scaffold-plugin/show-prompt'
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
    const config = await showPrompt(name)
    const outputDirectoryPath = process.cwd()
    log.info('Scaffolding new plugin…')
    await scaffoldPlugin({
      outputDirectoryPath,
      config: {
        ...config,
        pluginName: name
      }
    }).catch(errorHandler)
    log.clearLine()
    log.success('Scaffolded new plugin')
    return Promise.resolve()
  }
}
