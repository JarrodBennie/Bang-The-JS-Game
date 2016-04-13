var Player = require('./player.js');
var Game = require('./game.js');
var Dice = require('./dice.js');

var GameState = function(game){
  this.gamePassedIn = game;
  this.savedGame = null;
  this.hydratedGame = null;
}; // constructor [end]

GameState.prototype.save = function(){
  localStorage.setItem("saved_game", JSON.stringify(this.gamePassedIn));
  console.log("saved this game to localStorage:", this.gamePassedIn);
  console.log("in localstorage is probably looks like this:", JSON.stringify(this.gamePassedIn));
}

GameState.prototype.load = function(){
  this.savedGame =  JSON.parse(localStorage.getItem("saved_game"));
  console.log("retrieved this game from localStorage:", this.savedGame);
  
  if (!this.savedGame){
    console.log("saved game falsey - returning game that was passed to gameStave saver - this.savedGame was::", console.log(this.savedGame));
    return this.gamePassedIn;
  }
  else if (this.savedGame.wonBy){
    console.log("saved game falsey - returning game that was passed to gameStave saver - this.savedGame was:", console.log(this.savedGame));
    return this.gamePassedIn;
  };

  if (this.savedGame && !this.savedGame.wonBy) {
    console.log("unfinished game found in storage - rehydrating objects...");

    var hydratedDice = new Dice(this.savedGame.dice);
    var hydratedPlayers = new Array();
    var hydratedAllPlayers = new Array();

    for (var i = 0; i < this.savedGame.players.length; i++){
      hydratedPlayers.push(new Player("dummy name", this.savedGame.players[i]))
    }

    for (var i = 0; i < this.savedGame.allPlayers.length; i++){
      hydratedAllPlayers.push(new Player("dummy name", this.savedGame.allPlayers[i]))
    }

    var characterMaxHealthValues = true;
    this.hydratedGame = new Game(hydratedDice, hydratedPlayers, characterMaxHealthValues, this.savedGame, hydratedAllPlayers);

    return this.hydratedGame;
  }
}

module.exports = GameState;