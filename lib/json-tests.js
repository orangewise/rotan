var util = require('util');
var ZSchema = require('z-schema');
var $RefParser = require('json-schema-ref-parser');

ZSchema = new ZSchema({
  breakOnFirstError: true,
  noExtraKeywords: true,
  ignoreUnknownFormats: false,
  reportPathAsArray: true
});

var fileContents = function (file, cb) {
  $RefParser.dereference(file, cb);
};


exports.test = function (options) {
  var test = options.tape.createHarness();
  var stream = test.createStream();

  test('Structure of input file should conform to the schema', function (t) {

    fileContents(options.jsonFile, function (e, json) {
      if (e) {
        t.fail(options.jsonFile + ' is NOT valid');
      } else {
        t.pass(options.jsonFile + ' is valid');

        fileContents(options.schemaFile, function (e, schema) {
          if (e) {
            t.fail(options.schemaFile + ' is NOT valid JSON');
          } else {
            t.pass(options.schemaFile + ' is valid JSON');

            var isValid;
            if (json && schema) {
              isValid = ZSchema.validate(json, schema);
            }
            if (isValid) {
              t.pass(options.jsonFile + ' is conform ' + options.schemaFile);
            } else {
              var err = ZSchema.getLastError();
              var msg = util.inspect(err, { depth: 20 });
              t.fail(options.jsonFile + ' is NOT conform ' + options.schemaFile + ': '+ msg);
            }
            t.end();
          }
        });
      }
    });
  });

  return stream;
};
