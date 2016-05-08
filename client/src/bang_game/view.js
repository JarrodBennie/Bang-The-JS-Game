Game = require('./game');
Player = require('./player');
Dice = require('./dice');
Hint = require('./hint');

var View = function(gameState, game){
  this.ele = {};
  this.docBody = {};
  this.gameState = gameState;
  this.game = game;
  this.hint;
};// View constructor end

//needs changing:
View.prototype.grabElements = function(){
  this.docBody = document.getElementsByTagName("body");
  // TARGET ALL HEALTH BARS
  this.ele.allHealthBars = document.getElementsByClassName('determinate');
  // TARGET BUTTONS
  this.ele.rollDiceButton = document.getElementById('roll-dice-button');
  this.ele.healButton = document.getElementById('heal-button');
  this.ele.shootButton = document.getElementById('shoot-button');
  this.ele.endTurnButton = document.getElementById('end-turn-button');
  this.ele.roleButton = document.getElementById('role-button');
  this.ele.newGameButton = document.getElementById("new-game-button");


  // TARGET DICE IMAGES
  this.ele.dice1 = document.getElementById('dice-1');
  this.ele.dice2 = document.getElementById('dice-2');
  this.ele.dice3 = document.getElementById('dice-3');
  this.ele.dice4 = document.getElementById('dice-4');
  this.ele.dice5 = document.getElementById('dice-5');
  this.ele.diceElements = [this.ele.dice1, this.ele.dice2, this.ele.dice3, this.ele.dice4, this.ele.dice5];

  // TARGET PLAYER LIST ELEMENTS
  var player1 = document.getElementById('player-1');
  var player2 = document.getElementById('player-2');
  var player3 = document.getElementById('player-3');
  var player4 = document.getElementById('player-4');
  var player5 = document.getElementById('player-5');
  var player6 = document.getElementById('player-6');
  var player7 = document.getElementById('player-7');
  var player8 = document.getElementById('player-8');
  this.ele.playerListItems = [player1, player2, player3, player4, player5, player6, player7, player8];

  // TARGET PLAYER LIST PLAYER SINGLE ITEMS
  this.ele.playerList = [];
  for (var i = 1; i <= 8; i++){
    var playerListPartsObject = {};
    playerListPartsObject.sheriffIcon = document.querySelector('li.player-'+i+', i.sheriff-icon');
    playerListPartsObject.name = document.getElementById('player-'+i+'-name');
    playerListPartsObject.avatar = document.getElementById('player-'+i+'-avatar');
    playerListPartsObject.character = document.getElementById('player-'+i+'-character');
    playerListPartsObject.healthBar = document.getElementById('player-'+i+'-health-bar');
    playerListPartsObject.healthDiv = document.getElementById('player-'+i+'-health-div');
    playerListPartsObject.currentPlayerDiv = document.getElementById('player-'+i+'-cp-div');
    playerListPartsObject.currentPlayerText = document.getElementById('current-player-1')

    this.ele.playerList.push(playerListPartsObject);
  }// for loop 8 [end]

  // TARGET CURRENT PLAYER
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


// RENDER METHODS // //////////////////////////////////////////////////

View.prototype.renderStart = function(){
  console.log("view.renderStart invoked");


};// renderStart = function [end]

View.prototype.setNewGameButtonOnClick = function(remove){
  this.ele.newGameButton.onclick = function(){
    this.gameState.forceNew = true;
    this.game = this.gameState.load();
    this.gameState.forceNew = false;
    // gameState.save();
    dispatchEvent(new Event('load'));
  }.bind(this);
  if (remove === null){
    this.ele.newGameButton.onclick = null;
  }
}


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
  if(this.game.players[0].health > this.game.players[0].maxHealth) overhealed = true;
  var numHeartsToDraw = (overhealed) ? this.game.players[0].maxHealth : this.game.players[0].health
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
    console.log(this.game.allPlayers.length);
    this.renderPlayerListItem(i);
  }
};// renderPlayerList = function [end]

View.prototype.renderPlayerListItem = function(playerIndex){

  var playerObject = this.ele.playerList[playerIndex];
  var playerItem = this.ele.playerListItems[playerIndex];

  playerObject.name.setAttribute("class", "title grey-text text-darken-4");
  playerObject.character.setAttribute("class", "grey-text text-darken-4");
  playerObject.currentPlayerDiv.style.display = "none";
  playerObject.healthDiv.style.display = "block";
  playerObject.healthDiv.setAttribute('class', 'progress red lighten-4')
  playerItem.setAttribute("class", "collection-item avatar player");
  playerObject.currentPlayerText.innerText = 'Current Player';

  if(this.game.allPlayers[playerIndex] == this.game.players[playerIndex]){
    playerObject.name.innerHTML = "<b>" + this.game.allPlayers[playerIndex].name;
    playerObject.name.setAttribute("class", "title white-text");
    playerObject.character.setAttribute("class", "white-text");
    playerObject.currentPlayerDiv.style.display = "inline";
    playerObject.healthDiv.style.display = "none";
    playerItem.setAttribute("class", "collection-item avatar red darken-4 player");

  }else if(this.game.allPlayers[playerIndex] == this.game.players[this.game.players.length - 1]){
    playerObject.name.innerHTML = "<b>" + this.game.allPlayers[playerIndex].name + "</b>" + ' - PREVIOUS';
  }else if(this.game.allPlayers[playerIndex] == this.game.players[1]){
    playerObject.name.innerHTML = "<b>" + this.game.allPlayers[playerIndex].name + "</b>" + ' - NEXT';
  }else{
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
    playerItem.setAttribute('class', 'collection-item avatar grey lighten-4 player');
    playerObject.currentPlayerText.innerText = 'DEAD';
    playerObject.currentPlayerText.setAttribute('class', 'grey-text text-darken-4');
    playerObject.currentPlayerDiv.style.display = "inline";
    playerObject.healthDiv.style.display = "none";
  }

  playerObject.healthBar.style.width = this.game.allPlayers[playerIndex].healthAsPercentage() + "%"
};// renderPlayerListItem = function [end]


View.prototype.renderHintCard = function(){
  // HINT CARD
  this.ele.hintElement.innerHTML = this.hint.all[Math.floor(Math.random()*this.hint.all.length)];
};// renderHintCard = function [end]

// //////////////////////////////////////////////////
// //////////////////////////////////////////////////
// //////////////////////////////////////////////////
module.exports = View;