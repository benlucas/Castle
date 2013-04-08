//
// test/unit/services.js
//
describe("Unit: Testing Services", function() {

  beforeEach(module('Castle.Services'));

  it('should contain an WasteFactory service', inject(function(WasteFactory) {
    expect(WasteFactory).not.to.equal(null);
  }));

  // it('should contain an PubFactory service', inject(function(PubFactory) {
  //   expect(PubFactory).not.to.equal(null);
  // }));

  // it('should have a working $appYoutubeSearcher service', inject(['WasteFactory',function(WasteFactory) {
  //   expect(WasteFactory).not.to.equal(null);
  // }]));

  // it('should have a working service that resizes dimensions', inject(['$appYoutubeSearcher',function($yt) {
  //   var w = 100;
  //   var h = 100;
  //   var mw = 50;
  //   var mh = 50;
  //   var sizes = $yt.resize(w,h,mw,mh);
  //   expect(sizes.length).to.equal(2);
  //   expect(sizes[0]).to.equal(50);
  //   expect(sizes[1]).to.equal(50);
  // }]));

  // it('should store and save data properly', inject(['$appStorage',function($storage) {
  //   var key = 'key', value = 'value';
  //   $storage.enableCaching();
  //   $storage.put(key, value);
  //   expect($storage.isPresent(key)).to.equal(true);
  //   expect($storage.get(key)).to.equal(value);

  //   $storage.erase(key);
  //   expect($storage.isPresent(key)).to.equal(false);

  //   $storage.put(key, value);
  //   $storage.flush();
  //   expect($storage.isPresent(key)).to.equal(false);
  // }]));

});