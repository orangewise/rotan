var test = require('tape');
var inject = require('../lib/inject.js');
var cors = require('./fixtures/cors.json');
var swaggerParser = require('swagger-parser');
var util = require('../lib/util.js');

test('inject array of json object', function (t) {
  var injected = inject.array([ { a: 'b' }, { b: 'c' }]);
  var expected = { a: 'b', b: 'c' };
  t.deepEqual(injected, expected, 'inject.array injects array of json objects');
  t.end();
});

test('return folder as array', function (t) {
  inject.readFiles('./test/fixtures/inject/*.yaml', function (e, r) {
    t.equal(r.length, 1, 'array should have 1 element');
    t.deepEqual(r[0], cors, 'first element equals cors.json');
    t.end();
  });
});

test('openapi is still valid after injection', function (t) {
  inject.readFiles('./test/fixtures/inject/*.yaml', function (e, injectJson) {
    util.fileContents('./test/fixtures/swagger-base.yaml', function (e, api) {
      // Add api to injectJson
      injectJson.push(api);
      var merged = inject.array(injectJson);
      swaggerParser
        .validate(merged)
        .then(function () {
          t.pass('Valid openapi file');
          t.end();
        });
    });
  });
});


test('inject cors into empty object', function (t) {
  inject.snippets({}, { inject: './test/fixtures/inject/*.yaml' }, function (e, injected) {
    t.deepEqual(injected, cors, 'cors is injected into empty object');
    t.end();
  });
});

test('inject pattern results in 0 files', function (t) {
  inject.snippets({}, { inject: './test/fixtures/inject/*.yam' }, function (e, injected) {
    t.equal(injected, undefined, 'nothing is injected');
    t.end();
  });
});

test('inject nothing into cors', function (t) {
  inject.snippets(cors, {}, function (e, injected) {
    t.deepEqual(injected, cors, 'cors is equal to injected');
    t.end();
  });
});

// test('inject cors into openapi and save file', function (t) {
//   t.fail('TODO');
//   t.end();
// });
