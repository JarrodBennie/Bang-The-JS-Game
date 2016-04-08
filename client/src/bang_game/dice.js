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

dice = [1,2,3,4,5,6]


Dice.prototype.roll = function(numberOfDice){
  var result = Math.floor(Math.random() * 6) + 1;
  console.log(result)
}

module.exports = Dice;