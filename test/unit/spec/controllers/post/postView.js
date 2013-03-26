'use strict';

describe('Controller: PostViewCtrl', function() {

  // load the controller's module
  beforeEach(module('dadDBYeomenApp'));

  var PostViewCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    PostViewCtrl = $controller('PostViewCtrl', {
      $scope: scope
    });
  }));

});
