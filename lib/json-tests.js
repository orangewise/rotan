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
    var isValid = ZSchema.validate(JSON.parse(jsonFile), JSON.parse(schemaFile));
    if (isValid) {
      t.pass('JSON is conform schema');
    } else {
      var err = ZSchema.getLastError();
      var msg = util.inspect(err, { depth: 20 });
      t.fail('JSON is NOT conform the schema ' + msg);
    }

    t.end();
  });

  return stream;
};
