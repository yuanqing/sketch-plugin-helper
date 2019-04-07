import { runScript } from '../common/run-script'

export const script = {
  command: 'script <pattern>',
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
