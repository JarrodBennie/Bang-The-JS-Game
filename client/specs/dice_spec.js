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

  it("should return URL of image", function(){
    assert.equal(dice.imageUrl[1], 'https://i.imgur.com/j32ofq3.png');
  });

  it("should return random number between 1-6", function(){
    var result = dice.roll();
    assert.equal( result[0] <7 && result[0] > 0, true);
  });

  it("should return array of 5 random numbers", function(){
    assert.equal(dice.roll().length, 5);
  });

  it("should return array of 3 random numbers if 2 numbers saved before roll", function(){
    dice.saved = [ 2, 4 ];
    assert.equal(dice.roll().length, 3);
  });

  it("should save dice number 2", function(){
    dice.save(2);
    assert.deepEqual( dice.saved, [ 2 ] );
  });

  it("should save dynamite automatically from dice current roll", function(){
    dice.saveDynamite();
    assert.deepEqual( dice.saved, [ 5 ]);
  });

  it("should return true if 3 or more dynamite in current roll", function(){
    dice.all = [ 5, 5, 1, 5, 2 ];
    assert.equal(dice.threeDynamite(), true);
  });

  it("should return true if 3 or more dynamite combined between current roll and saved", function(){
    dice.save(5);
    dice.save(5);
    dice.save(5);
    dice.roll();
    assert.equal(dice.threeDynamite(), true);
  });

  it("should save number of arrows rolled over players full turn", function(){
    dice.currentRoll = [ 1, 6, 2, 6, 3]
    dice.countArrows();
    assert.equal(dice.arrowsRolled, 2);
  });

  it("should reset saved dice and arrows rolled to nothing for start of next player turn", function(){
    dice.saved = [ 1, 2, 3, 4, 5 ];
    this.arrowsRolled = 2;
    dice.reset();
    assert.deepEqual(dice.saved, [ ] );
    assert.equal(dice.arrowsRolled, 0 );
  });

  it("should have an 'all dice array' which stores the saved dice and the current roll dice in an array of 5 numbers that is the same as what should be displayed on screen in browser", function(){
    dice.saved = [ 1, 2, 3 ];
    dice.roll();
    assert.equal(typeof(dice.all[3]), "number");
  });

});
