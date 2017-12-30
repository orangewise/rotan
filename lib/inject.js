var merge = require('lodash.merge')
var join = require('path').join
var glob = require('glob')
var util = require('./util.js')

var array = function (arr) {
  var merged = {}
  arr.forEach(function (a) {
    merged = merge(merged, a)
  })
  return merged
}
exports.array = array

// Read files at a certain location,
// return them as an array of json objects.
var readFiles = function (pattern, cb) {
  var arr = []
  glob(join(process.cwd(), pattern), function (e, files) {
    var fileCount = files.length
    if (fileCount === 0) {
      return cb(new Error('No files found'))
    } else {
      var cnt = 0
      files.forEach(function (file) {
        // var part = require(file)
        util.fileContents(file, function (e, r) {
          if (e) return cb(e)
          arr.push(r)
          cnt++
          if (cnt === fileCount) {
            // console.log('%s files read (%s)', cnt, files);
            return cb(null, arr)
          }
        })
      })
    }
  })
}
exports.readFiles = readFiles

// Inject snippets if options.inject is used, else return api.
var snippets = function (api, options, cb) {
  if (options.inject) {
    // console.log('inject before doing json-schema validation');
    readFiles(options.inject, function (e, injectJson) {
      if (e) {
        return cb(e)
      } else {
        // Add api to injectJson
        injectJson.push(api)
        var merged = array(injectJson)
        return cb(null, merged)
      }
    })
  } else {
    process.nextTick(function () {
      return cb(null, api)
    })
  }
}
exports.snippets = snippets
