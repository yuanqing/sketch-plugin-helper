#!/usr/bin/env node

require('yargs')
  .command(require('./sph/build'))
  .command(require('./sph/init'))
  .command(require('./sph/link'))
  .command(require('./sph/lint'))
  .command(require('./sph/unlink'))
  .command(require('./sph/version'))
  .help()
  .version()
  .parse()
