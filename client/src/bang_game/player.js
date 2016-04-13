var Player = function(name, previousObject){
  this.name = name || "";
  this.character = null;
//player role is set in game model by function 'assign roles' & player character is set in game model by 'assign character'.
  this.role = null;
  this.arrows = 0;
  this.health = null;
  this.maxHealth = null;
  this.dead = false;
  this.target = null;
  this.actionCounters = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0}
  if (previousObject !== undefined) {
      this.rehydrate(previousObject);
  }
};


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

Player.prototype.rehydrate = function(previousObject){
  this.role = previousObject.role
  return this;
}
Player.prototype.healthDifference = function(){
  return this.maxHealth - this.health;
};

Player.prototype.heal = function(){
  if( this.health < this.maxHealth){
    this.health += 1;
  };
};

//////////////////////////////////////////////
///    SHOOT NEEDS REFACTORED - I THINK  /////
//////////////////////////////////////////////
Player.prototype.shoot = function(){
  this.health -= 1;
  if( this.health < 0 ){
    this.health = 0;
  };
  if( this.health <= 0){
    this.dead = true;
  };
};

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