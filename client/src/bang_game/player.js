var Player = function(name, previousObject){

  this.name = name || "";
  this.character = null;
//player role is set in game model by function 'assign roles' & player character is set in game model by 'assign character'.
  this.role = null;
  this.arrows = 0;
  this.health = null;
  this.maxHealth = null;
  this.target = null;
  this.actionCounters = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0}
  if (previousObject !== undefined) {
      this.rehydrate(previousObject);
  }
};

Player.prototype.rehydrate = function(previousObject){
    this.name = previousObject.name;
    this.character = previousObject.character;
  //player role is set in game model by function 'assign roles' & player character is set in game model by 'assign character'.
    this.role = previousObject.role;
    this.arrows = previousObject.arrows;
    this.health = previousObject.health;
    this.maxHealth = previousObject.maxHealth;
    this.target = previousObject.target;
    this.actionCounters = previousObject.actionCounters;
  return this;
}

/// add method for player health as a percentage.
/// add guard to stop health going below 0.


// setHealth: run after characters and roles assigned in game model- sets health and max health from value on character card + 2 extra if sheriff.
Player.prototype.setHealth = function(){
  this.maxHealth = this.character.health;
  if( this.role.name === "Sheriff"){
    this.maxHealth += 2
  };
  this.health = this.maxHealth;
};

Player.prototype.healthDifference = function(){
  return this.maxHealth - this.health;
};

// Player.prototype.shootTarget = function(){
//   var counterToDecrement;
//   // REFACTOR THIS - Don't use prototype method directly, filthy...
//   // possible refactor to solve this - move shootTarget to Game model - game always knows who's shooting, it's always the active player (game.players[0])
//   if (this.actionCounters["1"] > 0 && Game.prototype.canShoot1()){
//       counterToDecrement = 1
//   }
//   else if(this.actionCounters["2"] > 0 && Game.prototype.canShoot2()){
//     counterToDecrement = 2
//   }

//   if (this.target){
//     this.target.health -= 1;
//     console.log(this.name + " shot " + this.target.name)
//     this.actionCounters[counterToDecrement.toString()] -= 1;
//   }
//   else{
//     console.log("this is a bug - called shoot function but the button to do that should have been disabled!")
//   }

//   console.log("action counters:", this.actionCounters)

// };

//////// THIS COULD WORK HERE BUT WE HAVE MOVED IT TO GAME AS IT IS NICER- ITS NOW WITH SHOOT. //////////////
// Player.prototype.beerTarget = function(){
//   if (this.target && this.target.health < this.target.maxHealth){
//     this.target.health += 1;
//     console.log(this.name + " beer'd " + this.target.name)
//   }
//   else{
//     console.log("you don't have a target (who needs health) to beer!")
//   }
// };

Player.prototype.addName = function(name){
  this.name = name;
}

Player.prototype.healthAsPercentage = function(){
  return ( (this.health/this.maxHealth) * 100);
}

Player.prototype.healthAsPercentageDisplay = function(){
  var insert = this.healthAsPercentage();
  return "width: " + insert + "%";
}




module.exports = Player;