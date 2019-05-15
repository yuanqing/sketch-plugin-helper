# Plugin Basics

- [Directory structure](#directory-structure)
- [Configuration options](#configuration-options)
  - [`displayName`](#displayname)
  - [`menu`](#menu)
  - [`actions`](#actions)
  - [`defaultSettings`](#defaultsettings)
- [CLI](#cli)

---

## Directory structure

- Plugin implementation code and tests are placed in the `src` directory.
  - Test files must match the glob pattern `src/**/__tests__/*.js`.
- The `appcast.xml` and `*.sketchplugin` files are always regenerated whenever the plugin is built.

Looking back at [our toy example](../README.md#quick-start), we would have a directory structure that looks like so:

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

All configuration options for your plugin are specified on the **`"sketch-plugin-helper"`** key of the `package.json` file.

---

### `"displayName"`

The name of your plugin, shown when you go to **Plugins** in the Sketch menu bar.

#### *Example*

```diff
{
  ...
  "sketch-plugin-helper": {
+   "displayName": "Hello, World",
    ...
  }
}
```

---

### `"menu"`

An array that specifies the plugin commands shown when we go to **Plugins › `<displayName>`** in the Sketch menu bar.

Each object in the array has these keys:
- **`"handler"`** is the path to a JavaScript file in the `src` directory. (The `.js` extension can be omitted.) The `default` export of the given file is used as the handler for the plugin command.
- **`"name"`** is the name of the plugin command.
- **`"shortcut"`** *(optional)* is the keyboard shortcut for running the plugin command.

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

An array that specifies the handlers to run in response to Sketch [Actions](https://developer.sketch.com/reference/action/).

Each object in the array has these keys:
- **`"handler"`** is the path to a JavaScript file in the `src` directory. (The `.js` extension can be omitted.) The `default` export of the given file is run in response to the Sketch Action.
- **`"action"`** is the name of the Sketch Action.

#### *Example*

```diff
{
  ...
  "sketch-plugin-helper": {
    ...
+   "actions": [
+     {
+       "handler": "hello-world",
+       "action": "OpenDocument"
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

A plugin scaffolded with `sketch create` will have the following `scripts` defined in its `package.json` file:

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

Each script directly utilises the `sketch` CLI:

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
