Rotan
=====

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]

Utility for testing your artifacts in Bamboo, using [tape](https://www.npmjs.com/package/tape).

# Installation

```
npm install rotan
```

# Examples

tap output:

```
rotan openapi openapi-definition.json
```

xunit reporting:

```
rotan openapi openapi-definition.json -x
```


# Example of a test file

Create your tape tests like this:

```
exports.test = function (options) {
  var test = options.tape.createHarness();
  var stream = test.createStream();

  test('it should return ok', function (t) {
    t.plan(1);
    t.ok(true, 'looking good');
  });

  return stream;
};
```


[npm-badge]: https://badge.fury.io/js/rotan.svg
[npm-url]: https://badge.fury.io/js/rotan
[travis-badge]: https://travis-ci.org/orangewise/rotan.svg?branch=master
[travis-url]: https://travis-ci.org/orangewise/rotan
[coveralls-badge]: https://coveralls.io/repos/github/orangewise/rotan/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/orangewise/rotan?branch=master
