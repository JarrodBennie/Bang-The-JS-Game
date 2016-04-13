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
  roleButton = document.getElementById('role-button');

  // TARGET DICE IMAGES
  var dice1 = document.getElementById('dice-1'),
  dice2 = document.getElementById('dice-2'),
  dice3 = document.getElementById('dice-3'),
  dice4 = document.getElementById('dice-4'),
  dice5 = document.getElementById('dice-5'),
  diceElements = [dice1, dice2, dice3, dice4, dice5];

  // TARGET PLAYER LIST
  var player1 = document.getElementById('player-1'),
  player2 = document.getElementById('player-2'),
  player3 = document.getElementById('player-3'),
  player4 = document.getElementById('player-4'),
  player5 = document.getElementById('player-5'),
  player6 = document.getElementById('player-6'),
  player7 = document.getElementById('player-7'),
  player8 = document.getElementById('player-8'),
  currentPlayer = document.getElementById('current-player');

  // POPULATE CURRENT PLAYER
  var currentPlayerAvatar = document.getElementById('current-player-avatar');
  var currentPlayerAvatarReveal = document.getElementById('current-player-avatar-reveal');
  var currentPlayerNameRole = document.getElementById('current-player-name-character');
  var currentPlayerCharacter = document.getElementById('current-player-character');
  var currentPlayerAbility = document.getElementById('current-player-ability');
  var sheriffIcon = document.getElementById('sheriff-icon');
  var currentPlayerHealth = document.getElementById('current-player-health');

  currentPlayerAvatar.src = game.players[0].character.imgUrl;
  currentPlayerAvatarReveal.src = game.players[0].character.imgUrl;
  currentPlayerNameRole.innerHTML = "<b>" + game.players[0].name + "</b> - " + game.players[0].character.name;
  currentPlayerCharacter.innerHTML = game.players[0].character.name + '<i class="material-icons right">close</i>';
  currentPlayerAbility.innerText = game.players[0].character.abilityDescription;

  for (var i = 0; i < game.players[0].health; i++) {
    currentPlayerHealth.innerHTML = currentPlayerHealth.innerHTML + '<i class="material-icons hp-icon">favorite</i>';
  }

  for (var i = 0; i < game.players[0].healthDifference(); i++) {
    currentPlayerHealth.innerHTML = currentPlayerHealth.innerHTML + '<i class="material-icons hp-icon">favorite_outline</i>';
  }

  if(game.players[0].role.name === "Sheriff"){
    currentPlayerHealth.innerHTML = currentPlayerHealth.innerHTML + '<i class="material-icons right sheriff-icon"></i>';
  }

  // POPULATE PLAYER LIST
  var populatePlayerList = function(){
    // POPULATE PLAYER 1
    var player1Name = document.getElementById('player-1-name');
    var player1Avatar = document.getElementById('player-1-avatar');
    var player1Character = document.getElementById('player-1-character');
    var player1HealthBar = document.getElementById('player-1-health-bar');
    var player1HealthDiv = document.getElementById('player-1-health-div');
    var player1CpDiv = document.getElementById('player-1-cp-div');

    player1CpDiv.style.display = "none";
    player1.setAttribute("class", "collection-item avatar player");

    if(game.allPlayers[0] == game.players[0]){
      player1Name.innerHTML = "<b>" + game.allPlayers[0].name;
      player1Name.setAttribute("class", "title white-text");
      player1Character.setAttribute("class", "white-text");
      player1CpDiv.style.display = "inline";
      player1HealthDiv.style.display = "none";
      player1.setAttribute("class", "collection-item avatar red darken-4 player");
    }else if(game.allPlayers[0] == game.players[game.players.length - 1]){
      player1Name.innerHTML = "<b>" + game.allPlayers[0].name + "</b>" + ' - PREVIOUS';
    }else if(game.allPlayers[0] == game.players[1]){
      player1Name.innerHTML = "<b>" + game.allPlayers[0].name + "</b>" + ' - NEXT';
    }else{
      player1Name.innerHTML = "<b>" + game.allPlayers[0].name + "</b>";
    }

    player1Avatar.src = game.allPlayers[0].character.imgUrl;
    player1Character.innerText = game.allPlayers[0].character.name;
    player1HealthBar.style.width = game.allPlayers[0].healthAsPercentage() + "%"

    // POPULATE PLAYER 2
    var player2Name = document.getElementById('player-2-name');
    var player2Avatar = document.getElementById('player-2-avatar');
    var player2Character = document.getElementById('player-2-character');
    var player2HealthBar = document.getElementById('player-2-health-bar');
    var player2HealthDiv = document.getElementById('player-2-health-div');
    var player2CpDiv = document.getElementById('player-2-cp-div');

    player2CpDiv.style.display = "none";
    player2.setAttribute("class", "collection-item avatar player");

    if(game.allPlayers[1] == game.players[0]){
      player2Name.innerHTML = "<b>" + game.allPlayers[1].name;
      player2Name.setAttribute("class", "title white-text");
      player2Character.setAttribute("class", "white-text");
      player2CpDiv.style.display = "inline";
      player2HealthDiv.style.display = "none";
      player2.setAttribute("class", "collection-item avatar red darken-4 player");
    }else if(game.allPlayers[1] == game.players[game.players.length - 1]){
      player2Name.innerHTML = "<b>" + game.allPlayers[1].name + "</b>" + ' - PREVIOUS';
    }else if(game.allPlayers[1] == game.players[1]){
      player2Name.innerHTML = "<b>" + game.allPlayers[1].name + "</b>" + ' - NEXT';
    }else{
      player2Name.innerHTML = "<b>" + game.allPlayers[1].name + "</b>";
    }

    player2Avatar.src = game.allPlayers[1].character.imgUrl;
    player2Character.innerText = game.allPlayers[1].character.name;
    player2HealthBar.style.width = game.allPlayers[1].healthAsPercentage() + "%"

    // POPULATE PLAYER 3
    var player3Name = document.getElementById('player-3-name');
    var player3Avatar = document.getElementById('player-3-avatar');
    var player3Character = document.getElementById('player-3-character');
    var player3HealthBar = document.getElementById('player-3-health-bar');
    var player3HealthDiv = document.getElementById('player-3-health-div');
    var player3CpDiv = document.getElementById('player-3-cp-div');

    player3CpDiv.style.display = "none";
    player3.setAttribute("class", "collection-item avatar player");

    if(game.allPlayers[2] == game.players[0]){
      player3Name.innerHTML = "<b>" + game.allPlayers[2].name;
      player3Name.setAttribute("class", "title white-text");
      player3Character.setAttribute("class", "white-text");
      player3CpDiv.style.display = "inline";
      player3HealthDiv.style.display = "none";
      player3.setAttribute("class", "collection-item avatar red darken-4 player");
    }else if(game.allPlayers[2] == game.players[game.players.length - 1]){
      player3Name.innerHTML = "<b>" + game.allPlayers[2].name + "</b>" + ' - PREVIOUS';
    }else if(game.allPlayers[2] == game.players[1]){
      player3Name.innerHTML = "<b>" + game.allPlayers[2].name + "</b>" + ' - NEXT';
    }else{
      player3Name.innerHTML = "<b>" + game.allPlayers[2].name + "</b>";
    }

    player3Avatar.src = game.allPlayers[2].character.imgUrl;
    player3Character.innerText = game.allPlayers[2].character.name;
    player3HealthBar.style.width = game.allPlayers[2].healthAsPercentage() + "%"

    // POPULATE PLAYER 4
    var player4Name = document.getElementById('player-4-name');
    var player4Avatar = document.getElementById('player-4-avatar');
    var player4Character = document.getElementById('player-4-character');
    var player4HealthBar = document.getElementById('player-4-health-bar');
    var player4HealthDiv = document.getElementById('player-4-health-div');
    var player4CpDiv = document.getElementById('player-4-cp-div');

    player4CpDiv.style.display = "none";
    player4.setAttribute("class", "collection-item avatar player");

    if(game.allPlayers[3] == game.players[0]){
      player4Name.innerHTML = "<b>" + game.allPlayers[3].name;
      player4Name.setAttribute("class", "title white-text");
      player4Character.setAttribute("class", "white-text");
      player4CpDiv.style.display = "inline";
      player4HealthDiv.style.display = "none";
      player4.setAttribute("class", "collection-item avatar red darken-4 player");
    }else if(game.allPlayers[3] == game.players[game.players.length - 1]){
      player4Name.innerHTML = "<b>" + game.allPlayers[3].name + "</b>" + ' - PREVIOUS';
    }else if(game.allPlayers[3] == game.players[1]){
      player4Name.innerHTML = "<b>" + game.allPlayers[3].name + "</b>" + ' - NEXT';
    }else{
      player4Name.innerHTML = "<b>" + game.allPlayers[3].name + "</b>";
    }

    player4Avatar.src = game.allPlayers[3].character.imgUrl;
    player4Character.innerText = game.allPlayers[3].character.name;
    player4HealthBar.style.width = game.allPlayers[3].healthAsPercentage() + "%"

    // POPULATE PLAYER 5
    var player5Name = document.getElementById('player-5-name');
    var player5Avatar = document.getElementById('player-5-avatar');
    var player5Character = document.getElementById('player-5-character');
    var player5HealthBar = document.getElementById('player-5-health-bar');
    var player5HealthDiv = document.getElementById('player-5-health-div');
    var player5CpDiv = document.getElementById('player-5-cp-div');

    player5CpDiv.style.display = "none";
    player5.setAttribute("class", "collection-item avatar player");

    if(game.allPlayers[4] == game.players[0]){
      player5Name.innerHTML = "<b>" + game.allPlayers[4].name;
      player5Name.setAttribute("class", "title white-text");
      player5Character.setAttribute("class", "white-text");
      player5CpDiv.style.display = "inline";
      player5HealthDiv.style.display = "none";
      player5.setAttribute("class", "collection-item avatar red darken-4 player");
    }else if(game.allPlayers[4] == game.players[game.players.length - 1]){
      player5Name.innerHTML = "<b>" + game.allPlayers[4].name + "</b>" + ' - PREVIOUS';
    }else if(game.allPlayers[4] == game.players[1]){
      player5Name.innerHTML = "<b>" + game.allPlayers[4].name + "</b>" + ' - NEXT';
    }else{
      player5Name.innerHTML = "<b>" + game.allPlayers[4].name + "</b>";
    }

    player5Avatar.src = game.allPlayers[4].character.imgUrl;
    player5Character.innerText = game.allPlayers[4].character.name;
    player5HealthBar.style.width = game.allPlayers[4].healthAsPercentage() + "%"

    // POPULATE PLAYER 6
    var player6Name = document.getElementById('player-6-name');
    var player6Avatar = document.getElementById('player-6-avatar');
    var player6Character = document.getElementById('player-6-character');
    var player6HealthBar = document.getElementById('player-6-health-bar');
    var player6HealthDiv = document.getElementById('player-6-health-div');
    var player6CpDiv = document.getElementById('player-6-cp-div');

    player6CpDiv.style.display = "none";
    player6.setAttribute("class", "collection-item avatar player");

    if(game.allPlayers[5] == game.players[0]){
      player6Name.innerHTML = "<b>" + game.allPlayers[5].name;
      player6Name.setAttribute("class", "title white-text");
      player6Character.setAttribute("class", "white-text");
      player6CpDiv.style.display = "inline";
      player6HealthDiv.style.display = "none";
      player6.setAttribute("class", "collection-item avatar red darken-4 player");
    }else if(game.allPlayers[5] == game.players[game.players.length - 1]){
      player6Name.innerHTML = "<b>" + game.allPlayers[5].name + "</b>" + ' - PREVIOUS';
    }else if(game.allPlayers[5] == game.players[1]){
      player6Name.innerHTML = "<b>" + game.allPlayers[5].name + "</b>" + ' - NEXT';
    }else{
      player6Name.innerHTML = "<b>" + game.allPlayers[5].name + "</b>";
    }

    player6Avatar.src = game.allPlayers[5].character.imgUrl;
    player6Character.innerText = game.allPlayers[5].character.name;
    player6HealthBar.style.width = game.allPlayers[5].healthAsPercentage() + "%"

    // POPULATE PLAYER 7
    var player7Name = document.getElementById('player-7-name');
    var player7Avatar = document.getElementById('player-7-avatar');
    var player7Character = document.getElementById('player-7-character');
    var player7HealthBar = document.getElementById('player-7-health-bar');
    var player7HealthDiv = document.getElementById('player-7-health-div');
    var player7CpDiv = document.getElementById('player-7-cp-div');

    player7CpDiv.style.display = "none";
    player7.setAttribute("class", "collection-item avatar player");

    if(game.allPlayers[6] == game.players[0]){
      player7Name.innerHTML = "<b>" + game.allPlayers[6].name;
      player7Name.setAttribute("class", "title white-text");
      player7Character.setAttribute("class", "white-text");
      player7CpDiv.style.display = "inline";
      player7HealthDiv.style.display = "none";
      player7.setAttribute("class", "collection-item avatar red darken-4 player");
    }else if(game.allPlayers[6] == game.players[game.players.length - 1]){
      player7Name.innerHTML = "<b>" + game.allPlayers[6].name + "</b>" + ' - PREVIOUS';
    }else if(game.allPlayers[6] == game.players[1]){
      player7Name.innerHTML = "<b>" + game.allPlayers[6].name + "</b>" + ' - NEXT';
    }else{
      player7Name.innerHTML = "<b>" + game.allPlayers[6].name + "</b>";
    }

    player7Avatar.src = game.allPlayers[6].character.imgUrl;
    player7Character.innerText = game.allPlayers[6].character.name;
    player7HealthBar.style.width = game.allPlayers[6].healthAsPercentage() + "%"

    // POPULATE PLAYER 8
    var player8Name = document.getElementById('player-8-name');
    var player8Avatar = document.getElementById('player-8-avatar');
    var player8Character = document.getElementById('player-8-character');
    var player8HealthBar = document.getElementById('player-8-health-bar');
    var player8HealthDiv = document.getElementById('player-8-health-div');
    var player8CpDiv = document.getElementById('player-8-cp-div');

    player8CpDiv.style.display = "none";
    player8.setAttribute("class", "collection-item avatar player");

    if(game.allPlayers[7] == game.players[0]){
      player8Name.innerHTML = "<b>" + game.allPlayers[7].name;
      player8Name.setAttribute("class", "title white-text");
      player8Character.setAttribute("class", "white-text");
      player8CpDiv.style.display = "inline";
      player8HealthDiv.style.display = "none";
      player8.setAttribute("class", "collection-item avatar red darken-4 player");
    }else if(game.allPlayers[7] == game.players[game.players.length - 1]){
      player8Name.innerHTML = "<b>" + game.allPlayers[7].name + "</b>" + ' - PREVIOUS';
    }else if(game.allPlayers[7] == game.players[1]){
      player8Name.innerHTML = "<b>" + game.allPlayers[7].name + "</b>" + ' - NEXT';
    }else{
      player8Name.innerHTML = "<b>" + game.allPlayers[7].name + "</b>";
    }

    player8Avatar.src = game.allPlayers[7].character.imgUrl;
    player8Character.innerText = game.allPlayers[7].character.name;
    player8HealthBar.style.width = game.allPlayers[7].healthAsPercentage() + "%"
  }

  populatePlayerList();

  // HINT CARD
  var hintElement = document.getElementById('hint');
  hintElement.innerHTML = _.sample(hint.all);

  drawArrows(game);

  // EVENT LISTENERS
  // BUTTONS
  // ROLL DICE BUTTON
  rollDiceButton.onclick = function(){
    diceClickEnable();
    rollDice(dice, diceElements, game);

    if(dice.canRoll === false){
      this.onclick = null;
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
      game.addToActionCounters();
    }

    savedDiceFull(dice, diceElements, rollDiceButton, game);
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

  // BIG TOAST
  var roleButtonDefault = function(){
    roleButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    roleButton.onclick = null;

    Materialize.toast('For your eyes only...', 2000,'',function(){
      currentPlayerAvatarReveal.src = game.players[0].role.imgUrl;
      currentPlayerCharacter.innerHTML = game.players[0].role.name + '<i class="material-icons right">close</i>';
      setTimeout(function(){
        currentPlayerAvatarReveal.src = game.players[0].character.imgUrl;
        currentPlayerCharacter.innerHTML = game.players[0].character.name + '<i class="material-icons right">close</i>';
        roleButton.setAttribute('class', 'btn waves-effect waves-light red darken-4')
        roleButton.onclick = roleButtonDefault;
      }, 1500);
    });
  }
  roleButton.onclick = roleButtonDefault;

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
      savedDiceFull(dice, diceElements, rollDiceButton, game);
    }
    dice2.onclick = function(){
      var dice2Value = dice.all[1];
      if(dice2Value != 5) dice.save(dice2Value);
      dice2.onclick = null;
      dice2.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton, game);
    }
    dice3.onclick = function(){
      var dice3Value = dice.all[2];
      if(dice3Value != 5) dice.save(dice3Value);
      dice3.onclick = null;
      dice3.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton, game);
    }
    dice4.onclick = function(){
      var dice4Value = dice.all[3];
      if(dice4Value != 5) dice.save(dice4Value);
      dice4.onclick = null;
      dice4.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton, game);
    }
    dice5.onclick = function(){
      var dice5Value = dice.all[4];
      if(dice5Value != 5) dice.save(dice5Value);
      dice5.onclick = null;
      dice5.style.opacity = 0.5;
      savedDiceFull(dice, diceElements, rollDiceButton, game);
    }
  }

  // DICE CLICKS DISABLED BEFORE DICE ARE ROLLED TO PREVENT ROLL DICE BUTTON LOCKOUT.
  var diceClickDisable = function(){
    dice1.onclick = null;
    dice2.onclick = null;
    dice3.onclick = null;
    dice4.onclick = null;
    dice5.onclick = null;
  }
  diceClickDisable();


  // PLAYER LIST
  player1.onclick = function(){
    if(game.players[0].target === game.allPlayers[0]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[0];
    }
    targetPlayer(this, game);
    (game.canShoot1() || game.canShoot2()) ? enableShootButton(shootButton) : disableShootButton(shootButton);
  }
  player2.onclick = function(){
    if(game.players[0].target === game.allPlayers[1]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[1];
    }
    targetPlayer(this, game);
    (game.canShoot1() || game.canShoot2()) ? enableShootButton(shootButton) : disableShootButton(shootButton);
  }
  player3.onclick = function(){
    if(game.players[0].target === game.allPlayers[2]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[2];
    }
    targetPlayer(this, game);
    (game.canShoot1() || game.canShoot2()) ? enableShootButton(shootButton) : disableShootButton(shootButton);
  }
  player4.onclick = function(){
    if(game.players[0].target === game.allPlayers[3]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[3];
    }
    targetPlayer(this, game);
    (game.canShoot1() || game.canShoot2()) ? enableShootButton(shootButton) : disableShootButton(shootButton);
  }
  player5.onclick = function(){
    if(game.players[0].target === game.allPlayers[4]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[4];
    }
    targetPlayer(this, game);
    (game.canShoot1() || game.canShoot2()) ? enableShootButton(shootButton) : disableShootButton(shootButton);
  }
  player6.onclick = function(){
    if(game.players[0].target === game.allPlayers[5]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[5];
    }
    targetPlayer(this, game);
    (game.canShoot1() || game.canShoot2()) ? enableShootButton(shootButton) : disableShootButton(shootButton);
  }
  player7.onclick = function(){
    if(game.players[0].target === game.allPlayers[6]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[6];
    }
    targetPlayer(this, game);
    (game.canShoot1() || game.canShoot2()) ? enableShootButton(shootButton) : disableShootButton(shootButton);
  }
  player8.onclick = function(){
    if(game.players[0].target === game.allPlayers[7]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[7];
    }
    targetPlayer(this, game);
    (game.canShoot1() || game.canShoot2()) ? enableShootButton(shootButton) : disableShootButton(shootButton);
  }
};



