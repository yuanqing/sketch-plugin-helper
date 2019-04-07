import yargs from 'yargs'

import { build } from './commands/build'
import { create } from './commands/create'
import { lint } from './commands/lint'
import { script } from './commands/script'
import { symlink } from './commands/symlink'
import { test } from './commands/test'
import { version } from './commands/version'

yargs
  .command(build)
  .command(create)
  .command(lint)
  .command(script)
  .command(symlink)
  .command(test)
  .command(version)
  .demandCommand()
  .help()
  .version()
  .parse()
