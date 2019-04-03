import { runScript } from '../common/run-script'

export const run = {
  command: 'run <pattern>',
  describe: 'Runs the given script in Sketch',
  builder: function (yargs) {
    yargs.positional('pattern', {
      type: 'string'
    })
  },
  handler: async function ({ pattern }) {
    return runScript(pattern)
  }
}
