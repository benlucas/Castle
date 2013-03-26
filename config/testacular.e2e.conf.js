// Testacular configuration


files = [
  ANGULAR_SCENARIO,
  ANGULAR_SCENARIO_ADAPTER,
  'app/scripts/*.js',
  'app/scripts/**/*.js',
  'test/e2e/**/*.js'
];

// web server port
port = 8081;


// cli runner port
runnerPort = 9101;

shared = require(__dirname + "/testacular.shared.conf.js").shared
basePath	= shared.basePath;
growl     = shared.colors;
colors    = shared.colors;
singleRun = shared.singleRun;
autoWatch = shared.autoWatch;
browsers  = shared.defaultBrowsers;
reporters = shared.defaultReporters;
proxies   = shared.defaultProxies;
