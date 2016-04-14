var Player = require("./player.js");

var Game = function(dice, players, characterBasedMaxHealth, previousObject, hydratedAllPlayers){
  this.characterBasedMaxHealth = characterBasedMaxHealth;
  this.players = players;
  if (!characterBasedMaxHealth){
    for (var i = 0; i < this.players.length; i++){
      this.players.maxHealth = 8;
    }
  }
  if (hydratedAllPlayers !== undefined){
    this.allPlayers = hydratedAllPlayers;
  }
  else{
    this.allPlayers = [];
  }
  this.characters = [];
  this.totalArrows = 9;
  this.dice = dice;
  this.wonBy = null;
  if (previousObject !== undefined) {
      this.rehydrate(previousObject);
  }
  this.roles = [{name:"Sheriff", imgUrl: "http://i.imgur.com/yYT038yb.jpg"}, {name:"Deputy", imgUrl: "http://i.imgur.com/6HHgfPab.jpg"}, {name:"Deputy", imgUrl: "http://i.imgur.com/6HHgfPab.jpg"}, {name:"Outlaw", imgUrl: "http://i.imgur.com/NoWerAnb.jpg"}, {name:"Outlaw", imgUrl: "http://i.imgur.com/NoWerAnb.jpg"}, {name:"Outlaw", imgUrl: "http://i.imgur.com/NoWerAnb.jpg"}, {name:"Renegade", imgUrl: "http://i.imgur.com/TNeqBpnb.jpg"}, {name:"Renegade", imgUrl: "http://i.imgur.com/TNeqBpnb.jpg"}];
  var character1 = {
    name: "Jesse Jones",
    health: 9,
    imgUrl: "http://i.imgur.com/bRkKXmX.png",
    abilityDescription: "If you have four life points or less, you gain two if you use Beer for yourself."
  };
  var character2 = {
    name: "Kit Carlson",
    health: 7,
    imgUrl: "http://i.imgur.com/BZIfBge.png",
    abilityDescription: "For each Gatling you may discard one arrow from any player."
  };
  var character3 = {
    name: "Black Jack",
    health: 8,
    imgUrl: "http://i.imgur.com/KUrKkis.png",
    abilityDescription: "You may re-roll Dynamite. (Unless you roll three or more!)"
  };
  var character4 = {
    name: "Rose Doolan",
    health: 9,
    imgUrl: "http://i.imgur.com/Hdcp0p1.png",
    abilityDescription: "You may use Bullseye 1 or Bullseye 2 for players sitting one place further."
  };
  var character5 = {
    name: "Pedro Ramirez",
    health: 8,
    imgUrl: "http://i.imgur.com/WcU2f2w.png",
    abilityDescription: "Each time you lose a life point, you may discard one of your arrows."
  };
  var character6 = {
    name: "El Gringo",
    health: 7,
    imgUrl: "http://i.imgur.com/OF8OH13.png",
    abilityDescription: "When a player makes you lose one or more life points, they must take an arrow."
  };
  var character7 = {
    name: "Bart Cassidy",
    health: 8,
    imgUrl: "http://i.imgur.com/e8oZGYx.png",
    abilityDescription: "You may take an arrow instead of losing a life point (except to Arrows or Dynamite)."
  };
  var character8 = {
    name: "Vulture Sam",
    health: 9,
    imgUrl: "http://i.imgur.com/1HkWchT.png",
    abilityDescription: "Each time another player is eliminated, you gain two life points."
  };
  var character9 = {
    name: "Calamity Janet",
    health: 8,
    imgUrl: "http://i.imgur.com/OY1CiiX.png",
    abilityDescription: "You can use Bullseye 1 as Bullseye 2 and vice-versa."
  };
  var character10 = {
    name: "Jourdonnais",
    health: 7,
    imgUrl: "http://i.imgur.com/tXiiB6L.png",
    abilityDescription: "You never lose more than one life point to Arrows."
  };
  var character11 = {
    name: "Slab the Killer",
    health: 8,
    imgUrl: "http://i.imgur.com/hlVk73M.png",
    abilityDescription: "Once per turn, you can use a Beer to double a Bullseye 1 or Bullseye 2."
  };
  var character12 = {
    name: "Sid Ketchum",
    health: 8,
    imgUrl: "http://i.imgur.com/cXVoKTA.png",
    abilityDescription: "At the beginning of your turn, any player of your choice gains one life point."
  };
  var character13 = {
    name: "Suzy Lafayette",
    health: 8,
    imgUrl: "http://i.imgur.com/KfiWFxk.png",
    abilityDescription: "If you didn't roll any Bullseye 1 or Bullseye 2 you gain two life points."
  };
  var character14 = {
    name: "Paul Regret",
    health: 9,
    imgUrl: "http://i.imgur.com/UFADg9e.png",
    abilityDescription: "You never lose life points to the Gatling Gun."
  };
  var character15 = {
    name: "Lucky Duke",
    health: 8,
    imgUrl: "http://i.imgur.com/F6GioiG.png",
    abilityDescription: "You may make one extra re-roll"
  };
  var character16 = {
    name: "Willy the Kid",
    health: 8,
    imgUrl: "http://i.imgur.com/580j9rS.png",
    abilityDescription: "You only need 2 Gatling to use the Gatling Gun."
  };
  this.characters = [character1, character2, character3, character4, character5, character6, character7, character8, character9, character10, character11, character12, character13, character14, character15, character16];


};

