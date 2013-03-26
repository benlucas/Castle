files = [
  JASMINE,
  JASMINE_ADAPTER,

  //3rd Party Code
  'app/scripts/vendor/angular.js',
  'test/vendor/angular-mocks.js',

  //App-specific code
  'app/scripts/*.js',
  'app/scripts/**/*.js',

  //Test-specs
  'test/mock/**/*.js',
  'test/unit/spec/**/*.js'
];


// web server port
port = 8080;


// cli runner port
runnerPort = 9100;

// Start these browsers, currently available:
// - Chrome
// - ChromeCanary
// - Firefox
// - Opera
// - Safari
// - PhantomJS
browsers = ['PhantomJS'];
captureTimeout = 5000;

shared = require(__dirname + "/testacular.shared.conf.js").shared
basePath	= shared.basePath;
growl     = shared.colors;
colors    = shared.colors;
singleRun = shared.singleRun;
autoWatch = shared.autoWatch;
reporters = shared.defaultReporters;
