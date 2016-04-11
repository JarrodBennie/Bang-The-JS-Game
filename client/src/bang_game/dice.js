var _ = require('lodash');

var Dice = function(){
  this.currentRoll = [];
  this.saved = [];
  this.all = [];
  this.arrowsRolled = 0;

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
    1: "http://i.imgur.com/j32ofq3.png",
    2: "http://i.imgur.com/AR0V71o.png",
    3: "http://i.imgur.com/TWQYd4q.png",
    4: "http://i.imgur.com/0q1hvpf.png",
    5: "http://i.imgur.com/ygbg1Fg.png",
    6: "http://i.imgur.com/pUn7Uru.png"
  }; 
};



//// Will need to reset the dice between change of player turn - use reset below.
Dice.prototype.reset = function(){
  this.saved = [];
  this.arrowsRolled = 0;
}

Dice.prototype.roll = function(){
  this.currentRoll = [];
  for( var dice of this.saved){
    this.all.push( dice );
  };
  var numberOfDiceToRoll = 5 - this.saved.length;
  for( var i = 0; i < numberOfDiceToRoll; i++){
    var result = Math.floor(Math.random() * 6) + 1;

    this.currentRoll.push( result );
    this.all.push( result );
  };
  this.saveDynamite();
  this.countArrows();
  return this.currentRoll;
};
//// for special cards could add in above: if( playerSpecialAbility != [the special ability that lets you re-roll dynamite]){ this.saveDynamite } so save dynamite happens to everyone except the player with the special card. but it wont know what player - so would have to pass in the player object - dice.save( 0, player1) seems a bit ugly but would allow us to check player special card.

Dice.prototype.save = function( index ){
  this.saved.push( this.currentRoll[ index ]);
};

Dice.prototype.saveDynamite = function(){
  for( var item of this.currentRoll){
    if( item === 5){
      var indexOfDynamite = this.currentRoll.indexOf( item );
      this.save( indexOfDynamite );
    };
  };
};
//// could use dice.currentRoll and dice.saved and loop through each checking if 3 dynamite, 3 gatling, and how many arrows. Return true if 3 dynamite/gatling.  In game can do if(dice.threeDynamite){ the run the function to take life off player and run the function to end player turn/start new player turn }    ----  could also do if(dice.threeGatling){ shoot all players & set current player arrows = 0 }.
Dice.prototype.threeDynamite = function(){
  var result = false;
  var counter = 0;
  for( var number of this.currentRoll){
    if( number === 5){
      counter ++;
    };
  };
  for( var number of this.saved){
    if( number === 5){
      counter ++;
    };
  };
  if( counter >= 3){
    result = true;
  };
  return result;
};

Dice.prototype.threeGatling = function(){
  var result = false;
  var counter = 0;
  for( item of this.saved){
    if( item === 4 ){
      counter++;
    };
  };
  if(counter >= 3){
    result = true;
  };
  return result;
};

Dice.prototype.countArrows= function(){
  for( item of this.currentRoll){
    if( item === 6){
      this.arrowsRolled += 1;
    };
  };
};
//// by saving number of arrows - in game model before each roll we can run a 'resolve arrows' function that will add dice.arrowsRolled to players total arrows and subtract dice.arrows rolled from total arrows left in middle.

//// Could possibly add in counter for each result/outcome of dice (from this.currentRoll) so that we have a total record of each thing rolled by a player that we can then send to database and we'd have stats of what each player did during game for 'review of game page' at end.


module.exports = Dice;