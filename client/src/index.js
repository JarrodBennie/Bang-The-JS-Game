_ = require('lodash');
Dice = require('./bang_game/dice');
Hint = require('./bang_game/hint');

window.onload = function(){
  // BUTTONS
  var rollDiceButton = document.getElementById('roll-dice-button');
  var healButton = document.getElementById('heal-button');
  var shootButton = document.getElementById('shoot-button');
  var endTurnButton = document.getElementById('end-turn-button');

  // DICE
  var dice1 = document.getElementById('dice-1') || document.getElementById('hidden');
  var dice2 = document.getElementById('dice-2') || document.getElementById('hidden');
  var dice3 = document.getElementById('dice-3') || document.getElementById('hidden');
  var dice4 = document.getElementById('dice-4') || document.getElementById('hidden');
  var dice5 = document.getElementById('dice-5') || document.getElementById('hidden');
  
  // PLAYER LIST
  var players = document.querySelector('player');
  var player1 = document.getElementById('player-1') || document.getElementById('hidden');
  var player2 = document.getElementById('player-2') || document.getElementById('hidden');
  var player3 = document.getElementById('player-3') || document.getElementById('hidden');
  var player4 = document.getElementById('player-4') || document.getElementById('hidden');
  var player5 = document.getElementById('player-5') || document.getElementById('hidden');
  var player6 = document.getElementById('player-6') || document.getElementById('hidden');
  var player7 = document.getElementById('player-7') || document.getElementById('hidden');
  var player8 = document.getElementById('player-8') || document.getElementById('hidden');
  var currentPlayer = document.getElementById('current-player') || document.getElementById('hidden');

  var hint = new Hint;
  var hintElement = document.getElementById('hint');
  hintElement.innerHTML = _.sample(hint.all);

  var dice = new Dice;
  rollDiceButton.onclick = function(){
    rollDice(dice);
  }
  healButton.onclick = function(){
    console.log('You clicked on the heal button!');
  }
  shootButton.onclick = function(){
    console.log('You clicked on the shoot button!');
  }
  endTurnButton.onclick = function(){
    console.log('You clicked on the end turn button!');
  }
  dice1.onclick = function(){
    console.log('You clicked on dice 1!');
  }
  dice2.onclick = function(){
    console.log('You clicked on dice 2!');
  }
  dice3.onclick = function(){
    console.log('You clicked on dice 3!');
  }
  dice4.onclick = function(){
    console.log('You clicked on dice 4!');
  }
  dice5.onclick = function(){
    console.log('You clicked on dice 5!');
  }
  player1.onclick = function(){
    targetPlayer(this);
  }
  player2.onclick = function(){
    targetPlayer(this);
  }
  player3.onclick = function(){
    targetPlayer(this);
  }
  player4.onclick = function(){
    targetPlayer(this);
  }
  player5.onclick = function(){
    targetPlayer(this);
  }
  player6.onclick = function(){
    targetPlayer(this);
  }
  player7.onclick = function(){
    targetPlayer(this);
  }
  player8.onclick = function(){
    targetPlayer(this);
  }
  currentPlayer.onclick = function(){
    console.log('You clicked on the current player!')
  }
}

var rollDice = function(dice){
  var diceElements = document.getElementsByClassName('dice')

  var x = 0

  for (var i = 0; i < dice.saved.length; i++) {
    var currentDice = document.getElementById('dice-'+(x + 1));
    currentDice.src = dice.imageUrl[dice.saved[i]];
    x++
  }
  dice.roll();
  for (var i = 0; i < dice.currentRoll.length; i++){
    currentDice = document.getElementById('dice-'+(x + 1));
    currentDice.src = dice.imageUrl[dice.currentRoll[i]];
    x++
  }
  console.log("saved :", dice.saved);
  console.log("current :", dice.currentRoll);
}

var targetPlayer = function(selection){
  var healthBar = selection.getElementsByClassName('progress')[0];
  var targetedPlayer = document.getElementsByClassName('collection-item avatar player red lighten-4')[0];
  if (targetedPlayer) var targetedHealthBar = targetedPlayer.getElementsByClassName('progress')[0];

  if(targetedPlayer && targetedPlayer != selection){
    targetedPlayer.setAttribute('class', 'collection-item avatar player');
    targetedHealthBar.setAttribute('class', 'progress red lighten-4');
  }
  if(selection.className === "collection-item avatar player"){
    selection.setAttribute('class', 'collection-item avatar player red lighten-4');
    healthBar.setAttribute('class', 'progress white');
  } else {
    selection.setAttribute('class', 'collection-item avatar player');
    healthBar.setAttribute('class', 'progress red lighten-4');
  }
}