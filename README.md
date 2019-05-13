# sketch-plugin-helper [![npm Version](https://badgen.net/npm/v/sketch-plugin-helper)](https://www.npmjs.org/package/sketch-plugin-helper)

> An opinionated, batteries-included toolkit for making [Sketch](https://www.sketch.com/) plugins

- Concise, declarative APIs for obtaining multi-field user input
- Automatically generate your plugin’s [`appcast.xml`](https://developer.sketch.com/guides/publishing-plugins/#the-appcastxml-file) and [`manifest.json`](https://developer.sketch.com/guides/plugin-bundles/#manifest) files
- Utility functions for the most common plugin tasks
- A prescribed, convention-over-configuration directory structure for your plugin
- Lint and fix your plugin code with [`standard`](https://github.com/standard/standard) and [`prettier-standard`](https://github.com/sheerun/prettier-standard)
- Make assertions on the result of running your plugin tests, including comparing the actual result against an expected Sketch file
- All the tools you need – builder, linter, test runner – available via an intuitive CLI, bundled in a single dependency

*The above is also a list of the key feature differences between `sketch-plugin-helper` and [`skpm`](https://github.com/skpm/skpm).*

## Quick start

Requires [Node.js](https://nodejs.org/).

```
$ npm i -g sketch-plugin-helper
$ sph create
```

## API

- [Utilities](docs/utilities.md)
- [Settings](docs/settings.md)
- [Tests](docs/tests.md)

## CLI

```
$ sph --help
sph <command>

Commands:
  sph build           Builds the plugin
  sph create          Scaffolds a new Sketch plugin
  sph lint            Lints the plugin implementation code
  sph run <handler>   Runs the given plugin handler in Sketch
  sph script <file>   Runs the given script in Sketch
  sph symlink         Adds a symbolic link to the plugin to the Sketch plugin
                      folder
  sph test [files..]  Runs tests for the plugin
  sph version <type>  Updates the plugin version

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```

## Installation

```
$ npm i -g sketch-plugin-helper
```

## License

[MIT](LICENSE.md)
