#!/usr/bin/env node

require('yargs')
  .command(require('./sph/build'))
  .command(require('./sph/create'))
  .command(require('./sph/symlink'))
  .command(require('./sph/lint'))
  .command(require('./sph/version'))
  .help()
  .version()
  .parse()