var getUniqueRandomElement = function(array){
  var index = Math.floor((Math.random()*array.length));
  var choice = array[index];
  array.splice(index, 1);
  return choice;
};

Game.prototype.rehydrate = function(previousObject){
  this.characterBasedMaxHealth = previousObject.characterBasedMaxHealth;
  // if (!this.characterBasedMaxHealth){
  //   for (var i = 0; i < this.players.length; i++){
  //     this.players[i].maxHealth = 8;
  //   }
  // }
  this.totalArrows = previousObject.totalArrows;
  this.wonBy = previousObject.wonBy;
  console.log(this.players);

  // this.allPlayers = originalOrderPlayers;
}


Game.prototype.setup = function(){
  this.assignRoles();
  this.assignCharacters();
  this.setAllHealth();
  this.savePlayers();
  this.rotateSheriffToFirst();
};

Game.prototype.rotateSheriffToFirst = function(){
  var sheriffIndex;
  for (var i = 0; i < this.players.length; i++){
    if (this.players[i].role.name === "Sheriff"){
      sheriffIndex = i;
    }
  }
  this.rotatePlayers(sheriffIndex);
};

Game.prototype.setAllHealth = function(){
  for (var i = 0; i < this.players.length; i++){
    this.players[i].setHealth();
  }
};

Game.prototype.assignRoles = function(){
  for (var i = 0; i < this.players.length; i++){
    this.players[i].role = getUniqueRandomElement(this.roles);
  };
};


Game.prototype.assignCharacters = function(){
  for (var i = 0; i < this.players.length; i++){
    this.players[i].character = getUniqueRandomElement(this.characters);
  };//loop
};

Game.prototype.savePlayers = function(){
  if (this.players.length === 8) {
    this.allPlayers = this.players.slice();
  };
};

Game.prototype.rotatePlayers = function(numSteps){
  // rotates the array the number of times that is passed as an argument
  // if no argument is passed, the OR operator will set loops to 1 as numSteps will be undefined, which is falsey
  var loops = numSteps;

  if (numSteps === undefined) {
    loops = 1;
  }
  // ^ this could have been written:
  // - which might be better - passing 0 in deliberately would cause the loops to be set to 1, not 0, when using the OR operator method above - but there's no need to ever rotate the players array 0 times
  // if (numSteps === undefined){
  //   var loops = 1;
  // }
  // else{
  //   var loops = numSteps;
  // };

  for (var i = 0; i < loops; i++){
    //2nd array item becomes first - first becomes last:
    this.players.push(this.players.shift());
    // alternative to rotate the other way:
    // last array item becomes first - first becomes 2nd:
    // this.players.unshift(this.players.pop());
  };
};

Game.prototype.dynamiteExplodes = function(){
  if (this.dice.threeDynamite()){
    this.players[0].health -= 1;
  }
};

