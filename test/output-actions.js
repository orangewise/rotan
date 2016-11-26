var test = require('tape')
var output = require('../lib/output')
var concat = require('concat-stream')

test('JSON schema tests should output valid tap & xunit output', function (t) {
  // JSON schema tests
  output
    .action({
      testFile: './lib/json-tests',
      jsonFile: './test/fixtures/swagger.json',
      schemaFile: './test/fixtures/schema.json',
      xunit: false,
      tape: test
    })
    .pipe(concat(function (r) {
      var body = r.toString('utf8')
      t.equal(
          body,
          'TAP version 13\n' +
          '# Structure of input file should conform to the schema\n' +
          'ok 1 ./test/fixtures/swagger.json is valid\n' +
          'ok 2 ./test/fixtures/schema.json is valid JSON\n' +
          'ok 3 ./test/fixtures/swagger.json is conform ./test/fixtures/schema.json\n' +
          '\n' +
          '1..3\n' +
          '# tests 3\n' +
          '# pass  3\n' +
          '\n' +
          '# ok\n'
        , 'Valid tap output for swagger file')
    }))

  // input can also be yaml
  output
    .action({
      testFile: './lib/json-tests',
      jsonFile: './test/fixtures/swagger.yaml',
      schemaFile: './test/fixtures/schema.json',
      xunit: false,
      tape: test
    })
    .pipe(concat(function (r) {
      var body = r.toString('utf8')
      t.equal(
          body,
          'TAP version 13\n' +
          '# Structure of input file should conform to the schema\n' +
          'ok 1 ./test/fixtures/swagger.yaml is valid\n' +
          'ok 2 ./test/fixtures/schema.json is valid JSON\n' +
          'ok 3 ./test/fixtures/swagger.yaml is conform ./test/fixtures/schema.json\n' +
          '\n' +
          '1..3\n' +
          '# tests 3\n' +
          '# pass  3\n' +
          '\n' +
          '# ok\n'
        , 'Valid tap output for swagger file')
    }))

  // Test invalid json input (jsonFile)
  output
    .action({
      testFile: './lib/json-tests',
      jsonFile: './test/fixtures/swagger-invalid-json.json',
      schemaFile: './test/fixtures/schema.json',
      xunit: false,
      tape: test
    })
    .pipe(concat(function (r) {
      var body = r.toString('utf8').substr(0, 133)
      t.equal(
          body,
          'TAP version 13\n' +
          '# Structure of input file should conform to the schema\n' +
          'not ok 1 ./test/fixtures/swagger-invalid-json.json is NOT valid\n'
        , 'Valid tap output for swagger file')
    }))

  // Test invalid json input (schemaFile)
  output
    .action({
      testFile: './lib/json-tests',
      jsonFile: './test/fixtures/swagger.json',
      schemaFile: './test/fixtures/schema-invalid.json',
      xunit: false,
      tape: test
    })
    .pipe(concat(function (r) {
      var body = r.toString('utf8').substr(0, 175)
      t.equal(
          body,
          'TAP version 13\n' +
          '# Structure of input file should conform to the schema\n' +
          'ok 1 ./test/fixtures/swagger.json is valid\n' +
          'not ok 2 ./test/fixtures/schema-invalid.json is NOT valid JSON\n'
        , 'Valid tap output for swagger file')
    }))

  output
    .action({
      testFile: './lib/json-tests',
      jsonFile: './test/fixtures/swagger-invalid.json',
      schemaFile: './test/fixtures/schema.json',
      xunit: false,
      tape: test
    })
    .pipe(concat(function (r) {
      var body = r.toString('utf8').substr(0, 280)
      t.equal(
          body,
          'TAP version 13\n' +
          '# Structure of input file should conform to the schema\n' +
          'ok 1 ./test/fixtures/swagger-invalid.json is valid\n' +
          'ok 2 ./test/fixtures/schema.json is valid JSON\n' +
          'not ok 3 ./test/fixtures/swagger-invalid.json is NOT conform ./test/fixtures/schema.json: { [z-schema validation'
        , 'Invalid tap output for swagger file')
    }))

  t.end()
})

