import { runHandler } from '../common/run-handler'

export const handler = {
  command: 'handler <name>',
  describe: 'Runs the given plugin handler in Sketch',
  builder: function (yargs) {
    yargs.positional('handler', {
      type: 'string'
    })
    yargs.option('background', {
      alias: ['b'],
      default: false,
      describe: 'Whether to run the plugin in the background',
      type: 'boolean'
    })
  },
  handler: async function ({ name, background }) {
    return runHandler({ handlerName: name, shouldRunInBackground: background })
  }
}
