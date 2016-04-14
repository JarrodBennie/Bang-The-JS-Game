Game = require('./game');
Player = require('./player');
Dice = require('./dice');
Hint = require('./hint');

var View = function(){
  this.ele = {};
  this.docBody = {};


};// View constructor end

//needs changing:
View.prototype.getElementsObject = function(){
  this.docBody = document.getElementsByTagName("body");
  console.log(this.docBody);
  // TARGET ALL HEALTH BARS
  this.ele.allHealthBars = document.getElementsByClassName('determinate');
  // TARGET BUTTONS
  this.ele.rollDiceButton = document.getElementById('roll-dice-button');
  this.ele.healButton = document.getElementById('heal-button');
  this.ele.shootButton = document.getElementById('shoot-button');
  this.ele.endTurnButton = document.getElementById('end-turn-button');
  this.ele.roleButton = document.getElementById('role-button');

  // TARGET DICE IMAGES
  var dice1 = document.getElementById('dice-1'),
  dice2 = document.getElementById('dice-2'),
  dice3 = document.getElementById('dice-3'),
  dice4 = document.getElementById('dice-4'),
  dice5 = document.getElementById('dice-5');
  this.ele.diceElements = [dice1, dice2, dice3, dice4, dice5];

  // TARGET PLAYER LIST ELEMENTS
  var player1 = document.getElementById('player-1'),
  player2 = document.getElementById('player-2'),
  player3 = document.getElementById('player-3'),
  player4 = document.getElementById('player-4'),
  player5 = document.getElementById('player-5'),
  player6 = document.getElementById('player-6'),
  player7 = document.getElementById('player-7'),
  player8 = document.getElementById('player-8');
  this.ele.playerListElements = [player1, player2, player3, player4, player5, player6, player7, player8];
  this.ele.currentPlayer = document.getElementById('current-player');

  // TARGET CURRENT PLAYER
  this.ele.currentPlayerAvatar = document.getElementById('current-player-avatar');
  this.ele.currentPlayerAvatarReveal = document.getElementById('current-player-avatar-reveal');
  this.ele.currentPlayerNameRole = document.getElementById('current-player-name-character');
  this.ele.currentPlayerCharacter = document.getElementById('current-player-character');
  this.ele.currentPlayerAbility = document.getElementById('current-player-ability');
  this.ele.currentPlayerHealth = document.getElementById('current-player-health');
  this.ele.currentPlayerArrows = document.getElementById('current-player-arrows');

  // TARGET HINT CARD
  this.ele.hintElement = document.getElementById('hint');

  // TARGET PLAYER LIST PLAYER SINGLE ITEMS
  this.ele.playerListParts = [];
  for (var i = 1; i <= 8; i++){
    var playerListPartsObject = {};
    playerListPartsObject.sheriffIcon = document.querySelector('li.player-'+i+', i.sheriff-icon');
    playerListPartsObject.name = document.getElementById('player-'+i+'-name');
    playerListPartsObject.avatar = document.getElementById('player-'+i+'-avatar');
    playerListPartsObject.character = document.getElementById('player-'+i+'-character');
    playerListPartsObject.healthBar = document.getElementById('player-'+i+'-health-bar');
    playerListPartsObject.healthDiv = document.getElementById('player-'+i+'-health-div');
    playerListPartsObject.cpDiv = document.getElementById('player-'+i+'-cp-div');
    this.ele.playerListParts.push(playerListPartsObject);
  }// for loop 8 [end]

  // TARGET ARROW PILE PICTURES
  this.ele.arrowPileArrows = [];
  for (var i = 1; i <= 9; i++){
    var currentArrow = document.getElementById('arrow-' + i);
    this.ele.arrowPileArrows.push(currentArrow);
  }



}// getElementsObject method [end]

// RENDER METHODS // //////////////////////////////////////////////////

View.prototype.renderStart = function(){
  console.log("view.renderStart invoked");


};// renderStart = function [end]


View.prototype.renderArrowPile = function(){
  for (var i = 1; i <= 9; i++){
    currentArrow.src = "http://i.imgur.com/pUn7Uru.png";
    currentArrow.style.visibility = "visible";
    if(i >= game.totalArrows) currentArrow.style.visibility = "hidden";
  }; // loop [end]
};// renderArrowPile = function [end]


var displayCurrentPlayerArrows = function(){
for(var i = 0; i < 9; i++){
  var currentPlayerArrows = document.getElementById('current-player-arrow-' + (i+1));
  currentPlayerArrows.src = "arrowicon.png";
  currentPlayerArrows.style.display = "inline-block";
  if(i >= game.players[0].arrows) currentPlayerArrows.style.display = "none";
}
}


