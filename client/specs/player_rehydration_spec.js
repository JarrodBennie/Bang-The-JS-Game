var assert = require('chai').assert;
var Player = require('../player.js');

describe("Rehydrated Player", function(){
  var previousPlayer;

  beforeEach(function(){
    previousPlayer = {  
       "name":"Player 2",
       "character":{  
          "name":"Willy the Kid",
          "health":8,
          "imgUrl":"https://i.imgur.com/580j9rS.png",
          "abilityDescription":"You only need 2x [Gatling] to use the Gatling Gun."
       },
       "role":{  
          "name":"Sheriff",
          "imgUrl":"https://i.imgur.com/yYT038yb.jpg"
       },
       "arrows":2,
       "health":10,
       "maxHealth":10,
       "dead":false,
       "target":null,
       "actionCounters":{  
          "1":0,
          "2":0,
          "3":0,
          "4":0,
          "5":0,
          "6":0
  }
}
  });

  it("should not rehydrate if no previousObject passed", function(){
    var player = new Player("Player 784")
    assert.equal(player.role, null);
  });

  it("should rehydrate with role", function(){
    var player = new Player("asdqwe", previousPlayer)
    assert.equal("Sheriff", player.role.name);
  });






});


