
exports.test = function (options) {
  var test = options.tape.createHarness();
  var stream = test.createStream();

  test('it should return ok', function (t) {
    t.plan(1);
    t.ok(true, 'looking good');
  });

  return stream;
};
