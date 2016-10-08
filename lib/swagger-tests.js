var swaggerParser = require('swagger-parser');
var $RefParser = require('json-schema-ref-parser');

var fileContents = function (file, cb) {
  $RefParser.dereference(file, cb);
};

exports.test = function (options) {
  var test = options.tape.createHarness();
  var stream = test.createStream();

  test('Parse file ' + options.swaggerFile, function (t) {

    fileContents(options.swaggerFile, function (e, swagger) {

      return swaggerParser.validate(swagger)
        .then(function () {
          t.pass('Valid swagger file');
          t.end();
        })
        .catch(function (err) {
          t.end(err);
        });

    });
  });

  return stream;
};
