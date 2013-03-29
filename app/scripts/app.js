
'use strict';
var Castle = angular.module('Castle', ['castle.services', '$strap.directives', 'castle.directives']).
	config(['$routeProvider', function($routeProvider) {
		
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
			});
			// .when('/api/post/index', {
			// 	templateUrl: 'views/post/postIndex.html',
			// 	controller: 'PostIndexCtrl'
			// })
			// .when('/api/post/create', {
			// 	templateUrl: 'views/post/postCreate.html',
			// 	controller: 'PostCreateCtrl'
			// })
			// .when('/api/post/update/:id', {
			// 	templateUrl: 'views/post/postUpdate.html',
			// 	controller: 'PostUpdateCtrl'
			// })
			// .when('/api/post/view/:id', {
			// 	templateUrl: 'views/post/postView.html', 
			// 	controller: 'PostViewCtrl'
			// });
			// .otherwise({
			//   redirectTo: '/'
			// });
	}]);    