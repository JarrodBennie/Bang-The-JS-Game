var Dice = function(previousObject){
  this.currentRoll = [];
  this.saved = [];
  this.all = [];
  this.arrowsRolled = 0;
  this.rolls = 3;
//// INFO ABOUT ABOVE:
//// this.currentRoll - the result of the dice from the player's last roll
//// this.saved - the dice that the player will not re-roll
//// this.all - an array that is the same as the dice that are being displayed in the browser. It is made of the dice the player didnt re-roll and the remaining dice after they have been rolled. ( this.saved + this.currentRoll after new numbers have been generated)  Used for event listener so can use index position. the dice that are being displayed in the browser come from looping through 2 arrays(saved and currentRoll- so that saved dice wont spin) so dont have proper index positions without this.all

  this.meaningOf = {
    1: "Shoot 1",
    2: "Shoot 2",
    3: "Beer",
    4: "Gatling",
    5: "Dynamite",
    6: "Arrow"
  };

  this.imageUrl = {
    1: "https://i.imgur.com/j32ofq3.png",
    2: "https://i.imgur.com/AR0V71o.png",
    3: "https://i.imgur.com/TWQYd4q.png",
    4: "https://i.imgur.com/0q1hvpf.png",
    5: "https://i.imgur.com/ygbg1Fg.png",
    6: "https://i.imgur.com/pUn7Uru.png"

  }; 
  
  if (previousObject !== undefined) {
    this.rehydrate(previousObject);
  }
};

Dice.prototype.rehydrate = function(previousObject){
  this.currentRoll = previousObject.currentRoll;
  this.saved = previousObject.saved;
  this.all = previousObject.all;
  // this.arrowsRolled = previousObject.arrowsRolled;
  this.rolls = previousObject.rolls;
  return this;
}

//// Will need to reset the dice between change of player turn - use reset below.
Dice.prototype.reset = function(){
  this.currentRoll = [];
  this.saved = [];
  this.all = [];
  this.arrowsRolled = 0;
  this.rolls = 3;
}

Dice.prototype.roll = function(){
  this.arrowsRolled = 0;
  if (this.canRoll() === false) return;
  this.currentRoll = [];
  var numberOfDiceToRoll = 5 - this.saved.length;

  for (var i = 0; i < numberOfDiceToRoll; i++){
    var result = Math.floor( Math.random() * 6 ) + 1;
    this.currentRoll.push( result );
  };
  // console.log("Dice rolled:", this.currentRoll);

  this.saveDynamite();
  
  this.all = this.saved.concat( this.currentRoll )

  this.countArrows();
  this.rolls--;
  return this.currentRoll;
};

//// for special cards could add in above: if( playerSpecialAbility != [the special ability that lets you re-roll dynamite]){ this.saveDynamite } so save dynamite happens to everyone except the player with the special card. but it wont know what player - so would have to pass in the player object - dice.save( 0, player1) seems a bit ugly but would allow us to check player special card.

Dice.prototype.countArrows= function(){
  for( var i = 0; i < this.currentRoll.length; i++ ){
    if( this.currentRoll[i] === 6 ) {
      this.arrowsRolled++;
    }
  }
};

Dice.prototype.save = function(value){
  if (this.saved.length < 5) this.saved.push(value);
};
Dice.prototype.saveDynamite = function(){
  var i = this.currentRoll.length -1 
  for (i; i >= 0; i--){
    if( this.currentRoll[i] === 5) this.save(this.currentRoll.splice(i, 1)[0]);
    // console.log("save dyna - saved:", this.saved, " current:", this.currentRoll);
  }
};
Dice.prototype.threeDynamite = function(){
  var counter = 0;
  for (var i = 0; i < this.all.length; i++ ){
    if (this.all[i] === 5) counter++;
  }
  return (counter >= 3);
};
Dice.prototype.canRoll = function(){
  if( this.rolls === 0 ) return false;
  if( this.saved.length === 5 ) return false;
  if( this.threeDynamite() ) return false;
  return true;
};

//// Could possibly add in counter for each result/outcome of dice (from this.currentRoll) so that we have a total record of each thing rolled by a player that we can then send to database and we'd have stats of what each player did during game for 'review of game page' at end.

module.exports = Dice;