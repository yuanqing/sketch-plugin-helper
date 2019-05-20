import chalk from 'chalk'
import readline from 'readline'

export const info = logFactory(chalk.bold.black.bgWhite(' INFO '))
export const success = logFactory(chalk.bold.black.bgGreen(' SUCCESS '))
export const error = logFactory(chalk.bold.black.bgRed(' ERROR '))

function logFactory (prefix) {
  return function (text) {
    console.log(`${prefix} ${text}`)
  }
}

export function clearLine () {
  readline.moveCursor(process.stdout, 0, -1)
  readline.clearLine(process.stdout, 1)
}
