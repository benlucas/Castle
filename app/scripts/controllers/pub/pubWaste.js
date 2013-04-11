'use strict';
Castle.controller('PubWasteCtrl', ['$scope', '$routeParams', 'WasteFactory', 'PubFactory',
	function($scope, $routeParams, WasteFactory, PubFactory) {
		$scope.data = {date:new Date()};
		$scope.pub = PubFactory.get({_id:$routeParams.id});
		$scope.waste = WasteFactory.query({pubID:$routeParams.id});
		$scope.dateOptions = {
			format: "dd/mm/yy"
		};

		$scope.setDefaults = function(data){
			data.beerName = null;
			data.amount = "";
			data.notes = "";
		};
		
		$scope.setDefaults($scope.data);

		$scope.getWaste = function(a,b){
			var momentDate = moment(this.data.date);
			if(this.data.date !== "" && !momentDate.isValid())
				return;


			WasteFactory.query({ pubID: this.pub._id, date: momentDate.format("DD/MM/YY") }, function(result, header){
				$scope.waste = result;
			});
		}; 

		$scope.save = function(){
			if($scope.newWaste.$pristine || $scope.newWaste.$invalid) return;

			this.data.pubID = this.pub._id;
			WasteFactory.save(this.data, function(result, header){
				$scope.waste.push(result);
			});
			$scope.setDefaults($scope.data);
		};
	}
]);