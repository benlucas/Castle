'use strict';

describe('Controller: PubCtrl', function() {

  // load the controller's module
  beforeEach(module('Castle'));

  var PubCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller) {
    scope = {};
    PubCtrl = $controller('PubCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of pubs to the scope', function() {
    expect(scope.pubs.length).toBe(4);
  });

  it('pubs should have the right structure', function() {
    var castleArms = {id:2, name:'Castle Arms', location:'Bolsover', slug:'castle-arms'};
    expect(scope.pubs).toContain(castleArms);
  });
});
