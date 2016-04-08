var assert = require('chai').assert;
var Game = require('../game.js');
var getUniqueRandomElement = require('../game.js').randomElement;

var game;

describe('Game', function(){
  beforeEach(function(){
    game = new Game([{name: "Adam"}, {name: "Craig"}, {name: "Jarrod"}, {name: "Sam"}, {name: "Reid"}, {name: "Morton"}, {name: "Bennie"}, {name: "Parkyn"}]);
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
});
