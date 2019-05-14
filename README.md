# sketch-plugin-helper [![npm Version](https://badgen.net/npm/v/sketch-plugin-helper)](https://www.npmjs.org/package/sketch-plugin-helper)

> A batteries-included toolkit for making [Sketch](https://www.sketch.com/) plugins

## Features

- A concise, declarative API for obtaining multi-field user input
- Automatically generate your plugin’s [`appcast.xml`](https://developer.sketch.com/guides/publishing-plugins/#the-appcastxml-file) and [`manifest.json`](https://developer.sketch.com/guides/plugin-bundles/#manifest) files
- Utility functions for the most common plugin tasks
- A prescribed, convention-over-configuration directory structure for your plugin
- Write plugin tests that make assertions on the result of running your plugin code, including asserting that the actual resulting Sketch file matches an expected Sketch file
- All the tools you need – builder, linter, test runner – available via an intuitive CLI (`sketch`), bundled in a single dependency

*The above is also a list of the key differences between `sketch-plugin-helper` and [`skpm`](https://github.com/skpm/skpm).*

## Quick start

Requires [Node.js](https://nodejs.org/).

```
$ npm i -g sketch-plugin-helper
$ sketch create
```

## API

- [Getting User Input](docs/getting-user-input.md)
- [Plugin Utilities](docs/plugin-utilities.md)
- [Testing Your Plugin](docs/testing-your-plugin.md)

## CLI

```
$ sketch --help
sketch <command>

Commands:
  sketch build           Builds the plugin
  sketch create          Scaffolds a new Sketch plugin
  sketch lint            Lints the plugin implementation code
  sketch run <handler>   Runs the given plugin handler in Sketch
  sketch script <file>   Runs the given script in Sketch
  sketch symlink         Installs the plugin as a symlink
  sketch test            Runs tests for the plugin
  sketch version <type>  Updates the plugin version

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
