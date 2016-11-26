var $RefParser = require('json-schema-ref-parser')

var fileContents = function (file, cb) {
  $RefParser.dereference(file, cb)
}
exports.fileContents = fileContents
