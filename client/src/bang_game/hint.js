var Hint = function(){
  this.all = [
    "Don't believe Tony's lies.",
    "Beware of the Erik special.",
    "Remember to utilise your character's special ability!",
    "Arrow damage is not dealt until the last arrow is taken and the Indians attack."
    
  ]
}

Hint.prototype.selectOne = function() {
  return this.all.sample();
}

module.exports = Hint;