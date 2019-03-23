import yargs from 'yargs'

import { build } from './build'
import { create } from './create'
import { symlink } from './symlink'
import { lint } from './lint'
import { version } from './version'

yargs
  .command(build)
  .command(create)
  .command(symlink)
  .command(lint)
  .command(version)
  .help()
  .version()
  .parse()
