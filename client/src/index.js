Game = require('./bang_game/game');
Player = require('./bang_game/player');
Dice = require('./bang_game/dice');
Hint = require('./bang_game/hint');
GameState = require("./bang_game/gameState.js");
playSound = require("./bang_game/play_sound.js");
View = require("./bang_game/view.js");

// NEWING UP OBJECTS
var hint = new Hint;
var players = new Array(8);
for (var i = 0; i < players.length; i++){
  players[i] = new Player("Player " + (i+1) )
};

var characterMaxHealthValues = true;
var game = new Game(new Dice(), players, characterMaxHealthValues);
game.setup();
console.log("the new game object:", game);
var gameState = new GameState(game);
game = gameState.load();
console.log("the game object that is used:", game);
var view = new View(gameState, game);

window.onload = function(){
  view.grabElements();
  view.hint = hint;
  view.setup();
}; // END OF WINDOW ONLOAD



  // // TARGET BUTTONS
  // var shootButton = document.getElementById('shoot-button'),
  // roleButton = document.getElementById('role-button');

  // // TARGET PLAYER LIST
  // var player1 = document.getElementById('player-1'),
  // player2 = document.getElementById('player-2'),
  // player3 = document.getElementById('player-3'),
  // player4 = document.getElementById('player-4'),
  // player5 = document.getElementById('player-5'),
  // player6 = document.getElementById('player-6'),
  // player7 = document.getElementById('player-7'),
  // player8 = document.getElementById('player-8'),
  // currentPlayer = document.getElementById('current-player');

  // // // POPULATE CURRENT PLAYER
  // var currentPlayerAvatarReveal = document.getElementById('current-player-avatar-reveal');
  // var currentPlayerCharacter = document.getElementById('current-player-character');

  //previously most of the function's functionality was performed inline here in window.onload
  //now defining the function here and invoking it

  // DICE CLICKS DISABLED BEFORE DICE ARE ROLLED TO PREVENT ROLL DICE BUTTON LOCKOUT.

  // EVENT LISTENERS
  // BUTTONS
  // DEFAULTS
  // ROLL DICE BUTTON



  // // PLAYER LIST
  // player1.onclick = function(){
  //   if(view.game.players[0].target === view.game.allPlayers[0]){
  //     view.game.players[0].target = null;
  //   }else{
  //     view.game.players[0].target = view.game.allPlayers[0];
  //   }
  //   targetPlayer(this, game);
  //   view.enableShootButton()
  //   if (view.game.canHeal()) {
  //     view.setHealButtonOnClick();
  //   }
  //   else{
  //     view.setHealButtonOnClick(null);
  //   }
  // }
  // player2.onclick = function(){
  //   if(view.game.players[0].target === view.game.allPlayers[1]){
  //     view.game.players[0].target = null;
  //   }else{
  //     view.game.players[0].target = view.game.allPlayers[1];
  //   }
  //   targetPlayer(this, game);
  //   view.enableShootButton()
  //   if (view.game.canHeal()) {
  //     view.setHealButtonOnClick();
  //   }
  //   else{
  //     view.setHealButtonOnClick(null);
  //   }
  // }
  // player3.onclick = function(){
  //   if(view.game.players[0].target === view.game.allPlayers[2]){
  //     view.game.players[0].target = null;
  //   }else{
  //     view.game.players[0].target = view.game.allPlayers[2];
  //   }
  //   targetPlayer(this, game);
  //   view.enableShootButton();
  //   if (view.game.canHeal()) {
  //     view.setHealButtonOnClick();
  //   }
  //   else{
  //     view.setHealButtonOnClick(null);
  //   }
  // }
  // player4.onclick = function(){
  //   if(view.game.players[0].target === view.game.allPlayers[3]){
  //     view.game.players[0].target = null;
  //   }else{
  //     view.game.players[0].target = view.game.allPlayers[3];
  //   }
  //   targetPlayer(this, game);
  //   view.enableShootButton();
  //   if (view.game.canHeal()) {
  //     view.setHealButtonOnClick();
  //   }
  //   else{
  //     view.setHealButtonOnClick(null);
  //   }
  // }
  // player5.onclick = function(){
  //   if(view.game.players[0].target === view.game.allPlayers[4]){
  //     view.game.players[0].target = null;
  //   }else{
  //     view.game.players[0].target = view.game.allPlayers[4];
  //   }
  //   targetPlayer(this, game);
  //   view.enableShootButton();
  //   if (view.game.canHeal()) {
  //     view.setHealButtonOnClick();
  //   }
  //   else{
  //     view.setHealButtonOnClick(null);
  //   }
  // }
  // player6.onclick = function(){
  //   if(view.game.players[0].target === view.game.allPlayers[5]){
  //     view.game.players[0].target = null;
  //   }else{
  //     view.game.players[0].target = view.game.allPlayers[5];
  //   }
  //   targetPlayer(this, game);
  //   view.enableShootButton();
  //   if (view.game.canHeal()) {
  //     view.setHealButtonOnClick();
  //   }
  //   else{
  //     view.setHealButtonOnClick(null);
  //   }
  // }
  // player7.onclick = function(){
  //   if(view.game.players[0].target === view.game.allPlayers[6]){
  //     view.game.players[0].target = null;
  //   }else{
  //     view.game.players[0].target = view.game.allPlayers[6];
  //   }
  //   targetPlayer(this, game);
  //   view.enableShootButton();
  //   if (view.game.canHeal()) {
  //     view.setHealButtonOnClick();
  //   }
  //   else{
  //     view.setHealButtonOnClick(null);
  //   }
  // }
  // player8.onclick = function(){
  //   if(view.game.players[0].target === view.game.allPlayers[7]){
  //     view.game.players[0].target = null;
  //   }else{
  //     view.game.players[0].target = view.game.allPlayers[7];
  //   }
  //   targetPlayer(this, game);
  //   view.enableShootButton();
  //   if (view.game.canHeal()) {
  //     view.setHealButtonOnClick();
  //   }
  //   else{
  //     view.setHealButtonOnClick(null);
  //   }
  // }



  //////////////////////////////////////
  //  WINDOW ONLOAD USED TO END HERE  //
  //////////////////////////////////////



  //////////////////////////////////
  // WINDOW ONLOAD ENDS SOMEWHERE //
  //////////////////////////////////



  // // SELECT PLAYER FROM LIST
  // var targetPlayer = function(selection){
  //   // TARGET HEALTH BAR OF SELECTED PLAYER
  //   var healthBar = selection.getElementsByClassName('progress')[0];
  //   // TARGET PREVIOUSLY SELECTED PLAYER
  //   var previouslySelected = document.getElementsByClassName('collection-item avatar player red lighten-4')[0] || document.getElementsByClassName('collection-item grey darken-3 avatar player')[0];
  //   // TARGET HEALTH BAR OF PREVIOUSLY SELECTED PLAYER
  //   if (previouslySelected) var targetedHealthBar = previouslySelected.getElementsByClassName('progress')[0];

  //   // RESET PREVIOUSLY SELECTED PLAYER COLOURS
  //   if(previouslySelected && previouslySelected != selection){
  //     if(previouslySelected.className === 'collection-item grey darken-3 avatar player'){
  //       previouslySelected.setAttribute('class', 'collection-item avatar red darken-4 player');
  //     }else{
  //       previouslySelected.setAttribute('class', 'collection-item avatar player');
  //       targetedHealthBar.setAttribute('class', 'progress red lighten-4');
  //     }
  //   }

  //   // IF SELECTED PLAYER IS CURRENTLY UNSELECTED, SELECT THEM
  //   if(selection.className === "collection-item avatar player"){
  //     selection.setAttribute('class', 'collection-item avatar player red lighten-4');
  //     healthBar.setAttribute('class', 'progress white');

  //   // IF SELECTED PLAYER IS RED, MAKE THEM BLACK
  //   }else if(selection.className === "collection-item avatar red darken-4 player"){
  //     selection.setAttribute('class', 'collection-item grey darken-3 avatar player');
  //     // IF SELECTED PLAYER IS BLACK, MAKE THEM RED
  //   }else if(selection.className === "collection-item grey darken-3 avatar player"){
  //   selection.setAttribute('class', 'collection-item avatar red darken-4 player');
  //    // IF SELECTED PLAYER IS CURRENTLY SELECTED, DESELECT THEM
  //   }else{
  //     selection.setAttribute('class', 'collection-item avatar player');
  //     healthBar.setAttribute('class', 'progress red lighten-4');
  //   }
  // }

/////////////////////////////
// WINDOW ONLOAD ENDS HERE //
/////////////////////////////


// var endGame = function(){
//   // TRIGGER END GAME MODAL
//   // DISABLE BUTTONS
//   console.log("saving finished game");
//   // removes targets from all players to allow saving without JSON.stringify throwing a "gameState.js:12 Uncaught TypeError: Converting circular structure to JSON"
//   // (can't save a player object with a player object nested in it - definitely not if it's the SAME player object (if targetting yourself and turn end-)
//   // see also: https://github.com/isaacs/json-stringify-safe/blob/master/README.md
//   for (var i = 0; i < this.players.length;i++){
//     this.players[i].target = null;
//   }
//   view.gameState.save();
//   view.game.end();
// };

////////////////////////////////////////////////////////////
//    'view.game.dice.unsave(view.game.dice.all[indexOf(view.game.dice.all[index])])'   //
//      -Craig                                            //
////////////////////////////////////////////////////////////
