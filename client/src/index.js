_ = require('lodash');
Dice = require('./bang_game/dice');
Hint = require('./bang_game/hint');

window.onload = function(){
  // TARGET BUTTONS
  var rollDiceButton = document.getElementById('roll-dice-button'),
  healButton = document.getElementById('heal-button'),
  shootButton = document.getElementById('shoot-button'),
  endTurnButton = document.getElementById('end-turn-button');

  // TARGET DICE IMAGES
  var dice1 = document.getElementById('dice-1') || document.getElementById('hidden'),
  dice2 = document.getElementById('dice-2') || document.getElementById('hidden'),
  dice3 = document.getElementById('dice-3') || document.getElementById('hidden'),
  dice4 = document.getElementById('dice-4') || document.getElementById('hidden'),
  dice5 = document.getElementById('dice-5') || document.getElementById('hidden'),
  diceElements = [dice1, dice2, dice3, dice4, dice5];
  
  // TARGET PLAYER LIST
  var player1 = document.getElementById('player-1') || document.getElementById('hidden'),
  player2 = document.getElementById('player-2') || document.getElementById('hidden'),
  player3 = document.getElementById('player-3') || document.getElementById('hidden'),
  player4 = document.getElementById('player-4') || document.getElementById('hidden'),
  player5 = document.getElementById('player-5') || document.getElementById('hidden'),
  player6 = document.getElementById('player-6') || document.getElementById('hidden'),
  player7 = document.getElementById('player-7') || document.getElementById('hidden'),
  player8 = document.getElementById('player-8') || document.getElementById('hidden'),
  currentPlayer = document.getElementById('current-player') || document.getElementById('hidden');

  // DISPLAY HINT CARD
  var hint = new Hint,
  hintElement = document.getElementById('hint');
  hintElement.innerHTML = _.sample(hint.all);

  // EVENT LISTENERS
  // BUTTONS
  var dice = new Dice(diceElements);
  rollDiceButton.onclick = function(){
    diceClickEnable();
    rollDice(dice);
    if(dice.rolls === 0 || dice.threeDynamite()){
      this.onclick = null;
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    }
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
  // DICE
  var diceClickEnable = function(){
    dice1.style.opacity = 1;
    dice2.style.opacity = 1;
    dice3.style.opacity = 1;
    dice4.style.opacity = 1;
    dice5.style.opacity = 1;

    dice1.onclick = function(){
      var dice1Value = dice.all[0];
      if(dice1Value != 5) dice.save(dice1Value);
      dice1.onclick = null;
      dice1.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton);
      console.log('You clicked on dice 1!');
    }
    dice2.onclick = function(){
      var dice2Value = dice.all[1];
      if(dice2Value != 5) dice.save(dice2Value);
      dice2.onclick = null;
      dice2.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton);
      console.log('You clicked on dice 2!');
    }
    dice3.onclick = function(){
      var dice3Value = dice.all[2];
      if(dice3Value != 5) dice.save(dice3Value);
      dice3.onclick = null;
      dice3.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton);
      console.log('You clicked on dice 3!');
    }
    dice4.onclick = function(){
      var dice4Value = dice.all[3];
      if(dice4Value != 5) dice.save(dice4Value);
      dice4.onclick = null;
      dice4.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton);
      console.log('You clicked on dice 4!');
    }
    dice5.onclick = function(){
      var dice5Value = dice.all[4];
      if(dice5Value != 5) dice.save(dice5Value);
      dice5.onclick = null;
      dice5.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton);
      console.log('You clicked on dice 5!');
    }
  }
  diceClickEnable();
  // PLAYER LIST
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

// ROLL DICE BUTTON
var rollDice = function(dice){
  var counter = 0;
  // DISPLAY SAVED DICE
  for (var i = 0; i < dice.saved.length; i++) {
    var currentDice = document.getElementById('dice-'+(counter + 1));
    currentDice.src = dice.imageUrl[dice.saved[i]];
    counter++
  }
  // ROLL DICE
  dice.roll();
  // DISPLAY CURRENT ROLL
  for (var i = 0; i < dice.currentRoll.length; i++){
    currentDice = document.getElementById('dice-'+(counter + 1));
    currentDice.src = dice.imageUrl[dice.currentRoll[i]];
    if(dice.currentRoll[i] === 5) currentDice.style.opacity = 0.5;
    if(dice.saved.length === 5) currentDice.style.opacity = 1;
    counter++
  }
  // DEBUGGING
  console.log("saved :", dice.saved);
  console.log("current :", dice.currentRoll);
}


// SELECT PLAYER FROM LIST
var targetPlayer = function(selection){
  // TARGET HEALTH BAR OF SELECTED PLAYER
  var healthBar = selection.getElementsByClassName('progress')[0];
  // TARGET PREVIOUSLY SELECTED PLAYER
  var targetedPlayer = document.getElementsByClassName('collection-item avatar player red lighten-4')[0];
  // TARGET HEALTH BAR OF PREVIOUSLY SELECTED PLAYER
  if (targetedPlayer) var targetedHealthBar = targetedPlayer.getElementsByClassName('progress')[0];

  // RESET PREVIOUSLY SELECTED PLAYER COLOURS
  if(targetedPlayer && targetedPlayer != selection){
    targetedPlayer.setAttribute('class', 'collection-item avatar player');
    targetedHealthBar.setAttribute('class', 'progress red lighten-4');
  }
  // IF SELECTED PLAYER IS CURRENTLY UNSELECTED, SELECT THEM
  if(selection.className === "collection-item avatar player"){
    selection.setAttribute('class', 'collection-item avatar player red lighten-4');
    healthBar.setAttribute('class', 'progress white');
  }
  // IF SELECTED PLAYER IS CURRENTLY SELECTED, DESELECT THEM
  else {
    selection.setAttribute('class', 'collection-item avatar player');
    healthBar.setAttribute('class', 'progress red lighten-4');
  }
}

var endGame = function(gameResult){
  // TRIGGER END GAME MODAL
  // DISABLE BUTTONS
}

var savedDiceFull = function(dice, diceElements, rollDiceButton){
  if(dice.saved.length === 5){
    for (var i = 0; i < diceElements.length; i++){
      diceElements[i].style.opacity = 1;
    }
    rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
  }
}