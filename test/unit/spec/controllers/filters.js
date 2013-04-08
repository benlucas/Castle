'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {

  beforeEach(module('Castle'));


  describe('date', function() {

    it('should convert ISO date to readable UK date',
        inject(function(dateFilter) {
      expect(dateFilter("2013-03-28T00:00:00.000Z")).toBe("28/03/13");
      expect(dateFilter("2023-03-04T00:00:00.000Z")).toBe("04/03/23");
    }));
  });
});