View.prototype.renderHintCard = function(){
  // HINT CARD
  this.ele.hintElement.innerHTML = hint.all[Math.floor(Math.random()*hint.all.length)];
};// renderHintCard = function [end]

View.prototype.renderPlayerList = function(){
  // POPULATE PLAYER LIST
  // POPULATE PLAYER 1

  //arrays of sidebar list elements in order
  this.ele.playerListParts;
  this.ele.playerListElements;

  player1Name.setAttribute("class", "title grey-text text-darken-4");
  player1Character.setAttribute("class", "grey-text text-darken-4");
  player1CpDiv.style.display = "none";
  player1HealthDiv.style.display = "block";
  player1HealthDiv.setAttribute('class', 'progress red lighten-4')
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

  if(game.allPlayers[0].role.name === "Sheriff"){
    player1Avatar.src = game.allPlayers[0].role.imgUrl;
    player1Character.innerText = game.allPlayers[0].role.name;  
  }else{
    player1Avatar.src = game.allPlayers[0].character.imgUrl;
    player1Character.innerText = game.allPlayers[0].character.name;
  }

  player1HealthBar.style.width = game.allPlayers[0].healthAsPercentage() + "%"

  // POPULATE PLAYER 2
 

  player2Name.setAttribute("class", "title grey-text text-darken-4");
  player2Character.setAttribute("class", "grey-text text-darken-4");
  player2CpDiv.style.display = "none";
  player2HealthDiv.style.display = "block";
  player2HealthDiv.setAttribute('class', 'progress red lighten-4')
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

  if(game.allPlayers[1].role.name === "Sheriff"){
    player2Avatar.src = game.allPlayers[1].role.imgUrl;
    player2Character.innerText = game.allPlayers[1].role.name;  
  }else{
    player2Avatar.src = game.allPlayers[1].character.imgUrl;
    player2Character.innerText = game.allPlayers[1].character.name;
  }

  player2HealthBar.style.width = game.allPlayers[1].healthAsPercentage() + "%"

  // POPULATE PLAYER 3
  var player3Name = document.getElementById('player-3-name');
  var player3Avatar = document.getElementById('player-3-avatar');
  var player3Character = document.getElementById('player-3-character');
  var player3HealthBar = document.getElementById('player-3-health-bar');
  var player3HealthDiv = document.getElementById('player-3-health-div');
  var player3CpDiv = document.getElementById('player-3-cp-div');

  player3Name.setAttribute("class", "title grey-text text-darken-4");
  player3Character.setAttribute("class", "grey-text text-darken-4");
  player3CpDiv.style.display = "none";
  player3HealthDiv.style.display = "block";
  player3HealthDiv.setAttribute('class', 'progress red lighten-4')
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

  if(game.allPlayers[2].role.name === "Sheriff"){
    player3Avatar.src = game.allPlayers[2].role.imgUrl;
    player3Character.innerText = game.allPlayers[2].role.name;  
  }else{
    player3Avatar.src = game.allPlayers[2].character.imgUrl;
    player3Character.innerText = game.allPlayers[2].character.name;
  }

  player3HealthBar.style.width = game.allPlayers[2].healthAsPercentage() + "%"

  // POPULATE PLAYER 4
  var player4Name = document.getElementById('player-4-name');
  var player4Avatar = document.getElementById('player-4-avatar');
  var player4Character = document.getElementById('player-4-character');
  var player4HealthBar = document.getElementById('player-4-health-bar');
  var player4HealthDiv = document.getElementById('player-4-health-div');
  var player4CpDiv = document.getElementById('player-4-cp-div');

  player4Name.setAttribute("class", "title grey-text text-darken-4");
  player4Character.setAttribute("class", "grey-text text-darken-4");
  player4CpDiv.style.display = "none";
  player4HealthDiv.style.display = "block";
  player4HealthDiv.setAttribute('class', 'progress red lighten-4')
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

  if(game.allPlayers[3].role.name === "Sheriff"){
    player4Avatar.src = game.allPlayers[3].role.imgUrl;
    player4Character.innerText = game.allPlayers[3].role.name;  
  }else{
    player4Avatar.src = game.allPlayers[3].character.imgUrl;
    player4Character.innerText = game.allPlayers[3].character.name;
  }

  player4HealthBar.style.width = game.allPlayers[3].healthAsPercentage() + "%"

  // POPULATE PLAYER 5
  var player5Name = document.getElementById('player-5-name');
  var player5Avatar = document.getElementById('player-5-avatar');
  var player5Character = document.getElementById('player-5-character');
  var player5HealthBar = document.getElementById('player-5-health-bar');
  var player5HealthDiv = document.getElementById('player-5-health-div');
  var player5CpDiv = document.getElementById('player-5-cp-div');

  player5Name.setAttribute("class", "title grey-text text-darken-4");
  player5Character.setAttribute("class", "grey-text text-darken-4");
  player5CpDiv.style.display = "none";
  player5HealthDiv.style.display = "block";
  player5HealthDiv.setAttribute('class', 'progress red lighten-4')
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

  if(game.allPlayers[4].role.name === "Sheriff"){
    player5Avatar.src = game.allPlayers[4].role.imgUrl;
    player5Character.innerText = game.allPlayers[4].role.name;  
  }else{
    player5Avatar.src = game.allPlayers[4].character.imgUrl;
    player5Character.innerText = game.allPlayers[4].character.name;
  }
  player5HealthBar.style.width = game.allPlayers[4].healthAsPercentage() + "%"

  // POPULATE PLAYER 6
  var player6Name = document.getElementById('player-6-name');
  var player6Avatar = document.getElementById('player-6-avatar');
  var player6Character = document.getElementById('player-6-character');
  var player6HealthBar = document.getElementById('player-6-health-bar');
  var player6HealthDiv = document.getElementById('player-6-health-div');
  var player6CpDiv = document.getElementById('player-6-cp-div');

  player6Name.setAttribute("class", "title grey-text text-darken-4");
  player6Character.setAttribute("class", "grey-text text-darken-4");
  player6CpDiv.style.display = "none";
  player6HealthDiv.style.display = "block";
  player6HealthDiv.setAttribute('class', 'progress red lighten-4')
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

  if(game.allPlayers[5].role.name === "Sheriff"){
    player6Avatar.src = game.allPlayers[5].role.imgUrl;
    player6Character.innerText = game.allPlayers[5].role.name;  
  }else{
    player6Avatar.src = game.allPlayers[5].character.imgUrl;
    player6Character.innerText = game.allPlayers[5].character.name;
  }

  player6HealthBar.style.width = game.allPlayers[5].healthAsPercentage() + "%"

  // POPULATE PLAYER 7
  var player7Name = document.getElementById('player-7-name');
  var player7Avatar = document.getElementById('player-7-avatar');
  var player7Character = document.getElementById('player-7-character');
  var player7HealthBar = document.getElementById('player-7-health-bar');
  var player7HealthDiv = document.getElementById('player-7-health-div');
  var player7CpDiv = document.getElementById('player-7-cp-div');

  player7Name.setAttribute("class", "title grey-text text-darken-4");
  player7Character.setAttribute("class", "grey-text text-darken-4");
  player7CpDiv.style.display = "none";
  player7HealthDiv.style.display = "block";
  player7HealthDiv.setAttribute('class', 'progress red lighten-4')
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

  if(game.allPlayers[6].role.name === "Sheriff"){
    player7Avatar.src = game.allPlayers[6].role.imgUrl;
    player7Character.innerText = game.allPlayers[6].role.name;  
  }else{
    player7Avatar.src = game.allPlayers[6].character.imgUrl;
    player7Character.innerText = game.allPlayers[6].character.name;
  }
  player7HealthBar.style.width = game.allPlayers[6].healthAsPercentage() + "%"

  // POPULATE PLAYER 8
  var player8Name = document.getElementById('player-8-name');
  var player8Avatar = document.getElementById('player-8-avatar');
  var player8Character = document.getElementById('player-8-character');
  var player8HealthBar = document.getElementById('player-8-health-bar');
  var player8HealthDiv = document.getElementById('player-8-health-div');
  var player8CpDiv = document.getElementById('player-8-cp-div');

  player8Name.setAttribute("class", "title grey-text text-darken-4");
  player8Character.setAttribute("class", "grey-text text-darken-4");
  player8CpDiv.style.display = "none";
  player8HealthDiv.style.display = "block";
  player8HealthDiv.setAttribute('class', 'progress red lighten-4')
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

  if(game.allPlayers[7].role.name === "Sheriff"){
    player8Avatar.src = game.allPlayers[7].role.imgUrl;
    player8Character.innerText = game.allPlayers[7].role.name;  
  }else{
  player8Avatar.src = game.allPlayers[7].character.imgUrl;
  player8Character.innerText = game.allPlayers[7].character.name;
  }

  player8HealthBar.style.width = game.allPlayers[7].healthAsPercentage() + "%"


}//renderPlayerList = function [end]

View.prototype.functionName = function(){
  
};// functionName = function [end]





// //////////////////////////////////////////////////
module.exports = View;