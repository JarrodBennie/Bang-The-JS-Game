var assert = require('chai').assert;
var Dice = require('../dice.js');


describe('Dice', function(){
  var dice;
  var testRoll;
  beforeEach(function(){
    dice = new Dice();
    dice.currentRoll = [ 1, 2, 3, 5, 6 ]
  });

  it("should have an array of saved Dice", function(){
    assert.deepEqual( dice.saved, []);
  });

  it("should return random number between 1-6", function(){
    assert.notEqual( dice.roll(), 7);
  });

  it("should return array of 5 random numbers", function(){
    assert.equal(dice.roll().length, 5);
  });

  it("should save dice at index 2", function(){
    dice.save(2);
    assert.deepEqual( dice.saved, [ 3 ] );
  });

  it("should save dynamite automatically from dice current roll", function(){
    dice.saveDynamite();
    assert.deepEqual( dice.saved, [ 5 ]);
  });

  it("should return true if 3 or more dynamite in current roll", function(){
    dice.currentRoll = [ 5, 5, 1, 5, 2 ];
    assert.equal(dice.threeDynamite(), true);
  });

  it("should return true if 3 or more dynamite combined between current roll and saved", function(){
    dice.save(3);
    dice.currentRoll = [ 5, 1, 2, 3, 5 ];
    assert.equal(dice.threeDynamite(), true);
  });

  it("should return true if 3 or more gatling saved", function(){
    dice.currentRoll = [ 4, 4, 4, 1, 2 ];
    dice.save(0);
    dice.save(1);
    dice.save(2);
    assert.equal(dice.threeGatling(), true);
  });




});
