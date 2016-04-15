_ = require('lodash');
Game = require('./bang_game/game');
Player = require('./bang_game/player');
Dice = require('./bang_game/dice');
Hint = require('./bang_game/hint');
GameState = require("./bang_game/gameState.js")

// NEWING UP OBJECTS
  var hint = new Hint;

  var players = new Array(8);
  for (var i = 0; i < players.length; i++){
    players[i] = new Player("Player " + (i+1) )
  }

  var dice = new Dice();
  var characterMaxHealthValues = true;

  var game = new Game(dice, players, characterMaxHealthValues);
  game.setup();
  console.log("the new game object:",game);

  var gameState = new GameState(game);
  // to enable save game loading, uncomment the following line (beware game-breaking bugs)
  // game = gameState.load();
  console.log("the game object that is used:", game);

window.onload = function(){
  var allHealthBars = document.getElementsByClassName('determinate');

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
  var currentPlayerArrows = document.getElementById('current-player-arrows');

  currentPlayerAvatar.src = game.players[0].character.imgUrl;
  currentPlayerAvatarReveal.src = game.players[0].character.imgUrl;
  currentPlayerNameRole.innerHTML = "<b>" + game.players[0].name + "</b> - " + game.players[0].character.name;
  currentPlayerCharacter.innerHTML = game.players[0].character.name + '<i class="material-icons right">close</i>';
  currentPlayerAbility.innerText = game.players[0].character.abilityDescription;
  
  for(var i = 0; i < game.players[0].arrows; i++){
   currentPlayerArrows.src = "arrowicon.png";
  }
   currentPlayerArrows.display = "none";

  displayCurrentPlayerArrows();


  var updateCurrentPlayerHealth = function(){
   currentPlayerHealth.innerHTML = "";
   for (var i = 0; i < game.players[0].health; i++) {
    currentPlayerHealth.innerHTML += '<i class="material-icons hp-icon">favorite</i>';
  }
  for (var i = 0; i < game.players[0].healthDifference(); i++) {
    currentPlayerHealth.innerHTML += '<i class="material-icons hp-icon">favorite_outline</i>';
  }
}
updateCurrentPlayerHealth();


//  currentPlayerHealth.innerHTML = "";

//  for (var i = 0; i < game.players[0].health; i++) {
//   currentPlayerHealth.innerHTML += '<i class="material-icons hp-icon">favorite</i>';
// }

// for (var i = 0; i < game.players[0].healthDifference(); i++) {
//   currentPlayerHealth.innerHTML += '<i class="material-icons hp-icon">favorite_outline</i>';
// }

  // POPULATE PLAYER LIST
  var populatePlayerList = function(){
    // POPULATE PLAYER 1
    var player1Name = document.getElementById('player-1-name');
    var player1Avatar = document.getElementById('player-1-avatar');
    var player1Character = document.getElementById('player-1-character');
    var player1HealthBar = document.getElementById('player-1-health-bar');
    var player1HealthDiv = document.getElementById('player-1-health-div');
    var player1CpDiv = document.getElementById('player-1-cp-div');
    var player1CurrentPlayer = document.getElementById('current-player-1')

    player1Name.setAttribute("class", "title grey-text text-darken-4");
    player1Character.setAttribute("class", "grey-text text-darken-4");
    player1CpDiv.style.display = "none";
    player1HealthDiv.style.display = "block";
    player1HealthDiv.setAttribute('class', 'progress red lighten-4')
    player1.setAttribute("class", "collection-item avatar player");
    player1CurrentPlayer.innerText = 'Current Player';

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

    if(game.allPlayers[0].role.name === "Sheriff"){
      player1Avatar.src = game.allPlayers[0].role.imgUrl;
      player1Character.innerText = game.allPlayers[0].role.name;  
    }else{
      player1Avatar.src = game.allPlayers[0].character.imgUrl;
      player1Character.innerText = game.allPlayers[0].character.name;
    }

    if(game.allPlayers[0].health <= 0){
      player1Character.innerText = game.allPlayers[0].role.name;
      player1Avatar.src = game.allPlayers[0].role.imgUrl;
      player1.setAttribute('class', 'collection-item avatar grey lighten-4 player');
      player1CurrentPlayer.innerText = 'DEAD';
      player1CurrentPlayer.setAttribute('class', 'grey-text text-darken-4');
      player1CpDiv.style.display = "inline";
      player1HealthDiv.style.display = "none";
    }

    player1HealthBar.style.width = game.allPlayers[0].healthAsPercentage() + "%"

    // POPULATE PLAYER 2
    var player2Name = document.getElementById('player-2-name');
    var player2Avatar = document.getElementById('player-2-avatar');
    var player2Character = document.getElementById('player-2-character');
    var player2HealthBar = document.getElementById('player-2-health-bar');
    var player2HealthDiv = document.getElementById('player-2-health-div');
    var player2CpDiv = document.getElementById('player-2-cp-div');
    var player2CurrentPlayer = document.getElementById('current-player-2')

    player2Name.setAttribute("class", "title grey-text text-darken-4");
    player2Character.setAttribute("class", "grey-text text-darken-4");
    player2CpDiv.style.display = "none";
    player2HealthDiv.style.display = "block";
    player2HealthDiv.setAttribute('class', 'progress red lighten-4')
    player2.setAttribute("class", "collection-item avatar player");
    player2CurrentPlayer.innerText = "Current Player";

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

    if(game.allPlayers[1].role.name === "Sheriff"){
      player2Avatar.src = game.allPlayers[1].role.imgUrl;
      player2Character.innerText = game.allPlayers[1].role.name;  
    }else{
      player2Avatar.src = game.allPlayers[1].character.imgUrl;
      player2Character.innerText = game.allPlayers[1].character.name;
    }

    if(game.allPlayers[1].health <= 0){
      player2Character.innerText = game.allPlayers[1].role.name;
      player2Avatar.src = game.allPlayers[1].role.imgUrl;
      player2.setAttribute('class', 'collection-item avatar grey lighten-4 player');
      player2CurrentPlayer.innerText = 'DEAD'
      player2CurrentPlayer.setAttribute('class', 'grey-text text-darken-4');
      player2CpDiv.style.display = "inline";
      player2HealthDiv.style.display = "none";
    }

    player2HealthBar.style.width = game.allPlayers[1].healthAsPercentage() + "%"

    // POPULATE PLAYER 3
    var player3Name = document.getElementById('player-3-name');
    var player3Avatar = document.getElementById('player-3-avatar');
    var player3Character = document.getElementById('player-3-character');
    var player3HealthBar = document.getElementById('player-3-health-bar');
    var player3HealthDiv = document.getElementById('player-3-health-div');
    var player3CpDiv = document.getElementById('player-3-cp-div');
    var player3CurrentPlayer = document.getElementById('current-player-3');

    player3Name.setAttribute("class", "title grey-text text-darken-4");
    player3Character.setAttribute("class", "grey-text text-darken-4");
    player3CpDiv.style.display = "none";
    player3HealthDiv.style.display = "block";
    player3HealthDiv.setAttribute('class', 'progress red lighten-4');
    player3.setAttribute("class", "collection-item avatar player");
    player3CurrentPlayer.innerText = "Current Player"

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

    if(game.allPlayers[2].role.name === "Sheriff"){
      player3Avatar.src = game.allPlayers[2].role.imgUrl;
      player3Character.innerText = game.allPlayers[2].role.name;  
    }else{
      player3Avatar.src = game.allPlayers[2].character.imgUrl;
      player3Character.innerText = game.allPlayers[2].character.name;
    }

    if(game.allPlayers[2].health <= 0){
      player3Character.innerText = game.allPlayers[2].role.name;
      player3Avatar.src = game.allPlayers[2].role.imgUrl;
      player3.setAttribute('class', 'collection-item avatar grey lighten-4 player');
      player3CurrentPlayer.innerText = "DEAD";
      player3CurrentPlayer.setAttribute('class', 'grey-text text-darken-4');
      player3CpDiv.style.display = "inline";
      player3HealthDiv.style.display = "none";
    }

    player3HealthBar.style.width = game.allPlayers[2].healthAsPercentage() + "%"

    // POPULATE PLAYER 4
    var player4Name = document.getElementById('player-4-name');
    var player4Avatar = document.getElementById('player-4-avatar');
    var player4Character = document.getElementById('player-4-character');
    var player4HealthBar = document.getElementById('player-4-health-bar');
    var player4HealthDiv = document.getElementById('player-4-health-div');
    var player4CpDiv = document.getElementById('player-4-cp-div');
    var player4CurrentPlayer = document.getElementById('current-player-4')

    player4Name.setAttribute("class", "title grey-text text-darken-4");
    player4Character.setAttribute("class", "grey-text text-darken-4");
    player4CpDiv.style.display = "none";
    player4HealthDiv.style.display = "block";
    player4HealthDiv.setAttribute('class', 'progress red lighten-4')
    player4.setAttribute("class", "collection-item avatar player");
    player4CurrentPlayer.innerText = "Current Player";

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

    if(game.allPlayers[3].role.name === "Sheriff"){
      player4Avatar.src = game.allPlayers[3].role.imgUrl;
      player4Character.innerText = game.allPlayers[3].role.name;  
    }else{
      player4Avatar.src = game.allPlayers[3].character.imgUrl;
      player4Character.innerText = game.allPlayers[3].character.name;
    }

    if(game.allPlayers[3].health <= 0){
      player4Character.innerText = game.allPlayers[3].role.name;
      player4Avatar.src = game.allPlayers[3].role.imgUrl;
      player4.setAttribute('class', 'collection-item avatar grey lighten-4 player');
      player4CurrentPlayer.innerText = "DEAD";
      player4CurrentPlayer.setAttribute('class', 'grey-text text-darken-4');
      player4CpDiv.style.display = "inline";
      player4HealthDiv.style.display = "none";
    }

    player4HealthBar.style.width = game.allPlayers[3].healthAsPercentage() + "%"

    // POPULATE PLAYER 5
    var player5Name = document.getElementById('player-5-name');
    var player5Avatar = document.getElementById('player-5-avatar');
    var player5Character = document.getElementById('player-5-character');
    var player5HealthBar = document.getElementById('player-5-health-bar');
    var player5HealthDiv = document.getElementById('player-5-health-div');
    var player5CpDiv = document.getElementById('player-5-cp-div');
    var player5CurrentPlayer = document.getElementById('current-player-5')

    player5Name.setAttribute("class", "title grey-text text-darken-4");
    player5Character.setAttribute("class", "grey-text text-darken-4");
    player5CpDiv.style.display = "none";
    player5HealthDiv.style.display = "block";
    player5HealthDiv.setAttribute('class', 'progress red lighten-4')
    player5.setAttribute("class", "collection-item avatar player");
    player5CurrentPlayer.innerText = "Current Player";

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

    if(game.allPlayers[4].role.name === "Sheriff"){
      player5Avatar.src = game.allPlayers[4].role.imgUrl;
      player5Character.innerText = game.allPlayers[4].role.name;  
    }else{
      player5Avatar.src = game.allPlayers[4].character.imgUrl;
      player5Character.innerText = game.allPlayers[4].character.name;
    }

    if(game.allPlayers[4].health <= 0){
      player5Character.innerText = game.allPlayers[4].role.name;
      player5Avatar.src = game.allPlayers[4].role.imgUrl;
      player5.setAttribute('class', 'collection-item avatar grey lighten-4 player');
      player5CurrentPlayer.innerText = "DEAD";
      player5CurrentPlayer.setAttribute('class', 'grey-text text-darken-4');
      player5CpDiv.style.display = "inline";
      player5HealthDiv.style.display = "none";
    }

    player5HealthBar.style.width = game.allPlayers[4].healthAsPercentage() + "%"

    // POPULATE PLAYER 6
    var player6Name = document.getElementById('player-6-name');
    var player6Avatar = document.getElementById('player-6-avatar');
    var player6Character = document.getElementById('player-6-character');
    var player6HealthBar = document.getElementById('player-6-health-bar');
    var player6HealthDiv = document.getElementById('player-6-health-div');
    var player6CpDiv = document.getElementById('player-6-cp-div');
    var player6CurrentPlayer = document.getElementById('current-player-6');

    player6Name.setAttribute("class", "title grey-text text-darken-4");
    player6Character.setAttribute("class", "grey-text text-darken-4");
    player6CpDiv.style.display = "none";
    player6HealthDiv.style.display = "block";
    player6HealthDiv.setAttribute('class', 'progress red lighten-4')
    player6.setAttribute("class", "collection-item avatar player");
    player6CurrentPlayer.innerText = "Current Player";

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

    if(game.allPlayers[5].role.name === "Sheriff"){
      player6Avatar.src = game.allPlayers[5].role.imgUrl;
      player6Character.innerText = game.allPlayers[5].role.name;  
    }else{
      player6Avatar.src = game.allPlayers[5].character.imgUrl;
      player6Character.innerText = game.allPlayers[5].character.name;
    }

    if(game.allPlayers[5].health <= 0){
      player6Character.innerText = game.allPlayers[5].role.name;
      player6Avatar.src = game.allPlayers[5].role.imgUrl;
      player6.setAttribute('class', 'collection-item avatar grey lighten-4 player');
      player6CurrentPlayer.innerText = "DEAD";
      player6CurrentPlayer.setAttribute('class', 'grey-text text-darken-4');
      player6CpDiv.style.display = "inline";
      player6HealthDiv.style.display = "none";
    }

    player6HealthBar.style.width = game.allPlayers[5].healthAsPercentage() + "%"

    // POPULATE PLAYER 7
    var player7Name = document.getElementById('player-7-name');
    var player7Avatar = document.getElementById('player-7-avatar');
    var player7Character = document.getElementById('player-7-character');
    var player7HealthBar = document.getElementById('player-7-health-bar');
    var player7HealthDiv = document.getElementById('player-7-health-div');
    var player7CpDiv = document.getElementById('player-7-cp-div');
    var player7CurrentPlayer = document.getElementById('current-player-7')

    player7Name.setAttribute("class", "title grey-text text-darken-4");
    player7Character.setAttribute("class", "grey-text text-darken-4");
    player7CpDiv.style.display = "none";
    player7HealthDiv.style.display = "block";
    player7HealthDiv.setAttribute('class', 'progress red lighten-4');
    player7.setAttribute("class", "collection-item avatar player");
    player7CurrentPlayer.innerText = "Current Player";

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

    if(game.allPlayers[6].role.name === "Sheriff"){
      player7Avatar.src = game.allPlayers[6].role.imgUrl;
      player7Character.innerText = game.allPlayers[6].role.name;  
    }else{
      player7Avatar.src = game.allPlayers[6].character.imgUrl;
      player7Character.innerText = game.allPlayers[6].character.name;
    }

    if(game.allPlayers[6].health <= 0){
      player7Character.innerText = game.allPlayers[6].role.name;
      player7Avatar.src = game.allPlayers[6].role.imgUrl;
      player7.setAttribute('class', 'collection-item avatar grey lighten-4 player');
      player7CurrentPlayer.innerText = "DEAD";
      player7CurrentPlayer.setAttribute('class', 'grey-text text-darken-4');
      player7CpDiv.style.display = "inline";
      player7HealthDiv.style.display = "none";
    }

    player7HealthBar.style.width = game.allPlayers[6].healthAsPercentage() + "%"

    // POPULATE PLAYER 8
    var player8Name = document.getElementById('player-8-name');
    var player8Avatar = document.getElementById('player-8-avatar');
    var player8Character = document.getElementById('player-8-character');
    var player8HealthBar = document.getElementById('player-8-health-bar');
    var player8HealthDiv = document.getElementById('player-8-health-div');
    var player8CpDiv = document.getElementById('player-8-cp-div');
    var player8CurrentPlayer = document.getElementById('current-player-8');

    player8Name.setAttribute("class", "title grey-text text-darken-4");
    player8Character.setAttribute("class", "grey-text text-darken-4");
    player8CpDiv.style.display = "none";
    player8HealthDiv.style.display = "block";
    player8HealthDiv.setAttribute('class', 'progress red lighten-4')
    player8.setAttribute("class", "collection-item avatar player");
    player8CurrentPlayer.innerText = "Current Player";

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

    if(game.allPlayers[7].role.name === "Sheriff"){
      player8Avatar.src = game.allPlayers[7].role.imgUrl;
      player8Character.innerText = game.allPlayers[7].role.name;  
    }else{
    player8Avatar.src = game.allPlayers[7].character.imgUrl;
    player8Character.innerText = game.allPlayers[7].character.name;
  }

    if(game.allPlayers[7].health <= 0){
      player8Character.innerText = game.allPlayers[7].role.name;
      player8Avatar.src = game.allPlayers[7].role.imgUrl;
      player8.setAttribute('class', 'collection-item avatar grey lighten-4 player');
      player8CurrentPlayer.innerText = "DEAD";
      player8CurrentPlayer.setAttribute('class', 'grey-text text-darken-4');
      player8CpDiv.style.display = "inline";
      player8HealthDiv.style.display = "none";
    }

    player8HealthBar.style.width = game.allPlayers[7].healthAsPercentage() + "%"
  
  }

  // DRAW ARROWS
  var drawArrows = function(){
    for( var i=1; i <= 9; i++ ){
      var currentArrow = document.getElementById('arrow-' + (i));
      currentArrow.src = "http://i.imgur.com/pUn7Uru.png";
      currentArrow.style.visibility = "visible";
      if(i > game.totalArrows) currentArrow.style.visibility = "hidden";
    }
  }

  populatePlayerList();

  // HINT CARD
  var hintElement = document.getElementById('hint');
  hintElement.innerHTML = _.sample(hint.all);

  drawArrows(game);

  // EVENT LISTENERS
  // BUTTONS
  // ROLL DICE BUTTON

  var enableRollDiceButton = function(){
    console.log("BUTTON IN SCOPE?", rollDiceButton);
    rollDiceButton.setAttribute('class','waves-effect waves-light btn red darken-4');
    rollDiceButton.onclick = function(){
      diceClickEnable();
      rollDice(dice, diceElements, game);
      game.resolveArrows();
      if(dice.canRoll() === false){
        //maybe re-add duplicate "use all dice to end turn" toast
        this.onclick = null;
        rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
        game.addToActionCounters();
      };
      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game);
    };
  };
  //previous most of the function's functionality was performed inline here in window.onload
  //now defining the function here and invoking it
  enableRollDiceButton();


  // DEFAULTS
  healButton.onclick = null;
  shootButton.onclick = null;
  endTurnButton.onclick = null;

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

      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState);
    }
    dice2.onclick = function(){
      var dice2Value = dice.all[1];
      if(dice2Value != 5) dice.save(dice2Value);
      dice2.onclick = null;
      dice2.style.opacity = 0.5;
      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState)
    }
    dice3.onclick = function(){
      var dice3Value = dice.all[2];
      if(dice3Value != 5) dice.save(dice3Value);
      dice3.onclick = null;
      dice3.style.opacity = 0.5;
      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState)
    }
    dice4.onclick = function(){
      var dice4Value = dice.all[3];
      if(dice4Value != 5) dice.save(dice4Value);
      dice4.onclick = null;
      dice4.style.opacity = 0.5;
      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState)
    }
    dice5.onclick = function(){
      var dice5Value = dice.all[4];
      if(dice5Value != 5) dice.save(dice5Value);
      dice5.onclick = null;
      dice5.style.opacity = 0.5;
      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState)
    }
  }

  var rollDiceDefault = function(){
    diceClickEnable();
    rollDice();

    if(dice.canRoll() === false){
      this.onclick = null;
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
      game.addToActionCounters();
    }
    savedDiceFull();
  }

  //commented out because it's up near the start now - was causing double arrows
  // rollDiceButton.onclick = rollDiceDefault;

  // DICE CLICKS DISABLED BEFORE DICE ARE ROLLED TO PREVENT ROLL DICE BUTTON LOCKOUT.
  var diceClickDisable = function(){
    dice1.onclick = null;
    dice2.onclick = null;
    dice3.onclick = null;
    dice4.onclick = null;
    dice5.onclick = null;
  }
  diceClickDisable();

  // utility function to avoid repition in the playerX.onclick functions below:
  // what was a one line ternary now has to be these 14 lines in this function:
  var shootButtonEnableChecker = function(){
    if (game.canShoot1()){
      enableShootButton(game.players[0].target);
      playSound("177054__woodmoose__lowerguncock.wav");
    }
    else if(!game.canShoot1() && !game.canShoot2()){
      disableShootButton();
    }
    if(game.canShoot2()){
      enableShootButton(game.players[0].target);
      playSound("111676__dredile__revolvercock1.wav")
    }
    else if(!game.canShoot2() && !game.canShoot1()){
      disableShootButton();
    }
  }

  // PLAYER LIST
  player1.onclick = function(){
    if(game.players[0].target === game.allPlayers[0]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[0];
    }
    targetPlayer(this, game);



    shootButtonEnableChecker()



    if (game.canHeal()) {
      enableHealButton(game.players[0].target);

    }
    else{
      disableHealButton(healButton);
    }
  }
  player2.onclick = function(){
    if(game.players[0].target === game.allPlayers[1]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[1];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker()

    if (game.canHeal()) {
      enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player3.onclick = function(){
    if(game.players[0].target === game.allPlayers[2]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[2];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker();
    if (game.canHeal()) {
      enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player4.onclick = function(){
    if(game.players[0].target === game.allPlayers[3]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[3];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker();
    if (game.canHeal()) {
      enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player5.onclick = function(){
    if(game.players[0].target === game.allPlayers[4]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[4];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker();
    if (game.canHeal()) {
      enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player6.onclick = function(){
    if(game.players[0].target === game.allPlayers[5]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[5];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker();
    if (game.canHeal()) {
      enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player7.onclick = function(){
    if(game.players[0].target === game.allPlayers[6]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[6];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker();
    if (game.canHeal()) {
      enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player8.onclick = function(){
    if(game.players[0].target === game.allPlayers[7]){
      game.players[0].target = null;
    }else{
      game.players[0].target = game.allPlayers[7];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker();
    if (game.canHeal()) {
      enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }



//////////////////////////////////////
//  WINDOW ONLOAD USED TO END HERE  //
//////////////////////////////////////



//////////////////////////////////
// WINDOW ONLOAD ENDS SOMEWHERE //
//////////////////////////////////


var updateHealthBars = function(){
  for(i = 0; i < allHealthBars.length; i++){
    allHealthBars[i].style.width = game.allPlayers[i].healthAsPercentage() + "%";
    var p = document.getElementById("player-" + (i + 1));
    var pChar = document.getElementById("player-" + (i + 1) + "-character");
    var pAva = document.getElementById("player-" + (i + 1) + "-avatar");
    var pDead = document.getElementById("current-player-" + (i + 1));
    var pDeadDiv = document.getElementById("player-" + (i + 1) + "-cp-div");
    var pHealthBar = document.getElementById("player-" + (i + 1) + "-health-div");
    if(game.allPlayers[i].health <= 0){
      p.onclick = null;
      p.setAttribute('class', 'collection-item avatar grey lighten-4 player');
      pChar.innerHTML = game.allPlayers[i].role.name;
      pAva.src = game.allPlayers[i].role.imgUrl;
      pDead.innerText = 'DEAD';
      pDead.setAttribute('class', 'grey-text text-darken-4')
      pDeadDiv.style.display = "inline";
      pHealthBar.style.display = "none";
    }
  }
}

  var enableShootButton = function(target){
    shootButton.setAttribute('class','waves-effect waves-light btn red darken-4');
    shootButton.onclick = function(){
      if(target.health < 2){
        var shootMessage = 'You killed ' + target.name
      } else {
        var shootMessage = 'You shot ' + target.name
      }

      Materialize.toast(shootMessage, 2000);

      game.shootTarget();
      playSound("213925__diboz__pistol-riccochet.ogg")

      if (game.canShoot1()){
        enableShootButton(game.players[0].target);
      }
      else if(!game.canShoot1() && !game.canShoot2()){
        disableShootButton();
      }
      if(game.canShoot2()){
        enableShootButton(game.players[0].target);
      }
      else if(!game.canShoot2() && !game.canShoot1()){
        disableShootButton();
      }


      (game.canShoot1() || game.canShoot2()) ? enableShootButton(game.players[0].target) : disableShootButton();
      if (game.canHeal()) {
        enableHealButton(game.players[0].target);
      }
      else{
        disableHealButton();
      }

      updateHealthBars(allHealthBars, game);
      if (game.checkActions() <= 0){
        enableEndTurnButton();
      }
    }; // onclick end
  }

  var disableShootButton = function(){
    shootButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    shootButton.onclick = null;
  }


var enableHealButton = function(target){
  healButton.setAttribute('class','waves-effect waves-light btn red darken-4');
  healButton.onclick = function(){
    Materialize.toast('You healed ' + target.name, 2000);
    game.beerTarget();
    if (game.canHeal()) {
      enableHealButton(game.players[0].target);
    }else{
      disableHealButton();
    }
    updateHealthBars();
    updateCurrentPlayerHealth();
    if (game.checkActions() <= 0){
      enableEndTurnButton();
    }
  }
}
var disableHealButton = function(){
  healButton.setAttribute('class', 'waves-effect waves-light btn disabled');
  healButton.onclick = null;
}


//this function needs to inherit the scope of window.onload - passing it to setTimeout as a callback defined directly in the setTimeout arguments would make it lose the scope of window.onload, hence declaring it here and passing this func by name to setTimeout
var currentPlayerDiedBehaviour = function(){
  console.log("prev player dice:", dice.all);
  game.nextTurn(true, gameState);
  displayCurrentPlayerArrows();
  ifCurrentPlayerDiesTriggerNextTurn(); // checks again after players rotated - in case player rotated to died to arrows same as the previous player
  dispatchEvent(new Event('load'));
  endTurnButton.setAttribute('class', 'waves-effect waves-light btn disabled');
};

var ifCurrentPlayerDiesTriggerNextTurn = function(){
  if(game.players[0].health <= 0){
    // CALL DISABLE DICEROLL FUNCTION HERE
    // var rollDiceButton = document.getElementById('roll-dice-button')
    // there doesn't seem to be a function for this - but these 2 lines do it:
    rollDiceButton.onclick = null;
    rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    // the 
    setTimeout(currentPlayerDiedBehaviour, 3000); // function definition just above
  }
};
  // ROLL DICE BUTTON

  var rollDice = function(){
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
    displayCurrentPlayerArrows(); // in case current player dies - shows their new arrows (probably 0, cause arrows just went back to the middle)
    updateCurrentPlayerHealth(); // in case current players dies - shows their 0 filled hearts
    game.dynamiteExplodes();
    if (game.dice.threeDynamite()) {
      playSound("dynamite.wav")
    }

    ifCurrentPlayerDiesTriggerNextTurn();
    displayCurrentPlayerArrows(); // NECESSARY duplication
    updateCurrentPlayerHealth(); // NECESSARY duplication
    updateHealthBars();

    // DISPLAY CURRENT ROLL
    for (var i = 0; i < dice.currentRoll.length; i++){
      currentDice = document.getElementById('dice-'+(counter + 1));
      currentDice.src = dice.imageUrl[dice.currentRoll[i]];
      if(dice.currentRoll[i] === 5) currentDice.style.opacity = 0.5;
      if(dice.saved.length === 5) currentDice.style.opacity = 1;
      counter++
    }
  }
    //do we want to save on every roll? - nope - default state of window.onload would mess up display if save could be mid-turn
    // gameState.load() uses fresh dice object now, this fixes a lot of display issues etc
  // gameState.save();

  var enableEndTurnButton = function(){
    endTurnButton.setAttribute('class','waves-effect waves-light btn red darken-4');
    endTurnButton.onclick = function(){
        if (game.threeGatling()){
          playSound("104401__kantouth__gatling-gun.mp3")
        }
      ifCurrentPlayerDiesTriggerNextTurn();
      console.log("prev player dice:", dice.all);
      game.nextTurn(false, gameState);
      displayCurrentPlayerArrows();
      dispatchEvent(new Event('load'));
      endTurnButton.setAttribute('class', 'waves-effect waves-light btn disabled');
      console.log("roll dice button in end turn button onlick:", rollDiceButton);
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn red darken-4');
      enableRollDiceButton();
    }
  }

  // ROLL DICE
  // dice.roll();
  // game.resolveArrows();
  // drawArrows(game);
  // displayCurrentPlayerArrows();
  // updateCurrentPlayerHealth();
  // updateHealthBars();

  // SELECT PLAYER FROM LIST
  var targetPlayer = function(selection){
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
     // IF SELECTED PLAYER IS CURRENTLY SELECTED, DESELECT THEM
    }
    else{
      selection.setAttribute('class', 'collection-item avatar player');
      healthBar.setAttribute('class', 'progress red lighten-4');
    }
  }


  var savedDiceFull = function(){
    if(dice.canRoll() === false){
      game.addToActionCounters();
      if (game.checkActions()){
        Materialize.toast("Target a player to resolve dice before ending turn", 3500)
      }
      for (var i = 0; i < diceElements.length; i++) diceElements[i].style.opacity = 1;
        rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
      game.addToActionCounters();
      rollDiceButton.onclick = null;
      if (game.checkActions() <= 0){
        enableEndTurnButton();
        rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
      }
    }

  }

  
} // END OF WINDOW ONLOAD

/////////////////////////////
// WINDOW ONLOAD ENDS HERE //
/////////////////////////////

var displayCurrentPlayerArrows = function(){
  for(var i = 0; i < 9; i++){
    var currentPlayerArrows = document.getElementById('current-player-arrow-' + (i+1));
    currentPlayerArrows.src = "arrowicon.png";
    currentPlayerArrows.style.display = "inline-block";
    if(i >= game.players[0].arrows) currentPlayerArrows.style.display = "none";
  }
}

var savedDiceFull = function(){
  if(dice.canRoll() === false){
    game.addToActionCounters();
    if (game.checkActions()){
      Materialize.toast("Target a player to resolve dice before ending turn", 3500)
    }
    for (var i = 0; i < diceElements.length; i++) diceElements[i].style.opacity = 1;
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    game.addToActionCounters();
    rollDiceButton.onclick = null;
    if (game.checkActions() <= 0){
      enableEndTurnButton();
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    }
  }
}

var endGame = function(){
  // TRIGGER END GAME MODAL
  // DISABLE BUTTONS
  console.log("saving finished game");
  // removes targets from all players to allow saving without JSON.stringify throwing a "gameState.js:12 Uncaught TypeError: Converting circular structure to JSON"
  // (can't save a player object with a player object nested in it - definitely not if it's the SAME player object (if targetting yourself and turn end-)
  // see also: https://github.com/isaacs/json-stringify-safe/blob/master/README.md
  for (var i = 0; i < this.players.length;i++){
    this.players[i].target = null;
  }
  // gameState.save();
  game.end();
}


var playSound = function(sound){
  var audio = new Audio(sound);
  audio.play();
}

////////////////////////////////////////////////////////////
//    'dice.unsave(dice.all[indexOf(dice.all[index])])'   //
//      -Craig                                            //
////////////////////////////////////////////////////////////