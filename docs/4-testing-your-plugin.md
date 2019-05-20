# Testing Your Plugin

- [**Example**](#example)
- [**Test**](#test)
  - [test(name, inputFilePath, expectedOutputFilePath, handler)](#testname-inputfilepath-expectedoutputfilepath-handler)
  - [test(name, expectedAssertionCount, handler)](#testname-expectedassertioncount-handler)

---

## Example

Test files must match the glob pattern `src/**/__tests__/*.js`.

Consider a toy example. Supposing that our implementation is `src/foo.js`, our test file would be `src/__tests__/foo.js`:

```js
import foo from '../foo'

test(
  'foo',
  '__fixtures__/input.sketch',
  '__fixtures__/expected-output.sketch',
  function () {
    foo()
  }
)
```

This test file has only one test. It asserts that: Given an input document at `__fixtures__/input.sketch`, executing `foo()` will result in a document that is equal to the expected output document at `__fixtures__/expected-output.sketch`.

Running the `sketch test` command will run our test in Sketch, and give the following:

```
$ sketch test
[INFO] Running tests…
TAP version 13
# foo
ok 1
1..1
# tests 1
# pass  1
[SUCCESS] Tests passed
```

---

## Test

```js
import { test } from 'sketch-plugin-helper'
```

### test(name, inputFilePath, expectedOutputFilePath, handler)

1. Opens the Sketch document at `inputFilePath`.
2. Executes the given `handler`, passing it the [`Document`](https://developer.sketch.com/reference/api/#document) at `inputFilePath`.
3. Asserts that the resulting Sketch document is equal to the Sketch document at `expectedOutputFilePath`; the test passes if and only if this assertion passes.

#### *Parameters*

- `name` (`string`)
- `inputFilePath` (`string`)
- `expectedOutputFilePath` (`string`)
- `handler` (`function (document)`), where `document` is the [`Document`](https://developer.sketch.com/reference/api/#document) at `inputFilePath`

---

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
