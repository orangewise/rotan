var swaggerParser = require('swagger-parser');
var fs = require('fs');

exports.test = function (options) {
  var test = options.tape.createHarness();
  var stream = test.createStream();
  var file = fs.readFileSync(options.swaggerFile, 'utf8');
  test('Parse file ' + options.swaggerFile, function (t) {

    return swaggerParser.validate(JSON.parse(file))
      .then(function () {
        t.pass('Valid swagger file');
        t.end();
      })
      .catch(function (err) {
        t.end(err);
      });

  });

  return stream;
};
