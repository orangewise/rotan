rotan
=====

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]

Rotan is a small command line utility to easily test your artifacts in Bamboo. It can output tap or xunit reports.

Currently you can do the following:

  - test if your [OpenAPI](https://openapis.org) or [Swagger](http://swagger.io) files are valid
  - test if your JSON is conform a [JSON schema](http://json-schema.org)  
  - run a custom tape test


# Installation

```
npm install rotan
```

## Getting help

- `rotan -h`
- `rotan openapi -h`
- `rotan json -h`
- `rotan js -h`


# Examples

## Validate your OpenAPI or Swagger files

tap output:

```
rotan openapi openapi-definition.json

TAP version 13
# Parse file openapi-definition.json
ok 1 Valid swagger file

1..1
# tests 1
# pass  1

# ok
```

xunit reporting:

```
rotan openapi openapi-definition.json -x

<?xml version="1.0"?>
<testsuites>
  <testsuite name="Parse file use-rotan-swagger.json" tests="1" failures="0" errors="0">
    <testcase name="#1 Valid swagger file"/>
  </testsuite>
</testsuites>
```

## Validate a JSON file with a JSON schema

```
rotan json schema.json swagger.json

TAP version 13
# Structure of JSON should conform to the schema
ok 1 JSON is conform schema

1..1
# tests 1
# pass  1

# ok
```

```
rotan json schema.json swagger.json -x

<?xml version="1.0"?>
<testsuites>
  <testsuite name="Structure of JSON should conform to the schema" tests="1" failures="0" errors="0">
    <testcase name="#1 JSON is conform schema"/>
  </testsuite>
</testsuites>
```


## Custom tape test

Create your [tape](https://www.npmjs.com/package/tape) tests like this:

```
// tests.js
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

Then run it like this:


```
rotan js tests.js

TAP version 13
# it should return ok
ok 1 looking good

1..1
# tests 1
# pass  1

# ok
```

or

```
rotan js tests.js -x

<?xml version="1.0"?>
<testsuites>
  <testsuite name="it should return ok" tests="1" failures="0" errors="0">
    <testcase name="#1 looking good"/>
  </testsuite>
</testsuites>
```


[npm-badge]: https://badge.fury.io/js/rotan.svg
[npm-url]: https://badge.fury.io/js/rotan
[travis-badge]: https://travis-ci.org/orangewise/rotan.svg?branch=master
[travis-url]: https://travis-ci.org/orangewise/rotan
[coveralls-badge]: https://coveralls.io/repos/github/orangewise/rotan/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/orangewise/rotan?branch=master
