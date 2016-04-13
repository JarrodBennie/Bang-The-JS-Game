var GameState = function(game){
  this.gamePassedIn = game;
  this.savedGame = null;
}; // constructor [end]

GameState.prototype.save = function(){
  localStorage.setItem("saved_gameTEST", JSON.stringify(this.gamePassedIn));
  console.log(this.gamePassedIn);
}

GameState.prototype.load = function(){
  this.savedGame =  JSON.parse(localStorage.getItem("saved_gameTEST"));
  console.log(this.savedGame);

  if (this.savedGame) {
    // for (var i = 0; i < this.savedGame.players.length; i++){ /// PROBLEMS
    // };
    return this.savedGame;
  }
  else{
    this.savedGame = null;
    return this.gamePassedIn;
  }
}

module.exports = GameState;