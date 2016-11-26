rotan
=====

[![npm version][npm-badge]][npm-url]
[![Build Status][travis-badge]][travis-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Rotan is a small command line utility to easily test your artifacts (in Bamboo :). It can output tap or xunit reports.

Currently you can do the following:

  - test if your [OpenAPI](https://openapis.org) or [Swagger](http://swagger.io) files are valid
  - test if your JSON/YAML is conform a [JSON schema](http://json-schema.org)  
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

## Validate a JSON/YAML file with a JSON schema

```
rotan json schema.json swagger.json

TAP version 13
# Structure of input file should conform to the schema
ok 1 swagger.json is valid
ok 2 schema.json is valid JSON
ok 3 swagger.json is conform schema.json

1..3
# tests 3
# pass  3

# ok
```

```
rotan json schema.json swagger.json -x

<?xml version="1.0"?>
<testsuites>
  <testsuite name="Structure of iput file should conform to the schema" tests="3" failures="0" errors="0">
    <testcase name="#1 swagger.json is valid"/>
    <testcase name="#2 schema.json is valid JSON"/>
    <testcase name="#3 swagger.json is conform schema.json"/>
  </testsuite>
</testsuites>
```

```
# inject snippets into your openapi before validating
rotan json schema.json swagger.yaml -i 'snippets/*.yaml'
TAP version 13
# Structure of input file should conform to the schema
ok 1 swagger.yaml is valid
ok 2 schema.json is valid JSON
ok 3 swagger.yaml is conform schema.json

1..3
# tests 3
# pass  3

# ok
```



## Custom tape test

Create your [tape](https://www.npmjs.com/package/tape) tests like this:

```
// tests.js
exports.test = function (options) {
  var test = options.tape.createHarness()
  var stream = test.createStream()

  test('it should return ok', function (t) {
    t.plan(1)
    t.ok(true, 'looking good')
  })

  return stream
}
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
