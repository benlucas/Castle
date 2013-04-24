'use strict';
angular.module('Castle.Directives', [])
	.directive('navbar', function(){
		return {
			restrict: 'E',
			replace: true,
			scope: { pubName:'@pubname', pubID: '@pubid' },
			template: '<div class="navbar navbar-inverse navbar-fixed-top" bs-navbar>'+
										'<div class="navbar-inner">'+
											'<a class="brand" href="#">Main Page</a>'+
											'<div class="container">'+
												'<button type="button" class="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">'+
													'<span class="icon-bar"></span>'+
													'<span class="icon-bar"></span>'+
													'<span class="icon-bar"></span>'+
												'</button>'+
												'<div class="nav-collapse collapse">'+
													'<ul class="nav">'+
														'<li>'+
															'<a href="#/pub/{{pubID}}">Pub Home</a>'+
														'</li>'+
														'<li data-match-route=".*/waste" >'+
															'<a href="#/pub/{{pubID}}/waste">Waste</a>'+
														'</li>'+
														'<li data-match-route=".*/turnover">'+
															'<a href="#/pub/{{pubID}}/turnover">Turnover</a>'+
														'</li>'+
														'<li data-match-route=".*/expenses" >'+
															'<a  href="#/pub/{{pubID}}/expenses">Expenses</a>'+
														'</li>'+
													'</ul>'+
												'</div>'+
											'</div>'+
										'</div>'+
									'</div>'
		};
	});

