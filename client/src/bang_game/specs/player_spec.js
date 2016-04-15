var assert = require('chai').assert;
var Player = require('../player.js');
var Game = require('../game.js');


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
    player1.role = {name: "Outlaw"};

    player2 = new Player("Adam");
    player2.character = character2;
    player2.role = {name: "Sheriff"};

  }); // beforeEach

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

  // it("should add 1 health to target when use beer on target", function(){
  //   player1.maxHealth = 9;
  //   player1.health = 1;
  //   player2.target = player1;
  //   player2.beerTarget();
  //   assert.equal(player1.health, 2);
  // });

  it("should not add health beyond max health", function(){
    player1.setHealth();
    player1.heal;
    assert.equal(player1.health, 9);
  });

  it("should return a players remaining health as a percentage of their max health", function(){
    player1.health = 5;
    player1.maxHealth = 10;
    assert.equal(player1.healthAsPercentage(), 50);
  });

  it("should return health percentage in a string for display eg- width: x %", function(){
      player1.health = 5;
      player1.maxHealth = 10;
      assert.equal(player1.healthAsPercentageDisplay(), "width: 50%");
    });


});