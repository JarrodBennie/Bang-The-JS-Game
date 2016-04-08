var Dice = function(){
  this.meaningOf = {
    1: "Shoot 1",
    2: "Shoot 2",
    3: "Beer",
    4: "Gatling",
    5: "Dynamite",
    6: "Arrow"
  };
};


Dice.prototype.roll = function(numberOfDice){
  var rollsArray = [];
  for( var i=0; i<numberOfDice; i++){
    var result = Math.floor(Math.random() * 6) + 1;
    rollsArray.push( result );
  };
  return rollsArray;
};

module.exports = Dice;