# Plugin Basics

- [**Directory structure**](#directory-structure)
- [**Configuration options**](#configuration-options)
  - [`"name"`](#name)
  - [`"menu"`](#menu)
  - [`"actions"`](#actions)
  - [`"defaultSettings"`](#defaultsettings)
- [**CLI**](#cli)

---

## Directory structure

- Plugin implementation code and tests are placed in the `src` directory.
  - Test files must match the glob pattern `src/**/__tests__/*.js`.
- The `appcast.xml` file and the entire contents of the `.sketchplugin` directory, including `manifest.json`, are regenerated whenever the plugin is built. *Do not manually edit these files.*

[Our toy example](../README.md#quick-start) would have a directory structure that looks like so:

```
├── Hello World.sketchplugin
│   └── Contents
│       └── Sketch
│           ├── manifest.json
│           └── plugin.js
├── src
│   └── hello-world.js
├── .gitignore
├── LICENSE.md
├── README.md
├── appcast.xml
└── package.json
```

---

## Configuration options

All configuration options for your plugin are specified on the **`"sketch-plugin-helper"`** key of your `package.json` file.

---

### `"name"`

The name of your plugin, shown when you go to **Plugins** in the Sketch menu bar.

#### *Example*

```diff
{
  ...
  "sketch-plugin-helper": {
+   "name": "Hello, World",
    ...
  }
}
```

---

### `"menu"`

An array that specifies the menu commands shown for your plugin when you go to **Plugins › `<name>`** in the Sketch menu bar.

Each object in the array has these keys:
- **`"handler"`** is the path to a JavaScript file in the `src` directory. (The `src/` and `.js` must be omitted.) The handler for the menu command must be the `default` export of the given file.
- **`"name"`** is the name of the menu command.
- **`"shortcut"`** *(optional)* is the [keyboard shortcut](https://developer.sketch.com/guides/plugin-bundles/#shortcut) for running the menu command.

Use a **`"-"`** in the array to specify a separator between commands in the menu.

#### *Example*

```diff
{
  ...
  "sketch-plugin-helper": {
    ...
+   "menu": [
+     {
+       "handler": "hello-world",
+       "name": "Hello, World"
+     }
+   ],
    ...
  }
}
```

---

### `"actions"`

An array that specifies the handlers to run in response to a Sketch [Action](https://developer.sketch.com/reference/action/).

Each object in the array has these keys:
- **`"handler"`** is the path to a JavaScript file in the `src` directory. (The `src/` and `.js` must be omitted.) The function run in response to the Action must be the `default` export of the given file.
- **`"name"`** is the name of the [Action](https://developer.sketch.com/reference/action/).

#### *Example*

```diff
{
  ...
  "sketch-plugin-helper": {
    ...
+   "actions": [
+     {
+       "handler": "hello-world",
+       "name": "OpenDocument"
+     }
+   ],
    ...
  }
}
```

---

### `"defaultSettings"`

An object that specifies the default settings for your plugin.

(See the guide about [Getting User Input](2-getting-user-input.md).)

#### *Example*

```diff
{
  ...
  "sketch-plugin-helper": {
    ...
+   "defaultSettings": {
+     "greeting": "Hello",
+     "name": "Alice"
+   }
  }
}
```

---

## CLI

A plugin scaffolded via `sketch create` will have the following `scripts` defined in its `package.json` file:

```diff
{
  ...
+ "scripts": {
+   "build": "sketch build",
+   "fix": "sketch lint --fix",
+   "handler": "sketch handler",
+   "lint": "sketch lint",
+   "symlink": "sketch symlink",
+   "test": "sketch test",
+   "unlink": "sketch symlink --delete",
+   "version": "sketch version",
+   "watch": "sketch build --watch"
+ },
  ...
}
```

Each script directly utilises the `sketch` CLI (bundled with `sketch-plugin-helper`):

```
$ sketch --help
sketch <command>

Commands:
  sketch build           Builds the plugin
  sketch create <name>   Scaffolds a new Sketch plugin
  sketch handler <name>  Runs the given plugin handler in Sketch
  sketch lint            Lints the plugin implementation code
  sketch script <file>   Runs the given script in Sketch
  sketch symlink         Installs the plugin as a symlink
  sketch test            Runs tests for the plugin
  sketch version <type>  Updates the plugin version

Options:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
```
