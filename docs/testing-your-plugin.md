# Testing Your Plugin

> Write and run tests for your Sketch plugin

- [**Usage**](#usage)
- [**Test**](#test)
  - [test(name, expectedAssertionCount, handler)](#testname-expectedassertioncount-handler)
  - [test(name, inputFilePath, expectedOutputFilePath, handler)](#testname-inputfilepath-expectedoutputfilepath-handler)

---

## Usage

First, write a test:

```js
// src/__tests__/foo.js

import { test } from 'sketch-plugin-helper'

test('foo', 1, function (t) {
  t.pass()
})
```

Then, run the test via `sph test`:

```
$ ls src/__tests__
foo.js
$ sph test
TAP version 13
# foo
ok 1
1..1

# tests 1
# pass  1

# ok
```

By default, `sph test` runs tests that match the glob pattern `src/**/__tests__/*.js`.

---

## Test

```js
import { test } from 'sketch-plugin-helper'
```

### test(name, expectedAssertionCount, handler)

Executes the given `handler` in Sketch, passing it the test execution context object, `t`, that has the following members:

- `t.pass()` – A passing assertion.
- `t.fail()` – A failing assertion.
- `t.true(value)` – Asserts that `value` is `true`.
- `t.false(value)` – Asserts that `value` is `false`.

The test passes if and only if:
1. The total number of assertions in `handler` equals the `expectedAssertionCount`.
2. There are zero failing assertions.

#### *Parameters*

- `name` (`string`)
- `expectedAssertionCount` (`number`)
- `handler` (`function (t)`), where `t` is the test execution context object

#### *Example*

```js
test('foo', 1, function (t) {
  t.pass()
})
```

---

### test(name, inputFilePath, expectedOutputFilePath, handler)

1. Opens the Sketch document at `inputFilePath`.
2. Executes the given `handler`, passing it the [`Document`](https://developer.sketch.com/reference/api/#document) at `inputFilePath`.
3. Asserts that the resulting Sketch document is equal to the Sketch document at `expectedOutputFilePath`.

The test passes if and only if the assertion passes.

#### *Parameters*

- `name` (`string`)
- `inputFilePath` (`string`)
- `expectedOutputFilePath` (`string`)
- `handler` (`function (document)`), where `document` is the [`Document`](https://developer.sketch.com/reference/api/#document) at `inputFilePath`

#### *Example*

```js
import foo from '../foo'

test(
  'foo',
  '__fixtures__/input.sketch',
  '__fixtures__/expected-output.sketch',
  function (document) {
    foo(document.selectedPage.layers)
  }
)
```
