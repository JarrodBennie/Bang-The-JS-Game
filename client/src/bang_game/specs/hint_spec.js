var assert = require('chai').assert;
var Hint = require('../hint');

var hint;

describe('Hint', function() {
  beforeEach(function(){
    hint = new Hint();
  });
  it('should have an array of 4 hints', function(){
    assert.equal( hint.all.length, 19 )
    assert.equal( hint.all.length, 20 )

  });
});