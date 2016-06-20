var swaggerParser = require('swagger-parser');
var t = require('tap');
var fs = require('fs');

var file = fs.readFileSync(process.argv[2], 'utf8');

t.test('test the file', function (childTest) {

  return swaggerParser.validate(JSON.parse(file))
    .then(function(api) {
      console.log("API name: %s, Version: %s", api.info.title, api.info.version);
      childTest.pass('Valid swagger file');
      childTest.end();
    })
    .catch(function(err) {
      console.error(err);
      childTest.threw();
    });

});
