Game = require('./bang_game/game');
Player = require('./bang_game/player');
Dice = require('./bang_game/dice');
Hint = require('./bang_game/hint');
View = require('./bang_game/view');


// NEWING UP OBJECTS
var dice = new Dice;
var hint = new Hint;
var players = new Array(8);
for (var i = 0; i < players.length; i++){
  players[i] = new Player("Player " + (i+1) )
}
var dice = new Dice();
var game = new Game(dice, players);
game.setup();

window.onload = function(){
  var view = new View(game);
  view.getElementsObject()
  console.log(view.ele);

}// window.onload end


var viewDefaults = function(){



}// view defaults func end


var updateCurrentPlayer = function(){
  currentPlayerHealth.innerHTML = "";
  currentPlayerAvatar.src = game.players[0].character.imgUrl;
  currentPlayerAvatarReveal.src = game.players[0].character.imgUrl;
  currentPlayerNameRole.innerHTML = "<b>" + game.players[0].name + "</b> - " + game.players[0].character.name;
  currentPlayerCharacter.innerHTML = game.players[0].character.name + '<i class="material-icons right">close</i>';
  currentPlayerAbility.innerText = game.players[0].character.abilityDescription;
  for(var i = 0; i < game.players[0].arrows; i++){
   currentPlayerArrows.src = "arrowicon.png";
 }
   for (var i = 0; i < game.players[0].health; i++) {
    currentPlayerHealth.innerHTML = currentPlayerHealth.innerHTML + '<i class="material-icons hp-icon">favorite</i>';
  }

  for (var i = 0; i < game.players[0].healthDifference(); i++) {
    currentPlayerHealth.innerHTML = currentPlayerHealth.innerHTML + '<i class="material-icons hp-icon">favorite_outline</i>';
  }
}//update current player view func end




drawArrows(game); // was here, so:
view.renderArrowPile(); // needs to happen here after refactor

// EVENT LISTENERS
// BUTTONS

//these used to be here:
healButton.onclick = null;
shootButton.onclick = null;
endTurnButton.onclick = null;

// so make these to do the behaviour expected:
view.disableHealButton()
view.disableShootButton()
view.disableEndTurnButton()



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
    savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game);
  }
  dice2.onclick = function(){
    var dice2Value = dice.all[1];
    if(dice2Value != 5) dice.save(dice2Value);
    dice2.onclick = null;
    dice2.style.opacity = 0.5;
    savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game);
  }
  dice3.onclick = function(){
    var dice3Value = dice.all[2];
    if(dice3Value != 5) dice.save(dice3Value);
    dice3.onclick = null;
    dice3.style.opacity = 0.5;
    savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game);
  }
  dice4.onclick = function(){
    var dice4Value = dice.all[3];
    if(dice4Value != 5) dice.save(dice4Value);
    dice4.onclick = null;
    dice4.style.opacity = 0.5;
    savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game);
  }
  dice5.onclick = function(){
    var dice5Value = dice.all[4];
    if(dice5Value != 5) dice.save(dice5Value);
    dice5.onclick = null;
    dice5.style.opacity = 0.5;
    savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game);
  }
}

var rollDiceDefault = function(){
  diceClickEnable();
  rollDice();

  if(dice.canRoll === false){
    this.onclick = null;
    rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    game.addToActionCounters();
  }
  savedDiceFull();
}

rollDiceButton.onclick = rollDiceDefault;

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
  (game.canShoot1() || game.canShoot2()) ? enableShootButton(game.players[0].target) : disableShootButton();
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
  (game.canShoot1() || game.canShoot2()) ? enableShootButton(game.players[0].target) : disableShootButton(shootButton);
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
  (game.canShoot1() || game.canShoot2()) ? enableShootButton(healButton,shootButton, endTurnButton, game.players[0].target, allHealthBars, game) : disableShootButton(shootButton);
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
  (game.canShoot1() || game.canShoot2()) ? enableShootButton(healButton,shootButton, endTurnButton, game.players[0].target, allHealthBars, game) : disableShootButton(shootButton);
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
  (game.canShoot1() || game.canShoot2()) ? enableShootButton(healButton,shootButton, endTurnButton, game.players[0].target, allHealthBars, game) : disableShootButton(shootButton);
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
  (game.canShoot1() || game.canShoot2()) ? enableShootButton(healButton,shootButton, endTurnButton, game.players[0].target, allHealthBars, game) : disableShootButton(shootButton);
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
  (game.canShoot1() || game.canShoot2()) ? enableShootButton(healButton,shootButton, endTurnButton, game.players[0].target, allHealthBars, game) : disableShootButton(shootButton);
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
  (game.canShoot1() || game.canShoot2()) ? enableShootButton(healButton,shootButton, endTurnButton, game.players[0].target, allHealthBars, game) : disableShootButton(shootButton);
  if (game.canHeal()) {
    enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
  }
  else{
    disableHealButton(healButton);
  }
}



/////////////////////////////
// WINDOW ONLOAD ENDS HERE //
/////////////////////////////



var updateHealthBars = function(){
for(i = 0; i < allHealthBars.length; i++){
  allHealthBars[i].style.width = game.allPlayers[i].healthAsPercentage() + "%";
  if(game.allPlayers[i].health <= 0) document.getElementById("player-" + (i + 1)).onclick = null;
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
}
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
  if (game.checkActions() <= 0){
    enableEndTurnButton();
  }
}
}

var disableHealButton = function(){
healButton.setAttribute('class', 'waves-effect waves-light btn disabled');
healButton.onclick = null;
}

var enableEndTurnButton = function(){
endTurnButton.setAttribute('class','waves-effect waves-light btn red darken-4');
endTurnButton.onclick = function(){
  game.threeGatling();
  game.dynamiteExplodes();
  game.nextTurn();
  displayCurrentPlayerArrows();
  dispatchEvent(new Event('load'));
  endTurnButton.setAttribute('class', 'waves-effect waves-light btn disabled');
  rollDiceButton.setAttribute('class', 'waves-effect waves-light btn red darken-4');
}
}
var enableRollDiceButton = function(rollDiceButton, game){
rollDiceButton.setAttribute('class','waves-effect waves-light btn red darken-4');
rollDiceButton.onclick = function(){
  diceClickEnable();
  rollDice(dice, diceElements, game);

  if(dice.canRoll === false){
    this.onclick = null;
    rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    game.addToActionCounters();
  }
  savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game);
}

}

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
displayCurrentPlayerArrows();

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

var savedDiceFull = function(){
  if(dice.canRoll() === false){
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

////////////////////////////////////////////////////////////
//    'dice.unsave(dice.all[indexOf(dice.all[index])])'   //
//      -Craig                                            //
////////////////////////////////////////////////////////////