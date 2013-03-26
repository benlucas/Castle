var shared = {};
shared.singleRun = false
shared.autoWatch = true
shared.colors    = true
shared.growl     = true

// base path, that will be used to resolve files and exclude
shared.basePath	 = '../'

shared.defaultReporters = ['dots'];
shared.defaultBrowsers = ['Chrome'];
shared.defaultProxies = {
  '/': 'http://localhost:3501'
};

exports.shared = shared;