var Player = function(name){
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

Player.prototype.healthDifference = function(){
  return this.maxHealth - this.health;
}

Player.prototype.shootTarget = function(){
  if (this.target){
    this.target.health -= 1;
    console.log(this.name + " shot " + this.target.name)
  }
  else{
    console.log("you don't have a target to shoot!")
  }
};

Player.prototype.beerTarget = function(){
  if (this.target && this.target.health < this.target.maxHealth){
    this.target.health += 1;
    console.log(this.name + " beer'd " + this.target.name)
  }
  else{
    console.log("you don't have a target (who needs health) to beer!")
  }
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