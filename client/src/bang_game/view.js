
var playSound = require("./playSound.js")

var View = function(gameState, game){
  this.ele = {};
  this.gameState = gameState;
  this.game = game;
  this.hint;
};// View constructor end

// GET HTML ELEMENTS FROM PAGE
View.prototype.grabElements = function(){
  // BUTTONS
  this.ele.rollDiceButton = document.getElementById('roll-dice-button');
  this.ele.healButton = document.getElementById('heal-button');
  this.ele.shootButton = document.getElementById('shoot-button');
  this.ele.endTurnButton = document.getElementById('end-turn-button');
  this.ele.roleButton = document.getElementById('role-button');
  this.ele.newGameButton = document.getElementById("new-game-button");

  // DICE IMAGES
  var dice1 = document.getElementById('dice-1');
  var dice2 = document.getElementById('dice-2');
  var dice3 = document.getElementById('dice-3');
  var dice4 = document.getElementById('dice-4');
  var dice5 = document.getElementById('dice-5');
  this.ele.dice = [dice1, dice2, dice3, dice4, dice5];

  // PLAYER LIST COMPONENT PARTS
  this.ele.playerList = [];
  var determinates = document.getElementsByClassName('determinate');
  for (var i = 1; i <= 8; i++){
    var playerListObject = {};
    playerListObject.div = document.getElementById('player-'+i);
    playerListObject.name = document.getElementById('player-'+i+'-name');
    playerListObject.avatar = document.getElementById('player-'+i+'-avatar');
    playerListObject.character = document.getElementById('player-'+i+'-character');
    playerListObject.healthBar = document.getElementById('player-'+i+'-health-bar');
    playerListObject.healthDiv = document.getElementById('player-'+i+'-health-div');
    playerListObject.currentPlayerDiv = document.getElementById('player-'+i+'-cp-div');
    playerListObject.currentPlayerText = document.getElementById('current-player-'+i)
    playerListObject.sheriffIcon = document.querySelector('li.player-'+i+', i.sheriff-icon');

    // playerListObject.healthBarFill = determinates[i-1];
    // console.log("player"+i+"healthBar: ", playerListObject.healthBar);
    // console.log("player"+i+"healthBarFill: ", playerListObject.healthBarFill);

    this.ele.playerList.push(playerListObject);
  }// for loop 8 [end]
  // console.log(this.ele.playerList[0].healthBarFill);
  var allHealthBars = document.getElementsByClassName('determinate');
  // console.log(allHealthBars);
  // console.log(allHealthBars.length);
  // CURRENT PLAYER
  // this.ele.currentPlayer = document.getElementById('current-player');
  this.ele.currentPlayerAvatar = document.getElementById('current-player-avatar');
  this.ele.currentPlayerAvatarReveal = document.getElementById('current-player-avatar-reveal');
  this.ele.currentPlayerNameRole = document.getElementById('current-player-name-character');
  this.ele.currentPlayerCharacter = document.getElementById('current-player-character');
  this.ele.currentPlayerAbility = document.getElementById('current-player-ability');
  this.ele.currentPlayerHealth = document.getElementById('current-player-health');
  this.ele.currentPlayerArrows = [];
  for (var i = 1; i <= 9; i++){
    this.ele.currentPlayerArrows.push(document.getElementById("current-player-arrow-" + i));
  }
  // TARGET ARROW PILE PICTURES
  this.ele.arrowPile = [];
  for (var i = 1; i <= 9; i++){
    this.ele.arrowPile.push(document.getElementById('arrow-' + i));
  }
  // TARGET HINT CARD
  this.ele.hintElement = document.getElementById('hint');
}// grabElements method [end]
View.prototype.updateHealthBars = function(){
  for(i = 0; i < this.game.allPlayers.length; i++){
    this.ele.playerList[i].healthBar.style.width = this.game.allPlayers[i].healthAsPercentage() + "%";
    this.game.checkForDeaths();
  }
};// updateHealthBars = function [end]
View.prototype.renderPlayerListItem = function(playerIndex){
  var playerObject = this.ele.playerList[playerIndex];
  // var playerItem = this.ele.playerListItems[playerIndex];
  playerObject.name.setAttribute("class", "title grey-text text-darken-4");
  playerObject.name.innerHTML = "<b>" + this.game.allPlayers[playerIndex].name + "</b>";
  playerObject.character.setAttribute("class", "grey-text text-darken-4");
  playerObject.currentPlayerDiv.style.display = "none";
  playerObject.healthDiv.style.display = "block";
  playerObject.healthDiv.setAttribute('class', 'progress red lighten-4')
  playerObject.div.setAttribute("class", "collection-item avatar player");
  playerObject.healthBar.style.display = "block"; // IMPORTANT - some bars default to display: none - some default to block
  playerObject.healthBar.style.width = this.game.allPlayers[playerIndex].healthAsPercentage() + "%"

  if(this.game.allPlayers[playerIndex] == this.game.players[0]){
    playerObject.currentPlayerText.innerText = 'Current Player';
    playerObject.name.setAttribute("class", "title white-text");
    playerObject.character.setAttribute("class", "white-text");
    playerObject.healthDiv.style.display = "none";
    playerObject.currentPlayerDiv.style.display = "inline-block";
    playerObject.currentPlayerDiv.setAttribute('class', 'grey-text text-lighten-4');
    playerObject.currentPlayerDiv.innerHTML = '<b id="current-player-5">Current Player</b>';
    playerObject.div.setAttribute("class", "collection-item avatar red darken-4 player");
  }
  else if(this.game.allPlayers[playerIndex] == this.game.players[1]){
      playerObject.name.innerHTML = "<b>" + this.game.allPlayers[playerIndex].name + "</b>" + ' - NEXT';
  }
  else if(this.game.allPlayers[playerIndex] == this.game.players[this.game.players.length - 1]){
    playerObject.name.innerHTML = "<b>" + this.game.allPlayers[playerIndex].name + "</b>" + ' - PREVIOUS';
  }
  else{
    playerObject.name.innerHTML = "<b>" + this.game.allPlayers[playerIndex].name + "</b>";
  }
  if(this.game.allPlayers[playerIndex].role.name === "Sheriff"){
    playerObject.avatar.src = this.game.allPlayers[playerIndex].role.imgUrl;
    playerObject.character.innerText = this.game.allPlayers[playerIndex].role.name;  
  }else{
    playerObject.avatar.src = this.game.allPlayers[playerIndex].character.imgUrl;
    playerObject.character.innerText = this.game.allPlayers[playerIndex].character.name;
  }
  if(this.game.allPlayers[playerIndex].health <= 0){
    playerObject.character.innerText = this.game.allPlayers[playerIndex].role.name;
    playerObject.avatar.src = this.game.allPlayers[playerIndex].role.imgUrl;
    playerObject.div.setAttribute('class', 'collection-item avatar grey lighten-4 player');
    playerObject.div.onclick = null;
    playerObject.currentPlayerText.setAttribute('class', 'grey-text text-darken-4');
    playerObject.currentPlayerText.innerText = 'DEAD';

    playerObject.currentPlayerDiv.style.display = "inline";
    playerObject.healthDiv.style.display = "none";
    playerObject.character.innerHTML = this.game.allPlayers[playerIndex].role.name;
    playerObject.avatar.src = this.game.allPlayers[playerIndex].role.imgUrl;
    // sets text colour to black for "DEAD" text:
    playerObject.currentPlayerDiv.setAttribute('class', 'grey-text text-darken-4')
    //possibly unnecessary?:
    playerObject.currentPlayerDiv.style.display = "inline";
    playerObject.healthBar.style.display = "none";
  }
};// renderPlayerListItem = function [end]
// // old view healthbars function
// var updateHealthBars = function(){
//   for(i = 0; i < allHealthBars.length; i++){
//     allHealthBars[i].style.width = game.allPlayers[i].healthAsPercentage() + "%";
//     playerObject.determinate
//     var p = document.getElementById("player-" + (i + 1));
//     playerObject.div
//     var pChar = document.getElementById("player-" + (i + 1) + "-character");
//     playerObject.character
//     var pAva = document.getElementById("player-" + (i + 1) + "-avatar");
//     playerObject.avatar
//     var pDead = document.getElementById("current-player-" + (i + 1));
//     playerObject.currentPlayerText
//     var pDeadDiv = document.getElementById("player-" + (i + 1) + "-cp-div");
//     playerObject.currentPlayerDiv
//     var pHealthBar = document.getElementById("player-" + (i + 1) + "-health-div");
//     playerObject.healthDiv
//     if(game.allPlayers[i].health <= 0){
//       game.checkForDeaths();
//       p.onclick = null;
//       p.setAttribute('class', 'collection-item avatar grey lighten-4 player');
//       pChar.innerHTML = game.allPlayers[i].role.name;
//       pAva.src = game.allPlayers[i].role.imgUrl;
//       pDead.innerText = 'DEAD';
//       pDead.setAttribute('class', 'grey-text text-darken-4')
//       pDeadDiv.style.display = "inline";
//       pHealthBar.style.display = "none";
//     }
//   }
// }
View.prototype.setup = function(){
  this.setNewGameButtonOnClick();

  this.renderCurrentPlayer();
  this.renderPlayerList();
  this.renderHintCard();
  this.renderArrowPile();

  this.renderDice(null);
  this.setAllDiceOnClicks(null);
  
  this.setHealButtonOnClick(null);
  this.setShootButtonOnClick(null);
  this.setEndTurnButtonOnClick(null);
  this.setViewRoleButtonOnClick();
  this.setRollDiceButtonOnClick();
  this.setPlayerListOnClicks();

};// setup = function [end]
View.prototype.renderUpdateAll = function(){
  this.renderCurrentPlayer();
  this.renderPlayerList();
  this.renderHintCard();
  this.renderArrowPile();
  this.renderDice();
};// renderUpdateAll = function [end]
// ON CLICK EVENTS SETTERS ////////////////////////////////////////////////////
View.prototype.setNewGameButtonOnClick = function(remove){
  if (remove === null){
    this.ele.newGameButton.onclick = null;
    return;
  }
  this.ele.newGameButton.onclick = function(){
    this.gameState.forceNew = true;
    this.game = this.gameState.load();
    this.gameState.forceNew = false;
    this.setup();
  }.bind(this);
};// setNewGameButtonOnClick = function [end]
View.prototype.setRollDiceButtonOnClick = function(remove){
  if (remove === null){
    this.ele.rollDiceButton.onclick = null;
    this.ele.rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    return;
  }
  this.ele.rollDiceButton.setAttribute('class','waves-effect waves-light btn red darken-4');
  this.ele.rollDiceButton.onclick = function(){
    this.rollDice();
    this.renderDice();
    this.setAllDiceOnClicks();
    this.game.resolveArrows();
    this.renderCurrentPlayerHealth();
    this.renderCurrentPlayerArrows();
    this.enableShootButton()
    this.currentPlayerDied();
    this.game.checkForDeaths();
    this.enableShootButton();
    this.renderCurrentPlayerHealth();
    this.updateHealthBars();
    if(this.game.dice.canRoll() === false){
      //maybe re-add duplicate "use all dice to end turn" toast
      this.setRollDiceButtonOnClick(null);
      this.game.addToActionCounters();
    }
    this.diceRollFinished();
  }.bind(this);
};// setRollDiceButtonOnClick = function [end]

