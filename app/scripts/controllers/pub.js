 'use strict';
 
Castle.controller('PubCtrl', ['$scope', 'PubFactory', function($scope, PubFactory) {
		$scope.pubs = PubFactory.query(); 
}]);