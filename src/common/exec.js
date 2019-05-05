import { exec as childProcessExec } from 'child_process'

export function exec (command) {
  return new Promise(function (resolve, reject) {
    const child = childProcessExec(command)
    child.stderr.pipe(process.stderr)
    child.on('exit', resolve)
    child.on('error', reject)
  })
}
