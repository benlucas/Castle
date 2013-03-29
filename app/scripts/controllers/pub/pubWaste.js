'use strict';
Castle.controller('PubWasteCtrl', ['$scope', '$routeParams', 'WasteFactory',
	function($scope, $routeParams, WasteFactory) {
		$scope.data = {date:new Date()};
		$scope.pub = WasteFactory.get({slug:$routeParams.slug});
		$scope.dateOptions = {
			format: "dd/mm/yy"
		};
		$scope.setDefaults = function(data){
			data.beer = null;
			data.waste = "";
			data.notes = "";
		};
		$scope.setDefaults($scope.data);

		$scope.getWaste = function(a,b){
			var momentDate = moment(this.data.date);
			if(this.data.date !== "" && !momentDate.isValid())
				return;

			WasteFactory.get({ slug: this.pub.slug, date: momentDate.format("DD/MM/YY") }, function(result, header){
				$scope.pub = result;
			});
		}; 

		$scope.save = function(){
			if($scope.newWaste.$pristine || $scope.newWaste.$invalid) return;

			var data = {_id: this.pub._id, waste:this.data};
			WasteFactory.save(data, function(result, header){
				$scope.pub = result;
			});
			$scope.setDefaults($scope.data);
		};
	}
]);