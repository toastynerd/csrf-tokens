'use strict';

var expect = require('chai').expect;
var csrft = require('../index');

describe('encode a token', function() {
  before(function(done) {
    //this is actually done on iniation but we're doing it a second time
    csrft.genSalt(function(){
      done();
    });
  });

  it('encode should return a string', function(done) {
    csrft.encode({hello: "world"}, 'sometestsecret', function(err, token) {
      expect(err).to.eql(null);
      expect(typeof(token)).to.eql('string');
      done();
    });
  });

  it('should not encode invaild JSON', function(done) {
    csrft.encode("{hello: broken", 'sometestsecret', function(err, token) {
      expect(err).to.not.eql(null);
      expect(token).to.eql(undefined);
      expect(err.message).to.eql('invalid JSON');
      done();
    });
  });
});
