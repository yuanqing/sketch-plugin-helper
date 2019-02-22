#!/usr/bin/env node

require('yargs')
  .command(require('./cli/build'))
  .command(require('./cli/init'))
  .command(require('./cli/link'))
  .command(require('./cli/lint'))
  .command(require('./cli/unlink'))
  .command(require('./cli/version'))
  .help()
  .parse()
