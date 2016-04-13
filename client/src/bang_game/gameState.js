var GameState = function(game){
  this.gamePassedIn = game;
  this.savedGame = null;
}; // constructor [end]

GameState.prototype.save = function(){
  localStorage.setItem("saved_game", JSON.stringify(this.gamePassedIn));
  console.log(this.gamePassedIn);
}

GameState.prototype.load = function(){
  this.savedGame =  JSON.parse(localStorage.getItem("saved_game"));
  console.log(this.savedGame);

  if (this.savedGame) {
    this.savedGame.prototype = Object.getPrototypeOf(this.savedGame);
    for (var i = 0; i < this.savedGame.players.length; i++){ /// PROBLEMS
      this.savedGame.players[i].prototype = Object.getPrototypeOf(this.savedGame.players[i]);
    }
    return this.savedGame;
  }
  else{
    this.savedGame = null;
    return this.gamePassedIn;
  }
}

module.exports = GameState;