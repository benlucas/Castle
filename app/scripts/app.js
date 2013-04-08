
'use strict';
var Castle = angular.module('Castle', ['Castle.Services', 'Castle.Directives', '$strap.directives']).
	config(['$routeProvider','$locationProvider', function($routeProvider, $location) {
		//$location.html5Mode(true);
		$routeProvider
			.when('/', {
				templateUrl: 'view/main',
				controller: 'PubCtrl' 
			}) 
			.when('/pub/:slug', { 
				templateUrl: 'view/pub/index',
				controller: 'PubIndexCtrl'
			})
			.when('/pub/:slug/waste', { 
				templateUrl: 'view/pub/waste', 
				controller: 'PubWasteCtrl' 
			})
			.when('/pub/:slug/turnover', { 
				templateUrl: 'view/pub/turnover',
				controller: 'PubTurnoverCtrl'
			})
			.when('/pub/:slug/expenses', { 
				templateUrl: 'view/pub/expenses',
				controller: 'PubExpensesCtrl'
			})
			.when('/404', { 
				controller: 'errorCtrl'
			})
			.otherwise({ 
				redirectTo: '/404'
			});
	}]);    