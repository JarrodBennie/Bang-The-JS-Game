var Player = function(name){
  this.name = name || "";
  this.character = null;
//player role is set in game model by function 'assign roles' & player character is set in game model by 'assign character'.
  this.role = null;
  this.arrows = 0;
  this.health = null;
  this.maxHealth = null;
  this.dead = false;
};

/// add method for player health as a percentage.
/// add guard to stop health going below 0.


// setHealth: run after characters and roles assigned in game model- sets health and max health from value on character card + 2 extra if sheriff.
Player.prototype.setHealth = function(){
  this.maxHealth = this.character.health;
  if( this.role === "Sheriff"){
    this.maxHealth += 2
  };
  this.health = this.maxHealth;
};

Player.prototype.heal = function(){
  if( this.health < this.maxHealth){
    this.health += 1;
  };
};

Player.prototype.shoot = function(){
  this.health -= 1;
  if( this.health < 0 ){
    this.health = 0;
  };
  if( this.health <= 0){
    this.dead = true;
  };
};

Player.prototype.removeHealthPerArrow = function(){
  this.health -= this.arrows;
  this.arrows = 0;
};

Player.prototype.addName = function(name){
  this.name = name;
}





module.exports = Player;