var test = require('tape');
var output = require('../lib/output');
var concat = require('concat-stream');

test('output actions should output valid tap & xunit output', function (t) {

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
