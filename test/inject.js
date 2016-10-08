var test = require('tape');
var inject = require('../lib/inject.js');
var cors = require('./fixtures/cors.json');

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

test('inject cors into swagger', function (t) {
  t.end();
});
