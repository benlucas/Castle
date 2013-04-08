'use strict';
//
// test/unit/controllers/controllers.js
//
describe('Castle controllers', function() {

	beforeEach(function(){
		this.addMatchers({
			toEqualData: function(expected) {
				return angular.equals(this.actual, expected);
			}
		});
	});


	beforeEach(module('Castle'));


	describe('PubCtrl', function(){
		var scope, ctrl, $httpBackend;

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('api/pub').
					respond([
						{ "_id" : "515c04fbf1756efe6de7b4cd", "location" : "Bolsover", "name" : "Castle Arms", "slug" : "castle-arms", "turnover" : [], "waste" : [] },
						{ "_id" : "514ae5ccc3e8134559693c4e", "location" : "Chesterfield", "name" : "Blue Bell", "slug" : "blue-bell", "turnover" : [], "waste" : [] }
					]);

			scope = $rootScope.$new();
			ctrl = $controller('PubCtrl', {$scope: scope});
		}));


		it('should create "pubs" model with 2 pubs fetched from xhr', function() {
			 expect(scope.pubs).toEqual([]);
			 $httpBackend.flush();

			 expect(scope.pubs).toEqualData(
			 		[
						{ "_id" : "515c04fbf1756efe6de7b4cd", "location" : "Bolsover", "name" : "Castle Arms", "slug" : "castle-arms", "turnover" : [], "waste" : [] },
						{ "_id" : "514ae5ccc3e8134559693c4e", "location" : "Chesterfield", "name" : "Blue Bell", "slug" : "blue-bell", "turnover" : [], "waste" : [] }
					]);
		});
	});

	describe('PubWasteCtrl', function(){
		var scope, ctrl, $httpBackend;

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
			$httpBackend = _$httpBackend_;
			$httpBackend.expectGET('/api/waste').
					respond({ "_id": "514ae5ccc3e8134559693c4e", "location": "Chesterfield", "name": "Blue Bell", "slug": "blue-bell", "waste": []});

			scope = $rootScope.$new();
			ctrl = $controller('PubWasteCtrl', {$scope: scope});
		}));

		it('should have defaults set', function() {
			expect(scope.pub).toBeDefined();
			expect(scope.data.beer).toEqual(null);
			expect(scope.data.waste).toEqual("");
			expect(scope.data.notes).toEqual("");
			expect(scope.data.date).toBeTruthy();
		});

		it('should create "pub" model with pub fetched from xhr', function() {
			$httpBackend.flush();

			expect(scope.pub).toEqualData({ "_id": "514ae5ccc3e8134559693c4e", "location": "Chesterfield", "name": "Blue Bell", "slug": "blue-bell", "waste": []});
		});
	});

});