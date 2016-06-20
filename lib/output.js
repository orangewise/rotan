var path = require('path');
var swaggerTests = require('./swagger-tests');

exports.action = function (options) {

  // The testFile should contain you tape tests.
  var testFile = (options.swaggerFile)
                  ?
                  swaggerTests
                  :
                  require(path.join(process.cwd(), options.testFile));

  if (options.xunit) {

    var converter = require('tap-xunit');
    var tapToxUnitConverter = converter();
    return testFile.test(options).pipe(tapToxUnitConverter);

  } else {

    return testFile.test(options);

  }
};
