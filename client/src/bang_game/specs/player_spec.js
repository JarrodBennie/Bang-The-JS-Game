var assert = require('chai').assert;
var Player = require('../player.js');

var player1;

describe('Player', function(){
  beforeEach(function(){
    player1 = new Player("Craig");
  });

  it("should construct with a name", function(){
    assert.equal(player1.name, "Craig");
  });
});