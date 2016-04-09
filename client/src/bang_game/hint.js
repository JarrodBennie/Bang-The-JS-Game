var Hint = function(){
  this.all = [
    "Don't believe Tony's lies.",
    "Beware of the Erik special.",
    "Don't forget to use your character's special ability!",
  ]
}

Hint.prototype.selectOne = function() {
  return this.all.sample();
}

module.exports = Hint;