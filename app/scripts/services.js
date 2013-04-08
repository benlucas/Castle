'use strict';
var services = angular.module('Castle.Services', ['ngResource']);


services.factory('WasteFactory', ['$resource', function($resource){
	return $resource('/api/waste/:slug',{}, {});
}]);

services.factory('PubFactory', ['$resource', function($resource){
	return $resource('api/pub/:slug',{slug: "@slug"});
}]);