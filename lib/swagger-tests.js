var swaggerParser = require('swagger-parser')
var util = require('./util.js')

exports.test = function (options) {
  var test = options.tape.createHarness()
  var stream = test.createStream()

  test('Parse file ' + options.swaggerFile, function (t) {
    util.fileContents(options.swaggerFile, function (e, swagger) {
      return swaggerParser.validate(swagger)
        .then(function () {
          t.pass('Valid swagger file')
          t.end()
        })
        .catch(function (err) {
          t.end(err)
        })
    })
  })

  return stream
}
