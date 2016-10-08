var merge = require('lodash.merge');
var join = require('path').join;
var fs = require('fs');
var glob = require('glob');
var $RefParser = require('json-schema-ref-parser');
var sortObj = require('sort-object');

exports.array = function (arr) {
  merged = {};
  arr.forEach(function (a) {
    merged = merge(merged, a);
  });
  return merged;
};

var fileContents = function (file, cb) {
  $RefParser.dereference(file, cb);
};

exports.readFiles = function (pattern, cb) {
  var arr = [];
  glob(join(process.cwd(), pattern), function (e, files) {
    var fileCount = files.length;
    var cnt = 0;
    files.forEach(function (file) {
      // var part = require(file)
      fileContents(file, function (e, r) {
        if (e) return cb(e);
        arr.push(r);
        cnt++;
        if (cnt === fileCount) {
          console.log('%s files read (%s)', cnt, files);
          return cb(null, arr);
        }
      });
    });
  });
};

// var writeToFile = function (mergedApiFile, mergedApi) {
//   fs.writeFile(mergedApiFile, JSON.stringify(mergedApi, null, 2), function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Saved as', mergedApiFile);
//     }
//   });
// };

// readFiles('./src/api-*', function (e, r) {
//   var sorted = sortObj(r, {keys: ['swagger', 'info', 'basePath', 'paths', 'x-a127-services', 'definitions']});
//   if (opts.output === 'yaml') {
//     console.log('convert to yaml');
//   }
//   writeToFile(mergedApiFile, sorted);
// });
