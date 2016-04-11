var Player = function(name){
  this.name = name;
  this.character = null;
//player role is set in game model by function 'assign roles' & player character is set in game model by 'assign character'.
  this.role = null;
  this.arrows = 0;
  this.health = null;
  this.maxHealth = null;
  this.dead = false;
};



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
  if( this.health <= 0){
    this.dead = true;
  };
};

Player.prototype.removeHealthPerArrow = function(){
  this.health -= this.arrows;
  this.arrows = 0;
};





//////   IDEAS FOR GAME MODEL - didnt want to risk merge conflicts so I just wrote my ideas here until we catch up as a team.

// should be a function in game that runs at end of each turn that adds dice.arrowsRolled to player.arrows, and takes dice.arrowsRolled away from total arrows in game( then an if statement: if total arrows in game <= 0: run function to take life off all players with arrows, then reset total arrows in game eg = 10). (see game.updateArrows below - to be run after every roll) 
// if move code above to game model, need to change 'game.' to 'this.'

////// at end of each turn in game do loop of players and check if player.dead = true. if so cut out of game some how - pop/splice from array?


// FRONT END: when player dies must display role card

module.exports = Player;