Game.prototype.nextTurn = function(currentPlayerDead, gameState){

  ////////////////////////////////////////////////////
  // Adam has stuff to add to this function         //
  ////////////////////////////////////////////////////

  this.checkForDeaths();
  if(this.winCheck()){
    this.end(this.winCheck());
  }

  var rotateSteps;
  if (currentPlayerDead === undefined || currentPlayerDead === false){
    rotateSteps = 1;
  }
  else {
    rotateSteps = 0
  }

  this.dice.reset();
  this.rotatePlayers(rotateSteps);
  for (var i = 0; i < this.players.length;i++){
    this.players[i].target = null;
  }
  gameState.save(); // save state of the game at another time without resetting dice and rotating players and in theory we could possibly continue the turn with the dice and rerolls remembered
  // updateDisplayForNewTurn function here (grey out and remove onclicks for dead players - reset buttons etc.)

  // add any other function calls for stuff that needs to happen every time a new turn starts
};

Game.prototype.end = function(winCheckResult){
  Materialize.toast(winCheckResult, 3000);
  window.alert(winCheckResult);
};


// checks if any players have 0 health - and call the game.removePlayer(player) function on them if so
Game.prototype.checkForDeaths = function(){
  for (var i = 0; i < this.players.length; i++){
    if (this.players[i].health <= 0){
      this.removePlayer(this.players[i]);
    }// "if health is 0" conditional [end]
  };// for loop [end]
  return this.players;
};

Game.prototype.removePlayer = function(player){
  this.players.splice(this.players.indexOf(player), 1);
  return this.players;
};

Game.prototype.winCheckOutlaws = function(){
  console.log("outlaw wincheck  checking if array empty - players array length:", this.players.length);
  if (this.players.length === 0){
    console.log("game.players.length is 0 - winCheckOutlaws is returning an Outlaw victory");
    return "Outlaws win!"
  };
  console.log("loops through players array:", this.players, "length:", this.players.length);
  for (var i = 0; i < this.players.length; i++){
    console.log("index:", i, "role:", this.players[i].role.name);
    if (this.players[i].role.name === "Sheriff") {
      console.log("index:", i, "role found:", this.players[i].role.name);
      console.log("sheriff found, returning null from outlaw wincheck");
      return null;
    }
  }
  console.log("returning outlaws win because no sheriff found ??");
  return "Outlaws win!"
};// winConditionOutlaw [end]

Game.prototype.winCheckSheriff = function(){
  var sheriffLives = false;
  var outlawsDead = true;
  var renegadesDead = true;
  for (var i = 0; i < this.players.length;i++){
    if (this.players[i].role.name === "Sheriff"){
      var sheriffLives = true;
    }
    else if (this.players[i].role.name === "Outlaw"){
      outlawsDead = false;
    }
    else if (this.players[i].role.name === "Renegade"){
      renegadesDead = false;
    }
  };// loop end
  if (sheriffLives && outlawsDead && renegadesDead){
    return "Sheriff wins!";
  }
  else{
    return null;
  }

};

Game.prototype.winCheckRenegade = function(){
  if (this.players.length === 1 && this.players[0].role.name === "Renegade") {
    return "Renegade wins!"
  }
  else{
    return null;
  };
};

Game.prototype.winCheck = function(){
  //all win conditions checked in appropriate order

  // the if else if statement for renegade and outlaw is important, as if the sheriff is dead, the winCheckOutlaws function returns and outlaws win - this is often correct - but if a single renegade is alive, and just killed the sheriff - then the renegade wins - so we have to check if the renegade should win first, before reverting to checking if outlaws should win in the far more common case that the renegade is not the only player left alive.

  if (this.winCheckSheriff()){
    this.wonBy = "Sheriff";
    return this.winCheckSheriff();
  };

  var outlawCheckResult = this.winCheckOutlaws()
  var renegadeCheckResult = this.winCheckRenegade();

  if (renegadeCheckResult){
    this.wonBy = "Renegade";
    return renegadeCheckResult;
  }
  else if (outlawCheckResult){
    this.wonBy = "Outlaws";
    return outlawCheckResult;
  }
  return null;
};


Game.prototype.resolveArrows = function(){
  for (var i = 0; i < this.dice.arrowsRolled; i++){
    this.players[0].arrows += 1;
    this.totalArrows -= 1;
    console.log("you got an arrow");
    if (this.totalArrows === 0){
      this.removeHealthAndArrows();
      this.totalArrows = 9;
      console.log("arrows in!");
    }

  };

};

