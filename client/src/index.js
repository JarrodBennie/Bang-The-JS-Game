_ = require('lodash');
Game = require('./bang_game/game');
Player = require('./bang_game/player');
Dice = require('./bang_game/dice');
Hint = require('./bang_game/hint');

// NEWING UP OBJECTS
// var game = new Game();
// var player = new Player();
var dice = new Dice;
var hint = new Hint;

window.onload = function(){
  var players = new Array(8);

  for (var i = 0; i < players.length; i++){
    players[i] = new Player("Player " + (i+1) )
  }

  var dice = new Dice();
  var game = new Game(dice, players);
  game.setup();
  
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

  // POPULATE CURRENT PLAYER
  var currentPlayerAvatar = document.getElementById('current-player-avatar');
  var currentPlayerNameRole = document.getElementById('current-player-name-character');
  var currentPlayerCharacter = document.getElementById('current-player-character');
  var currentPlayerAbility = document.getElementById('current-player-ability');
  var sheriffIcon = document.getElementById('sheriff-icon');
  
  currentPlayerAvatar.src = game.players[0].character.imgUrl;
  currentPlayerNameRole.innerHTML = "<b>" + game.players[0].name + "</b> - " + game.players[0].character.name;
  currentPlayerCharacter.innerText = game.players[0].character.name;
  currentPlayerAbility.innerText = game.players[0].character.abilityDescription;

  if(game.players[0].role === "Sheriff")sheriffIcon.innerText = "brightness_high";

  // POPULATE PLAYER 1
  var player1Name = document.getElementById('player-1-name');
  var player1Avatar = document.getElementById('player-1-avatar');
  var player1Character = document.getElementById('player-1-character');
  var player1Health = document.getElementById('player-1-health');

  player1Name.innerHTML = "<b>" + game.allPlayers[0].name + "</b>";
  player1Avatar.src = game.allPlayers[0].character.imgUrl;
  player1Character.innerText = game.allPlayers[0].character.name;

  // POPULATE PLAYER 2
  var player2Name = document.getElementById('player-2-name');
  var player2Avatar = document.getElementById('player-2-avatar');
  var player2Character = document.getElementById('player-2-character');
  var player2Health = document.getElementById('player-2-health');

  player2Name.innerHTML = "<b>" + game.allPlayers[1].name + "</b>";
  player2Avatar.src = game.allPlayers[1].character.imgUrl;
  player2Character.innerText = game.allPlayers[1].character.name;

  // POPULATE PLAYER 3
  var player3Name = document.getElementById('player-3-name');
  var player3Avatar = document.getElementById('player-3-avatar');
  var player3Character = document.getElementById('player-3-character');
  var player3Health = document.getElementById('player-3-health');

  player3Name.innerHTML = "<b>" + game.allPlayers[2].name + "</b>";
  player3Avatar.src = game.allPlayers[2].character.imgUrl;
  player3Character.innerText = game.allPlayers[2].character.name;

  // POPULATE PLAYER 4
  var player4Name = document.getElementById('player-4-name');
  var player4Avatar = document.getElementById('player-4-avatar');
  var player4Character = document.getElementById('player-4-character');
  var player4Health = document.getElementById('player-4-health');

  player4Name.innerHTML = "<b>" + game.allPlayers[3].name + "</b>";
  player4Avatar.src = game.allPlayers[3].character.imgUrl;
  player4Character.innerText = game.allPlayers[3].character.name;

  // POPULATE PLAYER 5
  var player5Name = document.getElementById('player-5-name');
  var player5Avatar = document.getElementById('player-5-avatar');
  var player5Character = document.getElementById('player-5-character');
  var player5Health = document.getElementById('player-5-health');

  player5Name.innerHTML = "<b>" + game.allPlayers[4].name + "</b>";
  player5Avatar.src = game.allPlayers[4].character.imgUrl;
  player5Character.innerText = game.allPlayers[4].character.name;

  // POPULATE PLAYER 6
  var player6Name = document.getElementById('player-6-name');
  var player6Avatar = document.getElementById('player-6-avatar');
  var player6Character = document.getElementById('player-6-character');
  var player6Health = document.getElementById('player-6-health');

  player6Name.innerHTML = "<b>" + game.allPlayers[5].name + "</b>";
  player6Avatar.src = game.allPlayers[5].character.imgUrl;
  player6Character.innerText = game.allPlayers[5].character.name;

  // POPULATE PLAYER 7
  var player7Name = document.getElementById('player-7-name');
  var player7Avatar = document.getElementById('player-7-avatar');
  var player7Character = document.getElementById('player-7-character');
  var player7Health = document.getElementById('player-7-health');

  player7Name.innerHTML = "<b>" + game.allPlayers[6].name + "</b>";
  player7Avatar.src = game.allPlayers[6].character.imgUrl;
  player7Character.innerText = game.allPlayers[6].character.name;

  // POPULATE PLAYER 8
  var player8Name = document.getElementById('player-8-name');
  var player8Avatar = document.getElementById('player-8-avatar');
  var player8Character = document.getElementById('player-8-character');
  var player8Health = document.getElementById('player-8-health');

  player8Name.innerHTML = "<b>" + game.allPlayers[7].name + "</b>";
  player8Avatar.src = game.allPlayers[7].character.imgUrl;
  player8Character.innerText = game.allPlayers[7].character.name;

  // HINT CARD
  var hintElement = document.getElementById('hint');
  hintElement.innerHTML = _.sample(hint.all);

  // DISPLAY ARROWS
  for( var i=0; i < 9; i++ ){
    var currentArrow = document.getElementById('arrow-' + (i+1));
    currentArrow.src = "http://i.imgur.com/pUn7Uru.png";
    currentArrow.style.visibility = "visible";
    if(i >= game.totalArrows) currentArrow.style.visibility = "hidden";
  }

  // EVENT LISTENERS
  // BUTTONS
  // ROLL DICE BUTTON
  rollDiceButton.onclick = function(){
    diceClickEnable();
    rollDice(dice, diceElements);
    
    if(dice.canRoll === false){
      this.onclick = null;
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    }
    savedDiceFull(dice, diceElements, rollDiceButton);
    console.log(dice.all)
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
    }
    dice2.onclick = function(){
      var dice2Value = dice.all[1];
      if(dice2Value != 5) dice.save(dice2Value);
      dice2.onclick = null;
      dice2.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton);
    }
    dice3.onclick = function(){
      var dice3Value = dice.all[2];
      if(dice3Value != 5) dice.save(dice3Value);
      dice3.onclick = null;
      dice3.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton);
    }
    dice4.onclick = function(){
      var dice4Value = dice.all[3];
      if(dice4Value != 5) dice.save(dice4Value);
      dice4.onclick = null;
      dice4.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton);
    }
    dice5.onclick = function(){
      var dice5Value = dice.all[4];
      if(dice5Value != 5) dice.save(dice5Value);
      dice5.onclick = null;
      dice5.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton);
    }
  }
  diceClickEnable();

  // PLAYER LIST
  player1.onclick = function(){
    targetPlayer(this, game);
    if(game.players[0].target === game.allPlayers[0]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[0];
    }
  }
  player2.onclick = function(){
    targetPlayer(this, game);
    if(game.players[0].target === game.allPlayers[1]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[1];
    }
  }
  player3.onclick = function(){
    if(game.players[0].target === game.allPlayers[2]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[2];
    }
    targetPlayer(this, game);
  }
  player4.onclick = function(){
    if(game.players[0].target === game.allPlayers[3]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[3];
    }
    targetPlayer(this, game);
  }
  player5.onclick = function(){
    if(game.players[0].target === game.allPlayers[4]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[4];
    }
    targetPlayer(this, game);
  }
  player6.onclick = function(){
    if(game.players[0].target === game.allPlayers[5]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[5];
    }
    targetPlayer(this, game);
  }
  player7.onclick = function(){
    if(game.players[0].target === game.allPlayers[6]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[6];
    }
    targetPlayer(this, game);
  }
  player8.onclick = function(){
    if(game.players[0].target === game.allPlayers[7]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[7];
    }
    targetPlayer(this, game);
  }
  currentPlayer.onclick = function(){
    console.log('You clicked on the current player!')
  }
};

/////////////////////////////
// WINDOW ONLOAD ENDS HERE //
/////////////////////////////

// ROLL DICE BUTTON
var rollDice = function(dice, diceElements){
  var counter = 0;
  // DISPLAY SAVED DICE
  for (var i = 0; i < dice.saved.length; i++) {
    var currentDice = document.getElementById('dice-'+(counter + 1));
    currentDice.src = dice.imageUrl[dice.saved[i]];
    diceElements[i].onclick = null;
    diceElements[i].style.opacity = 0.5;
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
}

// SELECT PLAYER FROM LIST
var targetPlayer = function(selection, game){
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
  if(dice.canRoll() === false){
    for (var i = 0; i < diceElements.length; i++) diceElements[i].style.opacity = 1;
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
  }
}

///////////////////////////////////////////////////////
// 'dice.unsave(dice.all[indexOf(dice.all[index])])' //
//   -Craig                                          //
///////////////////////////////////////////////////////