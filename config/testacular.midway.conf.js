files = [
  MOCHA,
  MOCHA_ADAPTER,
  './config/mocha.conf.js',

  //3rd Party Code
  'app/scripts/vendor/angular.min.js',
  'app/scripts/vendor/angular-resource.js',
  'app/scripts/vendor/app.router.js',

  //App-specific Code
  'app/scripts/*.js',
  'app/scripts/controllers/*.js',

  //Test-Specific Code
  'node_modules/chai/chai.js',
  'test/lib/chai-should.js',
  'test/lib/chai-expect.js',
  'test/vendor/ngMidwayTester/Source/ngMidwayTester.js',

  //Test-Specs
  'test/midway/**/*.js'
];


port = 9202;
runnerPort = 9302;
captureTimeout = 5000;


shared = require(__dirname + "/testacular.shared.conf.js").shared
basePath  = shared.basePath;
growl     = shared.colors;
colors    = shared.colors;
singleRun = shared.singleRun;
autoWatch = shared.autoWatch;
browsers  = shared.defaultBrowsers;
reporters = shared.defaultReporters;
proxies   = shared.defaultProxies;