/////////////////////////////
// WINDOW ONLOAD ENDS HERE //
/////////////////////////////

var enableShootButton = function(shootButton){
  shootButton.setAttribute('class','waves-effect waves-light btn red darken-4');

}

var disableShootButton = function(shootButton){
  shootButton.setAttribute('class', 'waves-effect waves-light btn disabled');
}

// ROLL DICE BUTTON
var rollDice = function(dice, diceElements, game){
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
  game.resolveArrows();
  drawArrows(game);
  // DISPLAY CURRENT ROLL
  for (var i = 0; i < dice.currentRoll.length; i++){
    currentDice = document.getElementById('dice-'+(counter + 1));
    currentDice.src = dice.imageUrl[dice.currentRoll[i]];
    if(dice.currentRoll[i] === 5) currentDice.style.opacity = 0.5;
    if(dice.saved.length === 5) currentDice.style.opacity = 1;
    counter++
  }
}

// DRAW ARROWS
var drawArrows = function(game){
  for( var i=0; i < 9; i++ ){
    var currentArrow = document.getElementById('arrow-' + (i+1));
    currentArrow.src = "http://i.imgur.com/pUn7Uru.png";
    currentArrow.style.visibility = "visible";
    if(i >= game.totalArrows) currentArrow.style.visibility = "hidden";
  }
}