Game.prototype.removeHealthAndArrows = function(){
  for (var i = 0; i < this.players.length; i++){
    this.players[i].health -= this.players[i].arrows;
    this.players[i].arrows = 0;
  };
};






// create players and game before players have name, add names from form (on first turn?)
// API class to get char (+ role?) + statsData from DB/ our API
// AI - array of players suspected of being on its team - based on who heals / shoots the sheriff
// set of numbers of probability, one for each player being on each team based on actions
//requires log / stats class to check other players actions
// decisions - manually trigger click events


/// 2 - work out how far away other players are from you game.players.length -1 & game.players.length -2 for index 6 & 7.


Game.prototype.addToActionCounters = function(){
  this.players[0].actionCounters = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0}
  for( var i of this.dice.all){
    this.players[0].actionCounters[i.toString()] += 1;
  };
};
///// counts how many of each dice result (arrow, beer etc) and saves this to the players actionsCounters.


//// function to know if we should light up/make clickable the shoot button

// var checkRangeToTarget = function(){
//   if (game.players[0].actionCounters["1"]){
//     game.canShoot(1)
//   }
//   if (game.players[0].actionCounters["2"]){
//     game.canShoot(2)
//   }
// }

Game.prototype.canHeal = function(){
  if (this.players[0].actionCounters["3"] > 0 ) {
    return true;
  }
    else {
      return false;
  }
}

Game.prototype.canShoot1 = function(){
  if ( this.players[0].actionCounters["1"] > 0 && (this.players[0].target === this.players[1] || this.players[0].target === this.players[this.players.length - 1] ) ) {
    return true;
  }
  else{
    return false;
  }
}

Game.prototype.canShoot2 = function(){
  if ( this.players[0].actionCounters["2"] > 0 && (this.players[0].target === this.players[2] || this.players[0].target === this.players[this.players.length - 2] ) ){
    return true;
  }
  else{
    return false;
  }
}

Game.prototype.threeGatling = function(){
  var counter = 0;
  for( item of this.dice.all ){
    if( item === 4 ) {
      counter++;
    };
  };
  if ( counter >= 3 ) {
    for(var i = 1; i < this.players.length; i++){
      this.players[i].health -= 1;
    };
    Materialize.toast(this.players[0].name + " Used gatling!", 2000);
  };
};

Game.prototype.shootTarget = function(){
  var counterToDecrement;
  // REFACTOR THIS - Don't use prototype method directly, filthy...
  // possible refactor to solve this - move shootTarget to Game model - game always knows who's shooting, it's always the active player (game.players[0])
  if (this.players[0].actionCounters["1"] > 0 && this.canShoot1()){
      counterToDecrement = 1
  }
  else if(this.players[0].actionCounters["2"] > 0 && this.canShoot2()){
    counterToDecrement = 2
  }

  if (this.players[0].target){
    this.players[0].target.health -= 1;
    console.log(this.players[0].name + " shot " + this.players[0].target.name)
    this.players[0].actionCounters[counterToDecrement.toString()] -= 1;
  }
  else{
    console.log("this is a bug - called shoot function but the button to do that should have been disabled!")
  }

  console.log("action counters:", this.players[0].actionCounters)

};

Game.prototype.beerTarget = function(){
  if (this.players[0].target){
    this.players[0].target.health += 1;
    if(this.players[0].target.health > this.players[0].target.maxHealth){
      this.players[0].target.health = this.players[0].target.maxHealth
    }
    this.players[0].actionCounters["3"] -= 1;
    console.log(this.players[0].name + " beer'd " + this.players[0].target.name)
  }
  else{
    console.log("you don't have a target (who needs health) to beer!")
  }
};

Game.prototype.checkActions = function(){
  var counter = 0;
  for(var i = 1; i < 4; i++){

    if(this.players[0].actionCounters[i.toString()] > 0){
      counter += this.players[0].actionCounters[i.toString()]
    }
  }
    return counter;
}

Game.prototype.dynamiteExplodes = function(){
 if (this.dice.threeDynamite()){
   this.players[0].health -= 1;
   Materialize.toast("Boom!", 2000);
 }
};

  module.exports = Game;
  module.exports.randomElement = getUniqueRandomElement;
