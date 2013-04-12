'use strict';
Castle.controller('PubTurnoverCtrl', ['$scope', '$routeParams', 'TurnoverFactory', 'PubFactory',
	function($scope, $routeParams, TurnoverFactory, PubFactory) {

		var callbackFunction = function(result, header){
			var total = 0
			for (var i = result.length - 1; i >= 0; i--) {
				total = total + result[i].amount
			};
			$scope.total = total;
		}

		$scope.setDefaults = function(data){
			data.amount = null;
			data.notes = "";
		};

		$scope.getTurnover = function(a,b){
			var momentDate = moment(this.data.date);
			if(this.data.date !== "" && !momentDate.isValid())
				return;

			this.turnover = TurnoverFactory.query({ pubID: this.pub._id, date: momentDate.format("DD/MM/YY") }, callbackFunction);
		};

		$scope.save = function(){
			if($scope.newTurnover.$pristine || $scope.newTurnover.$invalid) return;

			$scope.data.pub = this.pub._id;
			TurnoverFactory.save(this.data, function(result, header){
				$scope.turnover.push(result);
			});
			$scope.setDefaults($scope.data);
		};

		$scope.data = {date:new Date()};
		$scope.pub = PubFactory.get({_id:$routeParams.id});
		$scope.turnover = TurnoverFactory.query({pubID:$routeParams.id}, callbackFunction);
		$scope.dateOptions = {
			format: "dd/mm/yy"
		};

		$scope.setDefaults($scope.data);
	}
]);