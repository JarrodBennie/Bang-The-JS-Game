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
    var character2 = {
      name: "Kit Carlson",
      health: 7,
      img_small: "",
      img_large: "",
      ability_description: "For each [Gatling] you may discard one arrow from any player."
    };

    player1 = new Player("Craig");
    player1.character = character1;
    player1.role = "Outlaw";

    player2 = new Player("Adam");
    player2.character = character2;
    player2.role = "Sheriff";

  });

  it("should construct with a name", function(){
    assert.equal(player1.name, "Craig");
  });

  it("should return character name", function(){
    assert.equal(player1.character.name, "Jesse Jones" );
  });

  
  it("should set player health and max health to equal health value on character card assigned to player", function(){
    player1.setHealth();
    assert.equal(player1.health, 9 );
    assert.equal(player1.maxHealth, 9 );
  });

  it("should add 2 extra health and max health if player role is the Sheriff", function(){
    player2.setHealth();
    assert.equal(player2.health, 9);
    assert.equal(player2.maxHealth, 9);
  });

  it("should add 1 health when heal", function(){
    player1.setHealth();
    player1.health = 1;
    player1.heal();
    assert.equal(player1.health, 2);
  });

  it("should not add health beyond max health", function(){
    player1.setHealth();
    player1.heal;
    assert.equal(player1.health, 9);
  });

  it("should lose 1 health if shot", function(){
    player1.setHealth();
    player1.shoot();
    assert.equal(player1.health, 8);
    assert.equal(player1.maxHealth, 9);
  });

  it("should return dead equals true when player health becomes 0", function(){
    player1.setHealth();
    player1.health = 1;
    player1.shoot();
    assert.equal(player1.dead, true);
  });

  it("should remove 1 health per arrow and reset player arrows to 0", function(){
    player1.setHealth();
    player1.arrows = 4;
    player1.removeHealthPerArrow();
    assert.equal(player1.health, 5);
    assert.equal(player1.arrows, 0);
  });




});