'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Castle', function() {

	beforeEach(function() {
		browser().navigateTo('/');
	});



	describe('index', function() {

		beforeEach(function() {
			browser().navigateTo('/');
		});


		it("Index title should be Castle Solutions", function() {
				expect(element("h1", "Page Header").text()).toBe("Castle Solutions"); 
		});

		it("should have a list of pubs", function() {
				expect(repeater(".site-list li", "Pub List").count()).toEqual(4); 
		});

		it("should navigate to pub management", function() {
				element("a").click();
				expect(element(".site-contents").text()).toContain("Waste"); 
		});

	});

	describe('pub index', function() {

		beforeEach(function() {
			browser().navigateTo('/#/pub/1');
		});


		it("should have pub name at top", function() {
				expect(element("h1", "pub name").text()).toBe("Blue Bell"); 
		});

		// it("should have a list of pubs", function() {
		// 		expect(repeater(".site-list li", "Pub List").count()).toEqual(4); 
		// });

		// it("should navigate to pub management", function() {
		// 		element("a").click();
		// 		expect(element(".site-contents").text()).toContain("Waste"); 
		// });

	});
}); 