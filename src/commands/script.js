import { runScript } from '../common/run-script'

export const script = {
  command: 'script <file>',
  describe: 'Runs the given script in Sketch',
  builder: function (yargs) {
    yargs.positional('file', {
      type: 'string'
    })
  },
  handler: async function ({ file }) {
    return runScript(file)
  }
}