View.prototype.setAllDiceOnClicks = function(remove){
  if (remove === null){
    for (var i = 0; i < 5; i++){
      this.setDiceOnClick(i, null);
    }
    return;
  }
  // console.log(this.game.dice.saved.length);
  for (var i = this.game.dice.saved.length; i < 5; i++){
    this.setDiceOnClick(i);
  }
};// setAllDiceOnClicks = function [end]

View.prototype.setDiceOnClick = function(diceNumber, remove){
  if (remove === null){
      this.ele.dice[diceNumber].onclick = null;
      // this.ele.dice[diceNumber].style.opacity = 0.5;
      // console.log("SETDICEONCLICK called with null args");
      // throw new Error("setDiceOnClick null call - trace")
      // CALLED ON NEXT TURN
      return;
    }
  this.ele.dice[diceNumber].style.opacity = 1;
  this.ele.dice[diceNumber].onclick = function(){
    var diceValue = this.game.dice.all[diceNumber]
    if (diceValue !== 5) this.game.dice.save(diceValue)
      this.ele.dice[diceNumber].style.opacity = 0.5;
      this.ele.dice[diceNumber].onclick = null;
      this.diceRollFinished();
  }.bind(this)
  // console.log(this.ele.dice[diceNumber]);
  // console.log(this.ele.dice[diceNumber].onclick);
};// setDiceOnClick = function [end]


