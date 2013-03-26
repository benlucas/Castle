'use strict';
Castle.controller('PubIndexCtrl', ['$scope', '$routeParams', 'PubFactory', 
	function($scope, $routeParams, PubFactory) {
		$scope.pub = PubFactory.get({slug:$routeParams.slug});
	}
]);
