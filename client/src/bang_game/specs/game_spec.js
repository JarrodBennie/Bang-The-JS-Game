var assert = require('chai').assert;
var Game = require('../game.js');
var Player = require('../player.js');
var getUniqueRandomElement = require('../game.js').randomElement;

var game;
var player6; // this player must be a global var in spec file to make the test for rotating to a given index pass - as Array.prototype.indexOf() function uses strict comparison (===) intenally - so the object you search for the index of must be the exact same object, so we can't new up an identical object and treat it as the same object when using array.indexOf()
// the test would pass fine without this if you were passing the index itself as an integer - but it's nice if you can use indexOf to get the index of the player object as well - so I wanted to test for that.

describe('Game', function(){
  beforeEach(function(){
    var player3 = new Player("Craig");
    player6 = new Player("Parkyn")
    game = new Game([{name: "Adam"}, {name: "Bennie"}, player3, {name: "Jarrod"}, {name: "Morton"}, player6, {name: "Reid"}, {name: "Sam"}]);
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
    player6.health = 0;
    game.checkForDeaths();
    assert.equal(game.players.length, startLength - 1);
  });
  it("should check for and confirm a sheriff's team victory", function(){
    player6.role = "Sheriff";
    // as none of the other objects in the game.players array will have any role based on the beforeEach function - simply adding the sheriff role to one player creates a sheriff team win state - with the sheriff being the only role left alive.
    assert.equal(game.winCheck(), "Sheriff wins!");
  });
  it("should check for and confirm an outlaw team victory", function(){
    for (var i = 0; i < 7;  i++){
      game.players.pop();
    }
    game.players[0].role = "Outlaw";
    assert.equal(game.winCheck(), "Outlaws win!");
  });
  it("should check for and confirm a renegade victory", function(){
    for (var i = 0; i < 7;  i++){
      game.players.pop();
    }
    game.players[0].role = "Renegade";
    assert.equal(game.winCheck(), "Renegade wins!");
  });

});
