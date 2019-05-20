import execa from 'execa'

export function executeShellCommand (command, args) {
  return new Promise(function (resolve, reject) {
    const childProcess = execa(command, args, {
      env: { FORCE_COLOR: true }
    })
    childProcess.stdout.pipe(process.stdout)
    childProcess.stderr.pipe(process.stderr)
    childProcess.on('exit', function (code) {
      if (code !== 0) {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject()
        return
      }
      resolve()
    })
  })
}
