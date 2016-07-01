var test = require('tape');
var output = require('../lib/output');
var concat = require('concat-stream');

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
      var body = r.toString('utf8');
      t.equal(
          body,
          'TAP version 13\n'
          + '# Structure of JSON should conform to the schema\n'
          + 'ok 1 JSON is conform to schema\n'
          + '\n'
          + '1..1\n'
          + '# tests 1\n'
          + '# pass  1\n'
          + '\n'
          + '# ok\n'
        , 'Valid tap output for swagger file');
    }));

  output
    .action({
      testFile: './lib/json-tests',
      jsonFile: './test/fixtures/swagger-invalid.json',
      schemaFile: './test/fixtures/schema.json',
      xunit: false,
      tape: test
    })
    .pipe(concat(function (r) {
      var body = r.toString('utf8');
      t.equal(
          body,
          'TAP version 13\n'
          + '# Structure of JSON should conform to the schema\n'
          + 'not ok 1 JSON is NOT conform the schema\n'
          + '  ---\n'
          + '    operator: fail\n'
          + '    at: Test.<anonymous> (/Users/ronald/node/npm/rotan/lib/json-tests.js:9:1299)\n'
          + '  ...\n'
          + '# { [z-schema validation error: JSON_OBJECT_VALIDATION_FAILED]\n'
          + '# name: \x1b[32m\'z-schema validation error\'\x1b[39m,\n'
          + '# message: \x1b[32m\'JSON_OBJECT_VALIDATION_FAILED\'\x1b[39m,\n'
          + '# details:\n'
          + '# [ { code: \x1b[32m\'OBJECT_MISSING_REQUIRED_PROPERTY\'\x1b[39m,\n'
          + '# params: [ \x1b[32m\'paths\'\x1b[39m ],\n'
          + '# message: \x1b[32m\'Missing required property: paths\'\x1b[39m,\n'
          + '# path: [],\n'
          + '# schemaId: \x1b[90mundefined\x1b[39m } ] }\n\n'
          + '1..1\n'
          + '# tests 1\n'
          + '# pass  0\n'
          + '# fail  1\n'
        , 'Valid tap output for swagger file');
    }));

  t.end();
});


test('Swagger & JS tests should output valid tap & xunit output', function (t) {

  output
    .action({ testFile: './lib/swagger-tests', swaggerFile: './test/fixtures/swagger.json', xunit: false, tape: test })
    .pipe(concat(function (r) {
      var body = r.toString('utf8');
      t.equal(
          body,
          'TAP version 13\n'
          + '# Parse file ./test/fixtures/swagger.json\n'
          + 'ok 1 Valid swagger file\n'
          + '\n'
          + '1..1\n'
          + '# tests 1\n'
          + '# pass  1\n'
          + '\n'
          + '# ok\n'
        , 'Valid tap output for swagger file');
    }));

  output
    .action({ testFile: './lib/swagger-tests', swaggerFile: './test/fixtures/swagger.json', xunit: true, tape: test })
    .pipe(concat(function (r) {
      var body = r.toString('utf8');
      t.equal(
          body,
          '<?xml version="1.0"?>\n'
        + '<testsuites>\n'
        + '  <testsuite name="Parse file ./test/fixtures/swagger.json" tests="1" failures="0" errors="0">\n'
        + '    <testcase name="#1 Valid swagger file"/>\n'
        + '  </testsuite>\n'
        + '</testsuites>\n'
        , 'Valid xunit output for swagger file');
    }));

  output
    .action({ testFile: './test/js/example-tests', xunit: false, tape: test })
    .pipe(concat(function (r) {
      var body = r.toString('utf8');
      t.equal(
          body,
          'TAP version 13\n'
          + '# it should return ok\n'
          + 'ok 1 looking good\n'
          + '\n'
          + '1..1\n'
          + '# tests 1\n'
          + '# pass  1\n'
          + '\n'
          + '# ok\n'
      , 'Valid tap output');
    }));

  output
    .action({ testFile: './test/js/example-tests', xunit: true,  tape: test })
    .pipe(concat(function (r) {
      var body = r.toString('utf8');
      t.equal(
          body,
            '<?xml version="1.0"?>\n'
          + '<testsuites>\n'
          + '  <testsuite name="it should return ok" tests="1" failures="0" errors="0">\n'
          + '    <testcase name="#1 looking good"/>\n'
          + '  </testsuite>\n'
          + '</testsuites>\n'
       , 'Valid xunit output');
    }));

  t.end();
});


test('Invalid swagger should trigger a fail', function (t) {

  output
    .action({ testFile: './lib/swagger-tests', swaggerFile: './test/fixtures/swagger-invalid.json', xunit: false, tape: test })
    .pipe(concat(function (r) {
      var body = r.toString('utf8');
      t.equal(body.match(/is not a valid Swagger API definition/)[0], 'is not a valid Swagger API definition');
    }));

  t.end();
});
