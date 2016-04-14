var assert = require('chai').assert;
var Player = require('../player.js');
var Game = require('../game.js');
var Dice = require('../dice.js');
var getUniqueRandomElement = require('../game.js').randomElement;

var dice;
var game;
var player1;
var player3;
var player6; // this player must be a global var in spec file to make the test for rotating to a given index pass - as Array.prototype.indexOf() function uses strict comparison (===) intenally - so the object you search for the index of must be the exact same object, so we can't new up an identical object and treat it as the same object when using array.indexOf()
// the test would pass fine without this if you were passing the index itself as an integer - but it's nice if you can use indexOf to get the index of the player object as well - so I wanted to test for that.

describe('Game', function(){

  beforeEach(function(){
   dice = new Dice();
   player1 = new Player("Adam");
   player2 = new Player("Bennie");
   player3 = new Player("Craig");
   player6 = new Player("Parkyn")
   game = new Game(dice, [player1, player2, player3, {name: "Jarrod"}, {name: "Morton"}, player6, {name: "Reid"}, {name: "Sam"}]);
 });

  it("should construct with an array of 8 players", function(){
    assert.equal(game.players.length, 8);
  });
  it("should have a utility function to select a random array element - and remove it to ensure each element is only selected once", function(){
    var array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p"]
    var times = array.length
    for (var i = 0; i < times; i++){
      getUniqueRandomElement(array);
    }
    assert.deepEqual(array, []);
  });
  it("should add roles to all players", function(){
    game.assignRoles();
    assert.isOk(game.players[7].role);
  });
  it("should add characters to all players", function(){
    game.assignCharacters();
    assert.isOk(game.players[7].character);
  });
  it("should be able to rotate players array", function(){
    game.rotatePlayers();
    assert.equal(game.players[0].name, "Bennie");
  });
  it("should be able to remove eliminated players", function(){
    var startLength = game.players.length;;
    var playerToRemove = new Player("Craig");
    game.removePlayer(playerToRemove);
    assert.equal(game.players.length, startLength - 1);
  });
  it("should rotate players array by a given number of places if rotate function is passed an optional argument", function(){
    // game.rotatePlayers(5); // simpler way - also passes test, but using indexOf makes it easier to use the rotatePlayers() function when padding an argument of the number of times to rotate.
    // can use game.players.indexOf(--sheriff object--) as argument to pass into RotatePlayers function to bring sheriff to index 0 before first turn
    game.rotatePlayers(game.players.indexOf(player6));
    assert.equal(game.players[0].name, "Parkyn");
  });
  it("should check all players for dead players and remove them from the game", function(){
    var startLength = game.players.length
    player3.health = 8;
    player6.health = 0;
    player1.health = 3;
    player2.health = 5
    game.checkForDeaths();
    assert.equal(game.players.length, startLength - 1);
  });
  it("should check for and confirm a sheriff's team victory", function(){
    for (var i = 0; i < game.players.length; i++){
      game.players[i].role = {name: "Deputy"}
    }
    player6.role = {name: "Sheriff"};
    // as none of the other objects in the game.players array will have any role based on the beforeEach function - simply adding the sheriff role to one player creates a sheriff team win state - with the sheriff being the only role left alive.
    assert.equal(game.winCheck(), "Sheriff wins!");
  });
  it("should check for and confirm an outlaw team victory", function(){
    for (var i = 0; i < 7;  i++){
      game.players.pop();
    }
    game.players[0].role = { name: "Outlaw"};
    assert.equal(game.winCheck(), "Outlaws win!");
  });
  it("should check for and confirm a renegade victory", function(){
    for (var i = 0; i < 7;  i++){
      game.players.pop();
    }
    game.players[0].role = { name: "Renegade"};
    assert.equal(game.winCheck(), "Renegade wins!");
  });

  it("should add each dice result from dice.all to the players action counters", function(){
    dice.all = [ 2, 3, 2, 5, 6 ]
    game.addToActionCounters();
    assert.deepEqual(game.players[0].actionCounters, { "1": 0, "2": 2, "3": 1, "4": 0, "5": 1, "6": 1});
  });
  it("should remove 1 health per arrow and reset player arrows to 0", function(){
    player1.arrows = 4;
    player1.health = 9;
    game.removeHealthAndArrows();
    assert.equal(player1.health, 5);
    assert.equal(player1.arrows, 0);
  });

  it("should shoot everyone except the current player when gatling and remove current players arrows and add them back into the Game total arrows", function(){
    game.totalArrows = 5;
    player1.health = 2;
    player1.arrows = 4;
    player3.health = 2;
    player6.health = 2;
    dice.all =[ 4, 1, 4, 1, 4 ];
    game.threeGatling();
    assert.equal(player1.health, 2);
    assert.equal(player1.arrows, 0);
    assert.equal(game.totalArrows, 9);
    assert.equal(player3.health, 1);
    assert.equal(player6.health, 1);
  });

  it("should remove 1 health from targeted player at 1 position away if have a bullseye 1 and remove 1 action counter", function(){
    player1.actionCounters = { "1": 3};
    player2.health = 8;
    player2.maxHealth = 8;
    player1.target = player2;
    game.shootTarget();
    assert.equal(player2.health, 7);
    assert.equal(player2.maxHealth, 8);
    assert.equal(player1.actionCounters["1"], 2);
  });

  it("should remove 1 health from targeted player at 2 positions away if have a bullseye 2 and remove 1 action counter", function(){
    player1.actionCounters = { "2": 3};
    player3.health = 8;
    player3.maxHealth = 8;
    player1.target = player3;
    game.shootTarget();
    assert.equal(player3.health, 7);
    assert.equal(player3.maxHealth, 8);
    assert.equal(player1.actionCounters["2"], 2);
  });

  it("should add 1 health to target when use beer on target and remove 1 action counter", function(){
    player1.actionCounters = { "3": 3};
    player2.maxHealth = 9;
    player2.health = 1;
    player1.target = player2;
    game.beerTarget();
    assert.equal(player2.health, 2);
    assert.equal(player1.actionCounters["3"], 2);
  });

  it("should count actions available", function(){
    player1.actionCounters = { "1": 1, "2": 1, "3": 1, "4": 0, "5": 0, "6": 0};
    assert.equal(game.checkActions(), 3);
  })


});
