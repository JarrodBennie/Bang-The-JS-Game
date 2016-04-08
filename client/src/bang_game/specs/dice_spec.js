var assert = require('chai').assert;
var Dice = require('../dice.js');

var dice;

describe('Dice', function(){
  beforeEach(function(){
    dice = new Dice();
  });

  it("should return random number", function(){
    assert.equal(dice.roll, 7 );
  });



});
