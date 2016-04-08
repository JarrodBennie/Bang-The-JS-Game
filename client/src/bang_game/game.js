var Game = function(players){
  this.players = players;
  this.characters = []
  this.roles = ["Sheriff", "Deputy", "Deputy", "Outlaw", "Outlaw", "Outlaw", "Renegade", "Renegade"]

  var character1 = {
    name: "Jesse Jones",
    health: 9,
    img_small: "",
    img_large: "",
    ability_description: "If you have four life points or less, you gain two if you use [Beer] for yourself."
  };
  var character2 = {
    name: "Kit Carlson",
    health: 7,
    img_small: "",
    img_large: "",
    ability_description: "For each [Gatling] you may discard one arrow from any player."
  };
  var character3 = {
    name: "Black Jack",
    health: 8,
    img_small: "",
    img_large: "",
    ability_description: "You may re-roll [Dynamite]. (Not if you roll three or more!)"
  };
  var character4 = {
    name: "Rose Doolan",
    health: 9,
    img_small: "",
    img_large: "",
    ability_description: "You may use [Shoot 1] or [Shoot 2] for players sitting one place further."
  };
  var character5 = {
    name: "Pedro Ramirez",
    health: 8,
    img_small: "",
    img_large: "",
    ability_description: "Each time you lose a life point, you may discard one of your arrows."
  };
  var character6 = {
    name: "El Gringo",
    health: 7,
    img_small: "",
    img_large: "",
    ability_description: "When a player makes you lose one or more life points, they must take an arrow."
  };
  var character6 = {
    name: "El Gringo",
    health: 7,
    img_small: "",
    img_large: "",
    ability_description: "When a player makes you lose one or more life points, they must take an arrow."
  };
  var character7 = {
    name: "Bart Cassidy",
    health: 8,
    img_small: "",
    img_large: "",
    ability_description: "You may take an arrow instead of losing a life point (except to Arrows or Dynamite)."
  };
  var character8 = {
    name: "Vulture Sam",
    health: 9,
    img_small: "",
    img_large: "",
    ability_description: "Each time another player is eliminated, you gain two life points."
  };
  var character9 = {
    name: "Calamity Janet",
    health: 8,
    img_small: "",
    img_large: "",
    ability_description: "You can use [Shoot 1] as [Shoot 2] and vice-versa."
  };
  var character10 = {
    name: "Jourdonnais",
    health: 7,
    img_small: "",
    img_large: "",
    ability_description: "You never lose more than one life point to Arrows."
  };
  var character11 = {
    name: "Slab the Killer",
    health: 8,
    img_small: "",
    img_large: "",
    ability_description: "Once per turn, you can use a [Beer] to double a [Shoot 1] or [Shoot 2]."
  };
  var character12 = {
    name: "Sid Ketchum",
    health: 8,
    img_small: "",
    img_large: "",
    ability_description: "At the beginning of your turn, any player of your choice gains one life point."
  };
  var character13 = {
    name: "Suzy Lafayette",
    health: 8,
    img_small: "",
    img_large: "",
    ability_description: "If you didn't roll any [Shoot 1] or [Shoot 2] you gain two life points."
  };
  var character14 = {
    name: "Paul Regret",
    health: 9,
    img_small: "",
    img_large: "",
    ability_description: "You never lose life points to the Gatling Gun."
  };
  var character15 = {
    name: "Lucky Duke",
    health: 8,
    img_small: "",
    img_large: "",
    ability_description: "You may mae one extra re-roll"
  };
  var character16 = {
    name: "Willy the Kid",
    health: 8,
    img_small: "",
    img_large: "",
    ability_description: "You only need 2x [Gatling] to use the Gatling Gun."
  };
  this.characters = [character1, character2, character3, character4, character5, character6, character7, character8, character9, character10, character11, character12, character13, character14, character15, character16];
  
  
};

var getUniqueRandomElement = function(array){
  var index = Math.floor((Math.random()*array.length));
  var choice = array[index];
  array.splice(index, 1);
  return choice;
};

Game.prototype.assignRoles = function(){
  for (var i = 0; i < this.players.length; i++){
    this.players[i].role = getUniqueRandomElement(this.roles);
  }
};


Game.prototype.assignCharacters = function(){
  for (var i = 0; i < this.players.length; i++){
    this.players[i].character = getUniqueRandomElement(this.characters);
  };//loop

};

Game.prototype.winConditionCheck = function(){

};




module.exports = Game;
module.exports.randomElement = getUniqueRandomElement;