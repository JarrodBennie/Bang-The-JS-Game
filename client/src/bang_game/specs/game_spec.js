var assert = require('chai').assert;
var Game = require('../game.js');

var game;

describe('Game', function(){
  beforeEach(function(){
    game = new Game();
  });

  it("should construct with empty players array", function(){
    assert.deepEqual(game.players, []);
  });
});
