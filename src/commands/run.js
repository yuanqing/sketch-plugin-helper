import { runHandler } from '../common/run-handler'

export const run = {
  command: 'run <handler>',
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
  handler: async function ({ handler: handlerName, background }) {
    return runHandler({ handlerName, shouldRunInBackground: background })
  }
}
