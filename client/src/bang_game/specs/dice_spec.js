var assert = require('chai').assert;
var Dice = require('../dice.js');

var dice;

describe('Dice', function(){
  beforeEach(function(){
    dice = new Dice();
  });

  it("should return random number between 1-6", function(){
    assert.notEqual(dice.roll(1), 7 );
  });

  it("should return array of 5 random numbers between 1-6", function(){
    assert.equal(dice.roll(5).length, 5);
  });



});