// //////////////////////////////////////////////////
// checking / doing stuff functions  // //////////////////////////////////////////////////
// //////////////////////////////////////////////////

View.prototype.ifCurrentPlayerDead = function(){
  // console.log(this.game)
  this.game.nextTurn(true, this.gameState);
  this.gameState.save(); // save state of the game at another time without resetting dice and rotating players and in theory we could possibly continue the turn with the dice and rerolls remembered
  // updateDisplayForNewTurn function here (grey out and remove onclicks for dead players - reset buttons etc.)
  this.setup();
  this.renderDice(null);
  this.currentPlayerDied(); // checks again after players rotated - in case player rotated to died to arrows same as the previous player
  this.setup();
  this.ele.endTurnButton.setAttribute('class', 'waves-effect waves-light btn disabled');
};// currentPlayerDeadBehaviour = function [end]
View.prototype.currentPlayerDied = function(){
  if(this.game.players[0].health > 0) return false;
    this.renderCurrentPlayerHealth();
    this.renderCurrentPlayerArrows();
    this.setRollDiceButtonOnClick(null);
    this.setEndTurnButtonOnClick(null);
    setTimeout(this.ifCurrentPlayerDead, 3000); // function definition just above
    return true
};// currentPlayerDied = function [end]
View.prototype.rollDice = function(){
  this.game.dice.roll();
  this.renderDice();

  this.game.resolveArrows();
  this.renderPlayerList();
  this.renderCurrentPlayerArrows();
  this.renderCurrentPlayerHealth();
  this.currentPlayerDied();
  this.enableShootButton()
  this.renderArrowPile();
  this.renderCurrentPlayerArrows(); // in case current player dies - shows their new arrows (probably 0, cause arrows just went back to the middle)
  this.renderCurrentPlayerHealth(); // in case current players dies - shows their 0 filled hearts
  this.updateHealthBars();

  this.currentPlayerDied();
  this.renderCurrentPlayerArrows(); // NECESSARY duplication
  this.renderCurrentPlayerHealth(); // NECESSARY duplication
  this.updateHealthBars();
  this.game.checkForDeaths();

  if (this.game.dice.threeDynamite()) {
    this.dynamiteExplodes();
  }

  this.currentPlayerDied();
  this.renderCurrentPlayerArrows(); // NECESSARY duplication
  this.renderCurrentPlayerHealth(); // NECESSARY duplication
  this.updateHealthBars();
};// rollDice = function [end]
View.prototype.dynamiteExplodes = function(){
  this.game.dynamiteExplodes();
  playSound("audio/dynamite.mp3");
  Materialize.toast("Boom!", 2000);
};// dynamiteExplodes = function [end]
View.prototype.enableShootButton = function(){
  //have to .bind(this) to keep this scoped to the view object - 'this' scope becomes Window without binding
  var shootEnableFunctions = {
    1: this.enableShootButtonOnePlayer.bind(this),
    2: this.enableShootButtonTwoPlayers.bind(this),
    3: this.enableShootButtonThreePlayers.bind(this),
    4: this.enableShootButtonFourPlayers.bind(this)
  };
  var numPlayers = this.game.players.length;
  if (numPlayers > 4) numPlayers = 4;
  var appropriateFunction = shootEnableFunctions[numPlayers]
  appropriateFunction();
};// enableShootButton = function [end]

