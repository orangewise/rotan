var util = require('util')
var Ajv = require('ajv')
var ajv = new Ajv()
var util2 = require('./util.js')
var inject = require('./inject.js')

exports.test = function (options) {
  var test = options.tape.createHarness()
  var stream = test.createStream()

  test('Structure of input file should conform to the schema', function (t) {
    util2.fileContents(options.jsonFile, function (e, json) {
      if (e) {
        t.fail(options.jsonFile + ' is NOT valid:', e)
      } else {
        t.pass(options.jsonFile + ' is valid')

        // Inject if necessary.
        inject.snippets(json, options, function (e, injected) {
          if (e) {
            t.fail('Inject snippets failed: ' + e)
          } else {
            util2.fileContents(options.schemaFile, function (e, schema) {
              if (e) {
                t.fail(options.schemaFile + ' is NOT valid JSON', e)
              } else {
                t.pass(options.schemaFile + ' is valid JSON')
                var isValid
                if (injected && schema) {
                  // isValid = ZSchema.validate(injected, schema)
                  isValid = ajv.validate(schema, injected)
                }
                if (isValid) {
                  t.pass(options.jsonFile + ' is conform ' + options.schemaFile)
                } else {
                  // var err = ZSchema.getLastError()
                  var err = ajv.errorsText()
                  var msg = util.inspect(err, { depth: 20 })
                  t.fail(
                    options.jsonFile +
                    ' is NOT conform ' +
                    options.schemaFile +
                    ': ' + msg
                  )
                }
                t.end()
              }
            })
          }
        })
      }
    })
  })

  return stream
}
