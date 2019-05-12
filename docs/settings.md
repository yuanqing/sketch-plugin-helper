# Settings

> Functions to obtain user input via a dialog box, and to retrieve, save, and reset plugin settings

- [Quick start](#quick-start)
- [API](#api)
  - [**getSettings**](#const-settings--getsettings)
  - [**openSettingsDialog**](#const-result--opensettingsdialogoptions)
  - [**resetSettings**](#resetsettings)
  - [**saveSettings**](#savesettingssettings)
  - [**saveTemporarySettings**](#savetemporarysettingssettings)

## Quick start

Specify the `defaultSettings` for your plugin in the `sketch-plugin-helper` field of your `package.json` file. For example:

```jsonc
{
  // ...
  "sketch-plugin-helper": {
    // ...
    "defaultSettings": {
      "greeting": "Hello",
      "name": "Alice"
    }
  }
}
```

To retrieve the currently-saved settings, use `getSettings`. For example:

```js
import { getSettings } from 'sketch-plugin-helper'

export default function () {
  // ...
  const settings = getSettings()
  console.log(settings.greeting) //=> 'Hello' or 'Goodbye'
  console.log(settings.name)     //=> A string
  // ...
}
```

To obtain and save user input, use `openSettingsDialog` and `saveSettings`. For example:

```js
import {
  openSettingsDialog,
  saveSettings,
  DROP_DOWN,
  TEXT_BOX
} from 'sketch-plugin-helper'

export default function () {
  // ...
  const options = {
    title: 'Settings',
    formFields: [
      {
        type: DROP_DOWN,
        key: 'greeting',
        label: 'Greeting',
        possibleValues: ['Hello', 'Goodbye']
      },
      {
        type: TEXT_BOX,
        key: 'name',
        label: 'Name'
      }
    ]
  }
  const result = openSettingsDialog(options)
  if (result === null) {
    return
  }
  saveSettings(result)
  console.log(result.greeting) //=> 'Hello' or 'Goodbye'
  console.log(result.name)     //=> A string
  // ...
}
```

## API

```js
import {
  getSettings,
  openSettingsDialog,
  resetSettings,
  saveSettings,
  saveTemporarySettings,
  CHECK_BOX,
  DROP_DOWN,
  RADIO_BUTTONS,
  TEXT_BOX,
  NUMERIC_TEXT_BOX
} from 'sketch-plugin-helper'
```

---

### const settings = getSettings()

Returns the currently-saved plugin settings.

#### *Return value*

- `settings` is an `object`

---

### const result = openSettingsDialog(options)

Opens a dialog with one or more form fields (configured via the `formFields` key of `options`).

#### *Return value*

- If the <kbd>OK</kbd> button was clicked, then `result` is an `object` containing the user input.
- If the <kbd>Cancel</kbd> button was clicked, then `result` is `null`.

#### *Parameters*

`options` (`object`)

- `options.title` (`string`) is the title of the dialog.
- `options.formFields` (`object[]`) is an array of configuration objects for each form field.

#### *Example*

Currently, five form field types are supported.

`type` | Description | Value in `result`
:--|:--|:--
`CHECK_BOX` | For boolean input | Either `true` or `false`
`DROP_DOWN` or `RADIO_BUTTONS` | To restrict input to a particular set of values | A value from the `possibleValues` array
`TEXT_BOX` | For free-text input | A `string`
`NUMERIC_TEXT_BOX` | For free-text, numeric input | A `number`

Here is an example of an `options` object that opens a dialog with all five form field types:

```js
const options = {
  title: 'Settings',
  formFields: [
    {
      type: CHECK_BOX,
      key: 'foo',
      label: 'Foo'
    },
    {
      type: DROP_DOWN,
      key: 'bar',
      label: 'Bar',
      possibleValues: [1, 2, 3]
    },
    {
      type: RADIO_BUTTONS,
      key: 'biz',
      label: 'biz',
      possibleValues: ['x', 'y']
    },
    {
      type: TEXT_BOX,
      key: 'baz',
      label: 'baz'
    },
    {
      type: NUMERIC_TEXT_BOX,
      key: 'qux',
      label: 'qux'
    }
  ]
}
const result = openSettingsDialog(options)
if (result === null) {
  return
}
console.log(result.foo) //=> true or false
console.log(result.bar) //=> 1, 2 or 3
console.log(result.biz) //=> 'x' or 'y'
console.log(result.baz) //=> a string
console.log(result.qux) //=> a number
```

---

### resetSettings()

Resets all plugin settings to the `defaultSettings` as specified in the `sketch-plugin-helper` field of your `package.json` file.

---

### saveSettings(settings)

Saves the given `settings` permanently; settings are persisted even after Sketch is closed.

#### *Parameters*

- `settings` (`object`)

---

### saveTemporarySettings(settings)

Saves the given `settings` to be persisted for the current “session” only; settings are *not* persisted after Sketch is closed.

#### *Parameters*

- `settings` (`object`)
