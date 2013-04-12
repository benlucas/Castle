'use strict';
var services = angular.module('Castle.Services', ['ngResource']);


services.factory('TurnoverFactory', ['$resource', function($resource){
	return $resource('/api/turnover/:pubID',{}, {});
}]);

services.factory('WasteFactory', ['$resource', function($resource){
	return $resource('/api/waste/:pubID',{}, {});
}]);

services.factory('PubFactory', ['$resource', function($resource){
	return $resource('api/pub/:_id',{});
}]);