View.prototype.setViewRoleButtonOnClick = function(remove){
  if (remove === null){
    this.ele.roleButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    this.ele.roleButton.onclick = null;
    return;
  }
  this.ele.roleButton.onclick = function(){
    this.setViewRoleButtonOnClick(null);
    Materialize.toast('For your eyes only...', 2000, '',function(){
      this.ele.currentPlayerAvatarReveal.src = this.game.players[0].role.imgUrl;
      this.ele.currentPlayerCharacter.innerHTML = this.game.players[0].role.name + '<i class="material-icons right">close</i>';

      setTimeout(function(){
        this.ele.currentPlayerAvatarReveal.src = this.game.players[0].character.imgUrl;
        this.ele.currentPlayerCharacter.innerHTML = this.game.players[0].character.name + '<i class="material-icons right">close</i>';
        this.ele.roleButton.setAttribute('class', 'btn waves-effect waves-light red darken-4')
        this.setViewRoleButtonOnClick();
      }.bind(this), 1500);
    }.bind(this))
  }.bind(this)
};// setViewRoleButtonOnClick = function [end]
View.prototype.setEndTurnButtonOnClick = function(remove){
  this.fireGatling();
  this.ele.endTurnButton.setAttribute('class','waves-effect waves-light btn red darken-4');
  if (this.game.fireGatling()){
    playSound("audio/gatling-gun.mp3");
    this.updateHealthBars();
  }
  if (remove === null){
    this.ele.endTurnButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    this.ele.endTurnButton.onclick = null;
  }
  this.ele.endTurnButton.onclick = function(){
    this.game.nextTurn(false, this.gameState);
    this.gameState.save(); // save state of the game at another time without resetting dice and rotating players and in theory we could possibly continue the turn with the dice and rerolls remembered
    this.setup();
    this.ele.endTurnButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    this.setRollDiceButtonOnClick();
  }.bind(this)
};// setEndTurnButtonOnClick = function [end]

