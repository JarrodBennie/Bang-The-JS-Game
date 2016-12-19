var Game = require('./bang_game/game');
var Player = require('./bang_game/player');
var Dice = require('./bang_game/dice');
var Hint = require('./bang_game/hint');
var GameState = require("./bang_game/gameState.js");
var View = require("./bang_game/view.js");

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
view.hint = hint;

window.onload = function(){
  view.grabElements();
  view.setup();
};
