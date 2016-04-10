var assert = require('chai').assert;
var Player = require('../player.js');


describe('Player', function(){
  var player1;
  var character1;
  beforeEach(function(){

    var character1 = {
      name: "Jesse Jones",
      health: 9,
      img_small: "",
      img_large: "",
      ability_description: "If you have four life points or less, you gain two if you use [Beer] for yourself."
    };

    player1 = new Player("Craig");
    player1.character = character1;

  });

  it("should construct with a name", function(){
    assert.equal(player1.name, "Craig");
  });

  it("should return character name", function(){
    assert.equal(player1.character.name, "Jesse Jones" );
  });
  
  it("should set player health to equal health value on character card assigned to player", function(){
    player1.setHealth();
    assert.equal(player1.health, 9 );
  });







});