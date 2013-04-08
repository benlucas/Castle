//
// test/midway/castleSpec.js
//
describe("Midway: Testing Modules", function() {
	describe("App Module:", function() {

		var module;
		before(function() {
			module = angular.module("Castle");
		});

		it("should be registered", function() {
			expect(module).not.to.equal(null);
		});

		describe("Dependecies:", function(){
			var deps;
			var hasModule = function(m){
				return deps.indexOf(m) >= 0;
			};

			before(function(){
				deps = module.value('Castle').requires;
			});

			it("should have Castle.Services as a dependency", function() {
				expect(hasModule('Castle.Services')).to.equal(true);
			});

			it("should have Castle.Directives as a dependency", function() {
				expect(hasModule('Castle.Directives')).to.equal(true);
			});

			it("should have $strap.directives as a dependency", function() {
				expect(hasModule('$strap.directives')).to.equal(true);
			});
			
		});

	});
});