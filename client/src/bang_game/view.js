Game = require('./bang_game/game');
Player = require('./bang_game/player');
Dice = require('./bang_game/dice');
Hint = require('./bang_game/hint');

var View = function(){
  this.ele = {};



};// View constructor end

View.prototype.getElementsObject = function(){
  // TARGET ALL HEALTH BARS
  this.ele.allHealthBars = document.getElementsByClassName('determinate');
  // TARGET BUTTONS
  this.ele.rollDiceButton = document.getElementById('roll-dice-button');
  this.ele.healButton = document.getElementById('heal-button');
  this.ele.shootButton = document.getElementById('shoot-button');
  this.ele.endTurnButton = document.getElementById('end-turn-button');
  this.ele.roleButton = document.getElementById('role-button');

  // TARGET DICE IMAGES
  var dice1 = document.getElementById('dice-1');
  var dice2 = document.getElementById('dice-2');
  var dice3 = document.getElementById('dice-3');
  var dice4 = document.getElementById('dice-4');
  var dice5 = document.getElementById('dice-5');
  this.ele.diceElements = [dice1, dice2, dice3, dice4, dice5];

  // TARGET PLAYER LIST
  var player1 = document.getElementById('player-1'),
  player2 = document.getElementById('player-2'),
  player3 = document.getElementById('player-3'),
  player4 = document.getElementById('player-4'),
  player5 = document.getElementById('player-5'),
  player6 = document.getElementById('player-6'),
  player7 = document.getElementById('player-7'),
  player8 = document.getElementById('player-8'),
  this.ele.playerListElements = [player1, player2, player3, player4, player5, player6, player7, player8];
  this.ele.currentPlayer = document.getElementById('current-player');

  // POPULATE CURRENT PLAYER
  var currentPlayerAvatar = document.getElementById('current-player-avatar');
  var currentPlayerAvatarReveal = document.getElementById('current-player-avatar-reveal');
  var currentPlayerNameRole = document.getElementById('current-player-name-character');
  var currentPlayerCharacter = document.getElementById('current-player-character');
  var currentPlayerAbility = document.getElementById('current-player-ability');
  var sheriffIcon = document.getElementById('sheriff-icon');
  var currentPlayerHealth = document.getElementById('current-player-health');
  var currentPlayerArrows = document.getElementById('current-player-arrows');
}// getElementsObject method end