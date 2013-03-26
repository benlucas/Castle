'use strict';
angular.module('Castle').filter('date', function () {
	return function (date) {
		var momentDate = moment(date);
		
		if(momentDate !== null && momentDate.isValid()){
			return momentDate.format("DD/MM/YY");
		}
		else{
			return "Invalid Date Format: " + moment(date);
		}
	};
});