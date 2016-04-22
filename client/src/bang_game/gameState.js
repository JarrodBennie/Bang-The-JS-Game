var Player = require('./player.js');
var Game = require('./game.js');
var Dice = require('./dice.js');

var GameState = function(game){
  this.gameToSave = game;
  this.savedGame = null;
  this.hydratedGame = null;
}; // constructor [end]

GameState.prototype.save = function(){
  localStorage.setItem("bang_a_JS_game_save", JSON.stringify(this.gameToSave));
  console.log("saved this game to localStorage:", this.gameToSave);
}

GameState.prototype.load = function(){
  var loadReturn =  JSON.parse(localStorage.getItem("bang_a_JS_game_save"));
  this.savedGame = loadReturn;
  console.log("retrieved this game from localStorage:", loadReturn);
  
  if (!this.savedGame){
    console.log("saved game falsey - returning game that was passed to gameStave saver - this.savedGame was::", console.log(this.savedGame));
    return this.gameToSave;
  }
  else if (this.savedGame.wonBy){
    console.log("saved game was already won, by", this.savedGame.wonBy, "- returning game that was passed to gameStave saver - this.savedGame was:", console.log(this.savedGame));
    return this.gameToSave;
  };

  if (this.savedGame && !this.savedGame.wonBy) {
    
    console.log("unfinished game found in storage - rehydrating objects...");

    // var hydratedDice = new Dice(this.savedGame.dice);
    var dice = new Dice();
    var hydratedPlayers = new Array();
    var hydratedAllPlayers = new Array();

    console.log("looping through:", this.savedGame.allPlayers);
    console.log("loop length:", this.savedGame.allPlayers.length);
    for (var i = 0; i < this.savedGame.allPlayers.length; i++){
      hydratedAllPlayers.push(new Player("dummy name", this.savedGame.allPlayers[i]))
    }

    hydratedAllPlayers;
    for (var i = 0; i < hydratedAllPlayers.length; i++){
      for (var j = 0; j < this.savedGame.players.length; j++){
        if (hydratedAllPlayers[i].name === this.savedGame.players[j].name){
          hydratedPlayers[j] = hydratedAllPlayers[i].rehydrate(this.savedGame.players[j]);
        }
      }
    }



    // console.log("looping through:", this.savedGame.players);
    // console.log("loop length:", this.savedGame.players.length);
    // for (var i = 0; i < this.savedGame.players.length; i++){
    //   hydratedPlayers.push(new Player("dummy name", this.savedGame.players[i]))
    // }


    //using fresh dice // //////////////////////////////////////////////////
    var characterMaxHealthValues = true;
    this.hydratedGame = new Game(dice, hydratedPlayers, characterMaxHealthValues, this.savedGame, hydratedAllPlayers);
    this.gameToSave = this.hydratedGame;
    return this.gameToSave;


  }// if we want to use saved game - if statement end
}

module.exports = GameState;