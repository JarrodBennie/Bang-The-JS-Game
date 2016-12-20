var Game = require('./models/game');
var Player = require('./models/player');
var Dice = require('./models/dice');
var Hint = require('./extras/hint');
var GameState = require("./extras/gameState.js");
var View = require("./view_models/view.js");

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