// SELECT PLAYER FROM LIST
var targetPlayer = function(selection, game){
  // TARGET HEALTH BAR OF SELECTED PLAYER
  var healthBar = selection.getElementsByClassName('progress')[0];
  // TARGET PREVIOUSLY SELECTED PLAYER
  var previouslySelected = document.getElementsByClassName('collection-item avatar player red lighten-4')[0] || document.getElementsByClassName('collection-item grey darken-3 avatar player')[0];
  // TARGET HEALTH BAR OF PREVIOUSLY SELECTED PLAYER
  if (previouslySelected) var targetedHealthBar = previouslySelected.getElementsByClassName('progress')[0];

  // RESET PREVIOUSLY SELECTED PLAYER COLOURS
  if(previouslySelected && previouslySelected != selection){
    if(previouslySelected.className === 'collection-item grey darken-3 avatar player'){
      previouslySelected.setAttribute('class', 'collection-item avatar red darken-4 player');
    }else{
      previouslySelected.setAttribute('class', 'collection-item avatar player');
      targetedHealthBar.setAttribute('class', 'progress red lighten-4');
    }
  }
  // IF SELECTED PLAYER IS CURRENTLY UNSELECTED, SELECT THEM
  if(selection.className === "collection-item avatar player"){
    selection.setAttribute('class', 'collection-item avatar player red lighten-4');
    healthBar.setAttribute('class', 'progress white');

  // IF SELECTED PLAYER IS RED, MAKE THEM BLACK
  }else if(selection.className === "collection-item avatar red darken-4 player"){
    selection.setAttribute('class', 'collection-item grey darken-3 avatar player');
  // IF SELECTED PLAYER IS BLACK, MAKE THEM RED
  }else if(selection.className === "collection-item grey darken-3 avatar player"){
    selection.setAttribute('class', 'collection-item avatar red darken-4 player');
  }

  // IF SELECTED PLAYER IS CURRENTLY SELECTED, DESELECT THEM
  else{
    selection.setAttribute('class', 'collection-item avatar player');
    healthBar.setAttribute('class', 'progress red lighten-4');
  }
}



var endGame = function(gameResult){
  // TRIGGER END GAME MODAL
  // DISABLE BUTTONS
}

var savedDiceFull = function(dice, diceElements, rollDiceButton, game){
  if(dice.canRoll() === false){
    for (var i = 0; i < diceElements.length; i++) diceElements[i].style.opacity = 1;
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    game.addToActionCounters();
    rollDiceButton.onclick = null;
  }
}

////////////////////////////////////////////////////////////
//    'dice.unsave(dice.all[indexOf(dice.all[index])])'   //
//      -Craig                                            //
////////////////////////////////////////////////////////////


//  BONUS TOASTS    //
// Materialize.toast('You shot ' + target.name, 2000)
// Materialize.toast('You healed ' + target.name, 2000)