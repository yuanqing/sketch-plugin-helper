#!/usr/bin/env node

require('yargs')
  .command(require('./build'))
  .command(require('./init'))
  .command(require('./link'))
  .command(require('./unlink'))
  .command(require('./version'))
  .help()
  .parse()
