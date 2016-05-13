Game = require('./bang_game/game');
Player = require('./bang_game/player');
Dice = require('./bang_game/dice');
Hint = require('./bang_game/hint');
GameState = require("./bang_game/gameState.js");
playSound = require("./bang_game/play_sound.js");
View = require("./bang_game/view.js");

var hint = new Hint;
var players = new Array(8);
for (var i = 0; i < players.length; i++){
  players[i] = new Player("Player " + (i+1) )
};

var characterMaxHealthValues = true;
var game = new Game(new Dice(), players, characterMaxHealthValues);
game.setup();
var gameState = new GameState(game);
game = gameState.load();
console.log("Active game:", game);
var view = new View(gameState, game);

window.onload = function(){
  view.grabElements();
  view.hint = hint;
  view.setup();
}; // END OF WINDOW ONLOAD

/////////////////////////////
// WINDOW ONLOAD ENDS HERE //
/////////////////////////////

//////////////////////////////////
// WINDOW ONLOAD ENDS SOMEWHERE //
//////////////////////////////////

//////////////////////////////////////
//  WINDOW ONLOAD USED TO END HERE  //
//////////////////////////////////////

////////////////////////////////////////////////////////////
//    'dice.unsave(dice.all[indexOf(dice.all[index])])'   //
//      -Craig                                            //
////////////////////////////////////////////////////////////