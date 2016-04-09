var Dice = function(){
  this.currentRoll = [];
  this.saved = [];
  this.arrowsRolled = 0;

  this.meaningOf = {
    1: "Shoot 1",
    2: "Shoot 2",
    3: "Beer",
    4: "Gatling",
    5: "Dynamite",
    6: "Arrow"
  };
};

//// Will need to reset the dice between change of player turn - use reset below.
Dice.prototype.reset = function(){
  this.saved = [];
  this.arrowsRolled = 0;
}

Dice.prototype.roll = function(){
  this.currentRoll = [];
  var numberOfDiceToRoll = 5 - this.saved.length;
  for( var i=0; i < numberOfDiceToRoll; i++){
    var result = Math.floor(Math.random() * 6) + 1;
    this.currentRoll.push( result );
  };
  this.saveDynamite();
  this.countArrows();
  return this.currentRoll;
};
//// for special cards could add in above: if( playerSpecialAbility != [the special ability that lets you re-roll dynamite]){ this.saveDynamite } so save dynamite happens to everyone except the player with the special card. but it wont know what player - so would have to pass in the player object - dice.save(player1) seems a bit ugly but would allow us to check player special card.

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




module.exports = Dice;