View.prototype.setPlayerListOnClicks = function(){
  for (var i = 0; i < this.game.allPlayers.length; i++){
    this.setPlayerListItemOnClick(i);
  }
};// setPlayerListOnClicks = function [end]
View.prototype.setPlayerListItemOnClick = function(playerIndex){
  this.ele.playerList[playerIndex].div.onclick = function(){
    if(this.game.players[0].target === this.game.allPlayers[playerIndex]){
      this.game.players[0].target = null;
    }else{
      this.game.players[0].target = this.game.allPlayers[playerIndex];
    }
    this.targetPlayer(this.ele.playerList[playerIndex].div);
    this.enableShootButton()

    this.game.canHeal() ? this.setHealButtonOnClick() : this.setHealButtonOnClick(null)
  }.bind(this)
};// setPlayerListItemOnClick = function [end]
View.prototype.targetPlayer = function(selectedDiv){
  var healthBar = selectedDiv.getElementsByClassName('progress')[0];
  // TARGET PREVIOUSLY SELECTED PLAYER
  var previouslySelected = document.getElementsByClassName('collection-item avatar player red lighten-4')[0] || document.getElementsByClassName('collection-item grey darken-3 avatar player')[0];
  // TARGET HEALTH BAR OF PREVIOUSLY SELECTED PLAYER
  if (previouslySelected) var targetedHealthBar = previouslySelected.getElementsByClassName('progress')[0];

  // RESET PREVIOUSLY SELECTED PLAYER COLOURS
  if(previouslySelected && previouslySelected != selectedDiv){
    if(previouslySelected.className === 'collection-item grey darken-3 avatar player'){
      previouslySelected.setAttribute('class', 'collection-item avatar red darken-4 player');
    }else{
      previouslySelected.setAttribute('class', 'collection-item avatar player');
      targetedHealthBar.setAttribute('class', 'progress red lighten-4');
    }
  }

  // IF SELECTED PLAYER IS CURRENTLY UNSELECTED, SELECT THEM
  if(selectedDiv.className === "collection-item avatar player"){
    selectedDiv.setAttribute('class', 'collection-item avatar player red lighten-4');
    healthBar.setAttribute('class', 'progress white');

  // IF SELECTED PLAYER IS RED, MAKE THEM BLACK
  }else if(selectedDiv.className === "collection-item avatar red darken-4 player"){
    selectedDiv.setAttribute('class', 'collection-item grey darken-3 avatar player');
    // IF SELECTED PLAYER IS BLACK, MAKE THEM RED
  }else if(selectedDiv.className === "collection-item grey darken-3 avatar player"){
  selectedDiv.setAttribute('class', 'collection-item avatar red darken-4 player');
   // IF SELECTED PLAYER IS CURRENTLY SELECTED, DESELECT THEM
  }else{
    selectedDiv.setAttribute('class', 'collection-item avatar player');
    healthBar.setAttribute('class', 'progress red lighten-4');
  }
  
};// targetPlayer = function [end]
// UNUSED
View.prototype.endGame = function(){
  // TRIGGER END GAME MODAL
  // DISABLE BUTTONS
  // removes targets from all players to allow saving without JSON.stringify throwing a "gameState.js:12 Uncaught TypeError: Converting circular structure to JSON"
  // (can't save a player object with a player object nested in it - definitely not if it's the SAME player object (if targetting yourself and turn end-)
  // see also: https://github.com/isaacs/json-stringify-safe/blob/master/README.md
  for (var i = 0; i < this.players.length;i++){
    this.players[i].target = null;
  }
  // console.log("saving finished game");
  view.gameState.save();
  view.game.end();
};// endGame = function [end]
View.prototype.setShootButtonOnClick = function(remove){
  if (remove === null){
    this.ele.shootButton.setAttribute('class', 'waves-effect waves-light btn disabled')
    this.ele.shootButton.onclick = null;
    return;
  }
  this.ele.shootButton.setAttribute('class','waves-effect waves-light btn red darken-4');
  this.ele.shootButton.onclick = function(){
    if(this.game.players[0].target.health < 2){
      var shootMessage = 'You killed ' + this.game.players[0].target.name
    } else {
      var shootMessage = 'You shot ' + this.game.players[0].target.name
    }
    Materialize.toast(shootMessage, 2000);
    this.game.shootTarget();
    playSound("audio/pistol-riccochet.ogg")
    // this line was causing inverted target highlighting:
    // this.renderPlayerList();

    if (this.game.canShoot1()){
      this.setShootButtonOnClick();
    }
    else if(!this.game.canShoot1() && !this.game.canShoot2()){
      this.setShootButtonOnClick(null);
    }
    if(this.game.canShoot2()){
      this.setShootButtonOnClick();
    }
    else if(!this.game.canShoot2() && !this.game.canShoot1()){
      this.setShootButtonOnClick(null);
    }


    (this.game.canShoot1() || this.game.canShoot2()) ? this.setShootButtonOnClick() : this.setShootButtonOnClick(null);
    if (this.game.canHeal()) {
      this.setHealButtonOnClick();
    }
    else{
      this.setHealButtonOnClick(null);
    }

    this.updateHealthBars();
    if (this.game.checkActions() <= 0){
      this.setEndTurnButtonOnClick();
    }
  }.bind(this); // onclick end
};// setShootButtonOnClick = function [end]
View.prototype.setHealButtonOnClick = function(remove){
  if (remove === null){
    this.ele.healButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    this.ele.healButton.onclick = null;
    return;
  }
  this.ele.healButton.setAttribute('class','waves-effect waves-light btn red darken-4');
  this.ele.healButton.onclick = function(){
    Materialize.toast('You healed ' + this.game.players[0].target.name, 2000);
    playSound("audio/bottle-pour.mp3");
    this.game.beerTarget();
    if (this.game.canHeal()) {
      this.setHealButtonOnClick();
    }else{
      this.setHealButtonOnClick(null);
    }
    this.updateHealthBars();
    this.renderCurrentPlayerHealth();
    if (this.game.checkActions() <= 0){
      this.setEndTurnButtonOnClick();
    }
  }.bind(this)
};// setHealButtonOnClick = function [end]
View.prototype.enableShootButtonFourPlayers = function(){
  if (this.game.canShoot1()){
    this.setShootButtonOnClick();
    playSound("audio/shotgun-cock.wav");
  }
  else if(!this.game.canShoot1() && !this.game.canShoot2()){
    this.setShootButtonOnClick(null);
  }
  if(this.game.canShoot2()){
    this.setShootButtonOnClick();
    playSound("audio/revolver-cock.wav")
  }
  else if(!this.game.canShoot2() && !this.game.canShoot1()){
    this.setShootButtonOnClick(null);
  }
};// enableShootButtonFourPlayers = function [end]
View.prototype.enableShootButtonThreePlayers = function(){
  if (this.game.canShoot1() && this.game.canShoot2()){
    this.setShootButtonOnClick();
    playSound("audio/shotgun-cock.wav");
  }
  else if (this.game.canShoot1()){
    this.setShootButtonOnClick();
    playSound("audio/shotgun-cock.wav");
  }
  else if(!this.game.canShoot1() && !this.game.canShoot2()){
    this.setShootButtonOnClick(null);
  }
};// enableShootButtonThreePlayers = function [end]
View.prototype.enableShootButtonTwoPlayers = function(){
  if (this.game.players[0].target == this.game.players[1] && this.game.players[0].actionCounters["1"]){
  this.setShootButtonOnClick();
  playSound("audio/shotgun-cock.wav");
  } else if (this.game.players[0].target == this.game.players[1] && this.game.players[0].actionCounters["2"]){
  this.setShootButtonOnClick();
    playSound("audio/revolver-cock.wav")
  } else if (this.game.players[0].target == this.game.players[0]){
    // console.log("You can't shoot yourself, try shooting the other surviving player");
    this.setShootButtonOnClick(null);
  }
};// enableShootButtonTwoPlayers = function [end]
View.prototype.enableShootButtonOnePlayer = function(){
  if (this.game.players[0].target == this.game.players[0] && (this.game.players[0].actionCounters["1"] || this.game.players[0].actionCounters["2"])){
    // console.log("You can't shoot yourself - the game should be over, you're the only player alive");
    this.setShootButtonOnClick(null);
  }
};// enableShootButtonOnePlayer = function [end]
View.prototype.enableHealButton = function(){
  if (this.game.canHeal()){
    this.setHealButtonOnClick();
  }
  else {
    this.setHealButtonOnClick(null);
  }
};// enableHealButton = function [end]
View.prototype.fireGatling = function(){
  if(this.game.gatlingCheck()){
    this.game.fireGatling();
    Materialize.toast(this.game.players[0].name + " Used gatling!", 2000);
    playSound("audio/gatling-gun.mp3")
    this.updateHealthBars();
    this.game.checkForDeaths();
  }
};// fireGatling = function [end]
View.prototype.diceRollFinished = function(){
  if (this.game.dice.canRoll() === false){
    this.game.addToActionCounters();
    if (this.game.checkActions()){
      Materialize.toast("Target a player to resolve dice before ending turn", 3500)
      this.enableShootButton();
      //added shootButtonEnable check here so that if targeting a player, then saving all dice, you can shoot that target straight away without reselecting them
    }
    for (var i = 0; i < this.ele.dice.length; i++) this.ele.dice[i].style.opacity = 1;
    this.game.addToActionCounters();
    this.ele.rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    this.ele.rollDiceButton.onclick = null;
    if (this.game.checkActions() <= 0){
      this.fireGatling();
      this.setEndTurnButtonOnClick();
      this.ele.rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    }
  }
};
// //////////////////////////////////////////////////// //////////////////////////////////////////////////
// RENDER METHODS // //////////////////////////////////////////////////
// //////////////////////////////////////////////////// //////////////////////////////////////////////////
View.prototype.renderDice = function(remove){
  if (remove === null){
    for (var i = 0; i < this.ele.dice.length; i++) {
      this.ele.dice[i].style.visibility = "hidden";
      this.ele.dice[i].src = null;
      this.ele.dice[i].onclick = null;
      // console.log("RENDERDICE called with null arg");
      // NOT CALLED ON END TURN
    }
  }
    var diceCount = 0;
    for (diceCount; diceCount < this.game.dice.saved.length; diceCount++) {
      this.ele.dice[diceCount].src = this.game.dice.imageUrl[this.game.dice.saved[diceCount]];
      this.ele.dice[diceCount].onclick = null;
      this.ele.dice[diceCount].style.opacity = 0.5;
      this.ele.dice[diceCount].style.visibility = "visible"
    }
    // DISPLAY CURRENT ROLL
    var totalDice = this.game.dice.currentRoll.length + diceCount;
    for (diceCount; diceCount < totalDice; diceCount++){
      this.ele.dice[diceCount].src = this.game.dice.imageUrl[this.game.dice.all[diceCount]];
      this.ele.dice[diceCount].style.visibility = "visible";
        this.ele.dice[diceCount].style.opacity = 1;
    }
    if(this.game.dice.saved.length === 5){
      for (var i = 0; i < this.game.dice.all; i++){
        this.ele.dice[diceCount].style.opacity = 1;
      }
    }
};// renderDice = function [end]
View.prototype.renderArrowPile = function(){
  for (var i = 0; i < this.ele.arrowPile.length; i++){
    this.ele.arrowPile[i].src = "http://i.imgur.com/pUn7Uru.png";
    this.ele.arrowPile[i].style.visibility = "visible";
    if(i >= this.game.totalArrows) this.ele.arrowPile[i].style.visibility = "hidden";
  }; // loop [end]
};// renderArrowPile = function [end]
View.prototype.renderCurrentPlayer = function(){
  this.ele.currentPlayerAvatar.src = this.game.players[0].character.imgUrl;
  this.ele.currentPlayerAvatarReveal.src = this.game.players[0].character.imgUrl;
  this.ele.currentPlayerNameRole.innerHTML = "<b>" + this.game.players[0].name + "</b> - " + this.game.players[0].character.name;
  this.ele.currentPlayerCharacter.innerHTML = this.game.players[0].character.name + '<i class="material-icons right">close</i>';
  this.ele.currentPlayerAbility.innerText = this.game.players[0].character.abilityDescription;

  this.renderCurrentPlayerHealth();  
  this.renderCurrentPlayerArrows();
};// renderCurrentPlayer = function [end]
View.prototype.renderCurrentPlayerHealth = function(){
  this.ele.currentPlayerHealth.innerHTML = "";
  var overhealed = false;
  if (this.game.players[0].health > this.game.players[0].maxHealth) overhealed = true;
  // console.log("overhealed: ", overhealed);
  var numHeartsToDraw = this.game.players[0].health;
  // console.log("HP before overhealed check:", this.game.players[0].health);
  // console.log("MAX HP before overhealed check:", this.game.players[0].maxHealth);
  if (overhealed === true){
    numHeartsToDraw = this.game.players[0].maxHealth;
  }
  // console.log("overhealed boolean:",overhealed, "health to draw:", numHeartsToDraw);
  for (var i = 0; i < numHeartsToDraw; i++) {
    this.ele.currentPlayerHealth.innerHTML += '<i class="material-icons hp-icon">favorite</i>';
  }
  for (var i = 0; i < this.game.players[0].healthDifference(); i++) {
    this.ele.currentPlayerHealth.innerHTML += '<i class="material-icons hp-icon">favorite_outline</i>';
  }
};// renderCurrentPlayerHealth = function [end]
View.prototype.renderCurrentPlayerArrows = function(){
  for(var i = 0; i < this.ele.currentPlayerArrows.length; i++){
    this.ele.currentPlayerArrows[i].src = "https://i.imgur.com/e6hASp9.png";
    this.ele.currentPlayerArrows[i].style.display = "inline-block";
    if(i >= this.game.players[0].arrows) this.ele.currentPlayerArrows[i].style.display = "none";
  }
};// renderCurrentPlayerArrows = function [end]
View.prototype.renderPlayerList = function(){
  for (var i = 0; i < this.game.allPlayers.length; i++){
    this.renderPlayerListItem(i);
  }
  // this.updateHealthBars(); // doesn't fix new game health bar display bug
};// renderPlayerList = function [end]
View.prototype.renderHintCard = function(){
  // HINT CARD
  this.ele.hintElement.innerHTML = this.hint.all[Math.floor(Math.random()*this.hint.all.length)];
};// renderHintCard = function [end]

module.exports = View;