# Configuring Your Plugin

> Learn how to set menu commands, actions, and default settings for your plugin.

- [**Options**](#options)
  - [`displayName`](#displayname)
  - [`menu`](#menu)
  - [`actions`](#actions)
  - [`defaultSettings`](#defaultsettings)

---

## Options

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
- **`"handler"`** is the path to a JavaScript file in the `src` directory. (The `.js` extension can be omitted.)
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
+   ]
  }
}
```

---

### `"actions"`

An array that specifies the handlers to run in response to Sketch [Actions](https://developer.sketch.com/reference/action/).

Each object in the array has these keys:
- **`"handler"`** is the path to a JavaScript file in the `src` directory. (The `.js` extension can be omitted.)
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
+   ]
  }
}
```

---

### `"defaultSettings"`

An object that specifies the default settings for your plugin.

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
