#!/usr/bin/env node

require('yargs')
  .command(require('./init'))
  .command(require('./build'))
  .help()
  .parse()
