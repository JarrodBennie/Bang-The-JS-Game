var Player = function(name){
  this.name = name;
  this.character = null;
//player role is set in game model by function 'assign roles' & player character is set in game model by 'assign character'.
  this.role = null;
  this.arrows = 0;
  this.health = 5;
  //// just set as 5 for now -  before the game starts (after game.assignCharacters) will have a function that sets starting & max health to equal the health value of the character card. also means if player somehow not assigned card then will have default 5 health.
};

Player.prototype.setHealth = function(){
  this.health = this.character.health
};

// Player.prototype.add(  )





module.exports = Player;