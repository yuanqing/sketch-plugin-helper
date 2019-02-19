#!/usr/bin/env node

require('yargs')
  .command(require('./build'))
  .command(require('./init'))
  .command(require('./link'))
  .command(require('./lint'))
  .command(require('./unlink'))
  .command(require('./version'))
  .help()
  .parse()
