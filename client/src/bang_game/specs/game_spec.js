var assert = require('chai').assert;
var Game = require('../game.js');

var game;

describe('Game', function(){
  beforeEach(function(){
    game = new Game([{name: "Adam"}, {name: "Craig"}, {name: "Jarrod"}, {name: "Sam"}, {name: "Reid"}, {name: "Morton"}, {name: "Bennie"}, {name: "Parkyn"}]);
  });

  it("should construct with an array of 8 players", function(){
    assert.equal(game.players.length, 8);
  });
});