test('Swagger & JS tests should output valid tap & xunit output', function (t) {
  // Test swagger file in json format
  output
    .action({
      testFile: './lib/swagger-tests',
      swaggerFile: './test/fixtures/swagger.json',
      xunit: false,
      tape: test
    })
    .pipe(concat(function (r) {
      var body = r.toString('utf8')
      t.equal(
          body,
          'TAP version 13\n' +
          '# Parse file ./test/fixtures/swagger.json\n' +
          'ok 1 Valid swagger file\n' +
          '\n' +
          '1..1\n' +
          '# tests 1\n' +
          '# pass  1\n' +
          '\n' +
          '# ok\n'
        , 'Valid tap output for swagger file')
    }))

  // Test swagger file in yaml format
  output
    .action({
      testFile: './lib/swagger-tests',
      swaggerFile: './test/fixtures/swagger.yaml',
      xunit: false,
      tape: test
    })
    .pipe(concat(function (r) {
      var body = r.toString('utf8')
      t.equal(
          body,
          'TAP version 13\n' +
          '# Parse file ./test/fixtures/swagger.yaml\n' +
          'ok 1 Valid swagger file\n' +
          '\n' +
          '1..1\n' +
          '# tests 1\n' +
          '# pass  1\n' +
          '\n' +
          '# ok\n'
        , 'Valid tap output for swagger file')
    }))

  output
    .action({
      testFile: './lib/swagger-tests',
      swaggerFile: './test/fixtures/swagger.json',
      xunit: true,
      tape: test
    })
    .pipe(concat(function (r) {
      var body = r.toString('utf8')
      t.equal(
          body,
          '<?xml version="1.0"?>\n' +
          '<testsuites>\n' +
          '  <testsuite name="Parse file ./test/fixtures/swagger.json" tests="1" failures="0" errors="0">\n' +
          '    <testcase name="#1 Valid swagger file"/>\n' +
          '  </testsuite>\n' +
          '</testsuites>\n'
        , 'Valid xunit output for swagger file')
    }))

  output
    .action({ testFile: './test/js/example-tests', xunit: false, tape: test })
    .pipe(concat(function (r) {
      var body = r.toString('utf8')
      t.equal(
          body,
          'TAP version 13\n' +
          '# it should return ok\n' +
          'ok 1 looking good\n' +
          '\n' +
          '1..1\n' +
          '# tests 1\n' +
          '# pass  1\n' +
          '\n' +
          '# ok\n'
      , 'Valid tap output')
    }))

  output
    .action({
      testFile: './test/js/example-tests',
      xunit: true,
      tape: test
    })
    .pipe(concat(function (r) {
      var body = r.toString('utf8')
      t.equal(
          body,
            '<?xml version="1.0"?>\n' +
            '<testsuites>\n' +
            '  <testsuite name="it should return ok" tests="1" failures="0" errors="0">\n' +
            '    <testcase name="#1 looking good"/>\n' +
            '  </testsuite>\n' +
            '</testsuites>\n'
       , 'Valid xunit output')
    }))

  t.end()
})

test('Invalid swagger should trigger a fail', function (t) {
  // json input
  output
    .action({
      testFile: './lib/swagger-tests',
      swaggerFile: './test/fixtures/swagger-invalid.json',
      xunit: false,
      tape: test
    })
    .pipe(concat(function (r) {
      var body = r.toString('utf8')
      t.equal(body.match(/is not a valid Swagger API definition/)[0], 'is not a valid Swagger API definition')
    }))

  // yaml input
  output
    .action({
      testFile: './lib/swagger-tests',
      swaggerFile: './test/fixtures/swagger-invalid.yaml',
      xunit: false,
      tape: test
    })
    .pipe(concat(function (r) {
      var body = r.toString('utf8')
      t.equal(body.match(/is not a valid Swagger API definition/)[0], 'is not a valid Swagger API definition')
    }))

  t.end()
})
