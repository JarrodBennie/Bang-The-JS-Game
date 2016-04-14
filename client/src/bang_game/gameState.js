var Player = require('./player.js');
var Game = require('./game.js');
var Dice = require('./dice.js');

var GameState = function(game){
  this.gamePassedIn = game;
  this.savedGame = null;
  this.hydratedGame = null;
}; // constructor [end]

GameState.prototype.save = function(){
  localStorage.setItem("bang_a_JS_game_save", JSON.stringify(this.gamePassedIn));
  console.log("saved this game to localStorage:", this.gamePassedIn);
}

GameState.prototype.load = function(){
  var loadReturn =  JSON.parse(localStorage.getItem("bang_a_JS_game_save"));
  this.savedGame = loadReturn;
  console.log("retrieved this from localStorage:", loadReturn);
  
  if (!this.savedGame){
    console.log("saved game falsey - returning game that was passed to gameStave saver - this.savedGame was::", console.log(this.savedGame));
    return this.gamePassedIn;
  }
  else if (this.savedGame.wonBy){
    console.log("saved game was already won, by", this.savedGame.wonBy, "- returning game that was passed to gameStave saver - this.savedGame was:", console.log(this.savedGame));
    return this.gamePassedIn;
  };

  if (this.savedGame && !this.savedGame.wonBy) {
    
    console.log("unfinished game found in storage - rehydrating objects...");

    // var hydratedDice = new Dice(this.savedGame.dice);
    var dice = new Dice();
    var hydratedPlayers = new Array();
    var hydratedAllPlayers = new Array();

    console.log("looping through:", this.savedGame.players);
    console.log("loop length:", this.savedGame.players.length);
    for (var i = 0; i < this.savedGame.players.length; i++){
      hydratedPlayers.push(new Player("dummy name", this.savedGame.players[i]))
    }
    console.log("looping through:", this.savedGame.allPlayers);
    console.log("loop length:", this.savedGame.allPlayers.length);
    for (var i = 0; i < this.savedGame.allPlayers.length; i++){
      hydratedAllPlayers.push(new Player("dummy name", this.savedGame.allPlayers[i]))
    }
    //using fresh dice // //////////////////////////////////////////////////
    var characterMaxHealthValues = true;
    this.hydratedGame = new Game(dice, hydratedPlayers, characterMaxHealthValues, this.savedGame, hydratedAllPlayers);

    return this.hydratedGame;
  }
}

module.exports = GameState;