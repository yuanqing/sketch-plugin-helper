#!/usr/bin/env node

require('yargs')
  .command(require('./init'))
  .command(require('./build'))
  .command(require('./version'))
  .help()
  .parse()
