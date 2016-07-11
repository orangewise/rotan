var util = require('util');
var ZSchema = require('z-schema');
var fs = require('fs');

ZSchema = new ZSchema({
  breakOnFirstError: true,
  noExtraKeywords: true,
  ignoreUnknownFormats: false,
  reportPathAsArray: true
});


exports.test = function (options) {
  var test = options.tape.createHarness();
  var stream = test.createStream();
  var jsonFile = fs.readFileSync(options.jsonFile, 'utf8');
  var schemaFile = fs.readFileSync(options.schemaFile, 'utf8');



  test('Structure of JSON should conform to the schema', function (t) {
    var json, schema;

    try {
      json = JSON.parse(jsonFile);
      t.pass(options.jsonFile + ' is valid JSON');
    } catch (e) {
      t.fail(options.jsonFile + ' is NOT valid JSON');
    }

    try {
      schema = JSON.parse(schemaFile);
      t.pass(options.schemaFile + ' is valid JSON');
    } catch (e) {
      t.fail(options.schemaFile + ' is NOT valid JSON');
    }


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
  });

  return stream;
};
