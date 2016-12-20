/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(1);
	const Player = __webpack_require__(2);
	const Dice = __webpack_require__(4);
	const GameState = __webpack_require__(5);
	const playSound = __webpack_require__(3);
	
	const UI = __webpack_require__(6);
	
	var players = new Array(8);
	for (let i = 0; i < players.length; i++) {
	  players[i] = new Player("Player " + (i+1));
	}
	
	var dice = new Dice();
	var characterMaxHealthValues = true;
	
	var game = new Game(dice, players, characterMaxHealthValues);
	game.setup();
	
	var gameState = new GameState(game);
	game = gameState.load();
	dice = game.dice;
	
	window.onload = function () {
	  var newGameButton = document.getElementById("new-game-button");
	
	  newGameButton.onclick = function () {
	    gameState.forceNew = true;
	    game = gameState.load();
	    dice = game.dice;
	    gameState.forceNew = false;
	    dispatchEvent(new Event('load'));
	  }
	
	  var displayCurrentPlayerArrows = function () {
	    for (var i = 0; i < 9; i++) {
	      var currentPlayerArrows = document.getElementById('current-player-arrow-' + (i+1));
	      currentPlayerArrows.src = "https://i.imgur.com/e6hASp9.png";
	      currentPlayerArrows.style.display = "inline-block";
	      if (i >= game.players[0].arrows) currentPlayerArrows.style.display = "none";
	    }
	  }
	
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
	  var currentPlayer = document.getElementById('current-player');
	
	  // POPULATE CURRENT PLAYER
	  var currentPlayerAvatar = document.getElementById('current-player-avatar');
	  var currentPlayerAvatarReveal = document.getElementById('current-player-avatar-reveal');
	  var currentPlayerNameRole = document.getElementById('current-player-name-character');
	  var currentPlayerCharacter = document.getElementById('current-player-character');
	  var currentPlayerAbility = document.getElementById('current-player-ability');
	  var sheriffIcon = document.getElementById('sheriff-icon');
	  var currentPlayerHealth = document.getElementById('current-player-health');
	  var currentPlayerArrows = document.getElementById('current-player-arrows');
	
	  var currentPlayerDisplayDraw = function(){
	    currentPlayerAvatar.src = game.players[0].character.imgUrl;
	    currentPlayerAvatarReveal.src = game.players[0].character.imgUrl;
	    currentPlayerNameRole.innerHTML = "<b>" + game.players[0].name + "</b> - " + game.players[0].character.name;
	    currentPlayerCharacter.innerHTML = game.players[0].character.name + '<i class="material-icons right">close</i>';
	    currentPlayerAbility.innerText = game.players[0].character.abilityDescription;
	    
	    for(var i = 0; i < game.players[0].arrows; i++){
	     currentPlayerArrows.src = "https://i.imgur.com/e6hASp9.png";
	    }
	    currentPlayerArrows.display = "none";
	  }
	
	  currentPlayerDisplayDraw();
	  displayCurrentPlayerArrows();
	
	
	  var updateCurrentPlayerHealth = function(){
	    currentPlayerHealth.innerHTML = "";
	    if(game.players[0].health > game.players[0].maxHealth){
	      for (var i = 0; i < game.players[0].maxHealth; i++) {
	        currentPlayerHealth.innerHTML += '<i class="material-icons hp-icon">favorite</i>';
	      }
	    } else {
	      for (var i = 0; i < game.players[0].health; i++) {
	        currentPlayerHealth.innerHTML += '<i class="material-icons hp-icon">favorite</i>';
	      }
	    }
	    for (var i = 0; i < game.players[0].healthDifference(); i++) {
	      currentPlayerHealth.innerHTML += '<i class="material-icons hp-icon">favorite_outline</i>';
	    }
	  }
	  updateCurrentPlayerHealth();
	
	  // DRAW ARROWS
	  var drawArrows = function(){
	    for( var i=1; i <= 9; i++ ){
	      var currentArrow = document.getElementById('arrow-' + (i));
	      currentArrow.src = "https://i.imgur.com/pUn7Uru.png";
	      currentArrow.style.visibility = "visible";
	      if(i > game.totalArrows) currentArrow.style.visibility = "hidden";
	    }
	  }
	
	  // HINT CARD
	  drawArrows(game);
	
	  // EVENT LISTENERS
	  // BUTTONS
	  // ROLL DICE BUTTON
	
	  var enableRollDiceButton = function(){
	    rollDiceButton.setAttribute('class','waves-effect waves-light btn red darken-4');
	    rollDiceButton.onclick = function(){
	      diceClickEnable();
	      rollDice(dice, diceElements, game);
	      game.resolveArrows();
	      shootButtonEnableChecker()
	      ifCurrentPlayerDiesTriggerNextTurn();
	      game.checkForDeaths();
	      shootButtonEnableChecker();
	      updateCurrentPlayerHealth();
	      updateHealthBars();
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
	
	    Materialize.toast('For your eyes only...', 2000,'', function () {
	      currentPlayerAvatarReveal.src = game.players[0].role.imgUrl;
	      currentPlayerCharacter.innerHTML = game.players[0].role.name + '<i class="material-icons right">close</i>';
	      setTimeout(function () {
	        currentPlayerAvatarReveal.src = game.players[0].character.imgUrl;
	        currentPlayerCharacter.innerHTML = game.players[0].character.name + '<i class="material-icons right">close</i>';
	        roleButton.setAttribute('class', 'btn waves-effect waves-light red darken-4')
	        roleButton.onclick = roleButtonDefault;
	      }, 1500);
	    });
	  }
	
	  roleButton.onclick = roleButtonDefault;
	
	  // DICE
	  var diceClickEnable = function () {
	    dice1.style.opacity = 1;
	    dice2.style.opacity = 1;
	    dice3.style.opacity = 1;
	    dice4.style.opacity = 1;
	    dice5.style.opacity = 1;
	
	    dice1.onclick = function () {
	      var dice1Value = dice.all[0];
	      if(dice1Value != 5) dice.save(dice1Value);
	      dice1.onclick = null;
	      dice1.style.opacity = 0.5;
	
	      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState);
	    }
	    dice2.onclick = function () {
	      var dice2Value = dice.all[1];
	      if(dice2Value != 5) dice.save(dice2Value);
	      dice2.onclick = null;
	      dice2.style.opacity = 0.5;
	      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState)
	    }
	    dice3.onclick = function () {
	      var dice3Value = dice.all[2];
	      if(dice3Value != 5) dice.save(dice3Value);
	      dice3.onclick = null;
	      dice3.style.opacity = 0.5;
	      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState)
	    }
	    dice4.onclick = function () {
	      var dice4Value = dice.all[3];
	      if(dice4Value != 5) dice.save(dice4Value);
	      dice4.onclick = null;
	      dice4.style.opacity = 0.5;
	      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState)
	    }
	    dice5.onclick = function () {
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
	    if (game.players.length > 3){
	      if (game.canShoot1()){
	        enableShootButton(game.players[0].target);
	        playSound("audio/shotgun-cock.wav");
	      }
	      else if(!game.canShoot1() && !game.canShoot2()){
	        disableShootButton();
	      }
	      if(game.canShoot2()){
	        enableShootButton(game.players[0].target);
	        playSound("audio/revolver-cock.wav")
	      }
	      else if(!game.canShoot2() && !game.canShoot1()){
	        disableShootButton();
	      }
	    } else if (game.players.length === 3){
	      if (game.canShoot1() && game.canShoot2()){
	        enableShootButton(game.players[0].target);
	        playSound("audio/shotgun-cock.wav");
	      } else if (game.canShoot1()){
	        enableShootButton(game.players[0].target);
	        playSound("audio/shotgun-cock.wav");
	      }
	      else if(!game.canShoot1() && !game.canShoot2()){
	        disableShootButton();
	      }
	      if (game.canShoot1() && game.canShoot2()){
	        enableShootButton(game.players[0].target);
	        playSound("audio/shotgun-cock.wav");
	      } else if(game.canShoot2()){
	        enableShootButton(game.players[0].target);
	        playSound("audio/revolver-cock.wav")
	      }
	      else if(!game.canShoot2() && !game.canShoot1()){
	        disableShootButton();
	      }
	
	    }
	    else if (game.players.length === 2) {
	      if (game.players[0].target == game.players[1] && game.players[0].actionCounters["1"]) {
	      enableShootButton(game.players[0].target);
	      playSound("audio/shotgun-cock.wav");
	      }
	      else if (game.players[0].target == game.players[1] && game.players[0].actionCounters["2"]) {
	      enableShootButton(game.players[0].target);
	        playSound("audio/revolver-cock.wav")
	      }
	      else if (game.players[0].target == game.players[0]) {
	        console.log("You can't shoot yourself, try shooting the other surviving player");
	        disableShootButton();
	      }
	    }
	    else if (game.players.length < 2) {
	      if (game.players[0].target == game.players[0] && (game.players[0].actionCounters["1"] || game.players[0].actionCounters["2"])) {
	        console.log("You can't shoot yourself - the game should be over, you're the only player alive");
	        disableShootButton();
	      }
	    }
	  }
	
	  // PLAYER LIST
	  // player1.onclick = function(){
	  //   if(game.players[0].target === game.allPlayers[0]){
	  //     game.players[0].target = null;
	  //   }else{
	  //     game.players[0].target = game.allPlayers[0];
	  //   }
	  //   targetPlayer(this, game);
	  //   shootButtonEnableChecker()
	  //   if (game.canHeal()) {
	  //     enableHealButton(game.players[0].target);
	  //   }
	  //   else{
	  //     disableHealButton(healButton);
	  //   }
	  // }
	  // player2.onclick = function(){
	  //   if(game.players[0].target === game.allPlayers[1]){
	  //     game.players[0].target = null;
	  //   }else{
	  //     game.players[0].target = game.allPlayers[1];
	  //   }
	  //   targetPlayer(this, game);
	  //   shootButtonEnableChecker()
	  //   if (game.canHeal()) {
	  //     enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
	  //   }
	  //   else{
	  //     disableHealButton(healButton);
	  //   }
	  // }
	  // player3.onclick = function(){
	  //   if(game.players[0].target === game.allPlayers[2]){
	  //     game.players[0].target = null;
	  //   }else{
	  //     game.players[0].target = game.allPlayers[2];
	  //   }
	  //   targetPlayer(this, game);
	  //   shootButtonEnableChecker();
	  //   if (game.canHeal()) {
	  //     enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
	  //   }
	  //   else{
	  //     disableHealButton(healButton);
	  //   }
	  // }
	  // player4.onclick = function(){
	  //   if(game.players[0].target === game.allPlayers[3]){
	  //     game.players[0].target = null;
	  //   }else{
	  //     game.players[0].target = game.allPlayers[3];
	  //   }
	  //   targetPlayer(this, game);
	  //   shootButtonEnableChecker();
	  //   if (game.canHeal()) {
	  //     enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
	  //   }
	  //   else{
	  //     disableHealButton(healButton);
	  //   }
	  // }
	  // player5.onclick = function(){
	  //   if(game.players[0].target === game.allPlayers[4]){
	  //     game.players[0].target = null;
	  //   }else{
	  //     game.players[0].target = game.allPlayers[4];
	  //   }
	  //   targetPlayer(this, game);
	  //   shootButtonEnableChecker();
	  //   if (game.canHeal()) {
	  //     enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
	  //   }
	  //   else{
	  //     disableHealButton(healButton);
	  //   }
	  // }
	  // player6.onclick = function(){
	  //   if(game.players[0].target === game.allPlayers[5]){
	  //     game.players[0].target = null;
	  //   }else{
	  //     game.players[0].target = game.allPlayers[5];
	  //   }
	  //   targetPlayer(this, game);
	  //   shootButtonEnableChecker();
	  //   if (game.canHeal()) {
	  //     enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
	  //   }
	  //   else{
	  //     disableHealButton(healButton);
	  //   }
	  // }
	  // player7.onclick = function(){
	  //   if(game.players[0].target === game.allPlayers[6]){
	  //     game.players[0].target = null;
	  //   }else{
	  //     game.players[0].target = game.allPlayers[6];
	  //   }
	  //   targetPlayer(this, game);
	  //   shootButtonEnableChecker();
	  //   if (game.canHeal()) {
	  //     enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
	  //   }
	  //   else{
	  //     disableHealButton(healButton);
	  //   }
	  // }
	  // player8.onclick = function(){
	  //   if(game.players[0].target === game.allPlayers[7]){
	  //     game.players[0].target = null;
	  //   }else{
	  //     game.players[0].target = game.allPlayers[7];
	  //   }
	  //   targetPlayer(this, game);
	  //   shootButtonEnableChecker();
	  //   if (game.canHeal()) {
	  //     enableHealButton(healButton, endTurnButton, game.players[0].target, allHealthBars, game);
	  //   }
	  //   else{
	  //     disableHealButton(healButton);
	  //   }
	  // }
	
	  //////////////////////////////////////
	  //  WINDOW ONLOAD USED TO END HERE  //
	  //////////////////////////////////////
	
	  //////////////////////////////////
	  // WINDOW ONLOAD ENDS SOMEWHERE //
	  //////////////////////////////////
	
	  var updateHealthBars = function () {
	    for (i = 0; i < allHealthBars.length; i++) {
	      allHealthBars[i].style.width = game.allPlayers[i].healthAsPercentage() + "%";
	      var p = document.getElementById("player-" + (i + 1));
	      var pChar = document.getElementById("player-" + (i + 1) + "-character");
	      var pAva = document.getElementById("player-" + (i + 1) + "-avatar");
	      var pDead = document.getElementById("current-player-" + (i + 1));
	      var pDeadDiv = document.getElementById("player-" + (i + 1) + "-cp-div");
	      var pHealthBar = document.getElementById("player-" + (i + 1) + "-health-div");
	      if (game.allPlayers[i].health <= 0) {
	        game.checkForDeaths();
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
	
	  var enableShootButton = function (target) {
	    shootButton.setAttribute('class','waves-effect waves-light btn red darken-4');
	    shootButton.onclick = function () {
	      if (target.health < 2){
	        var shootMessage = 'You killed ' + target.name
	      }
	      else {
	        var shootMessage = 'You shot ' + target.name
	      }
	
	      Materialize.toast(shootMessage, 2000);
	
	      game.shootTarget();
	      playSound("audio/pistol-riccochet.ogg")
	
	      if (game.canShoot1()) {
	        enableShootButton(game.players[0].target);
	      }
	      else if (!game.canShoot1() && !game.canShoot2()) {
	        disableShootButton();
	      }
	      if (game.canShoot2()) {
	        enableShootButton(game.players[0].target);
	      }
	      else if (!game.canShoot2() && !game.canShoot1()) {
	        disableShootButton();
	      }
	
	      (game.canShoot1() || game.canShoot2()) ? enableShootButton(game.players[0].target) : disableShootButton();
	      
	      if (game.canHeal()) {
	        enableHealButton(game.players[0].target);
	      }
	      else {
	        disableHealButton();
	      }
	
	      updateHealthBars(allHealthBars, game);
	
	      if (game.checkActions() <= 0) {
	        enableEndTurnButton();
	      }
	
	    }
	  }
	
	  var disableShootButton = function () {
	    shootButton.setAttribute('class', 'waves-effect waves-light btn disabled');
	    shootButton.onclick = null;
	  }
	
	  var enableHealButton = function (target) {
	    healButton.setAttribute('class','waves-effect waves-light btn red darken-4');
	    healButton.onclick = function () {
	      Materialize.toast('You healed ' + target.name, 2000);
	      playSound("audio/bottle-pour.mp3");
	      game.beerTarget();
	
	      if (game.canHeal()) {
	        enableHealButton(game.players[0].target);
	      }
	      else {
	        disableHealButton();
	      }
	
	      updateHealthBars();
	      updateCurrentPlayerHealth();
	
	      if (game.checkActions() <= 0) {
	        enableEndTurnButton();
	      }
	    }
	  }
	
	  var disableHealButton = function () {
	    healButton.setAttribute('class', 'waves-effect waves-light btn disabled');
	    healButton.onclick = null;
	  }
	
	  var healButtonEnableChecker = function () {
	    if (game.canHeal()) {
	      enableHealButton();
	    }
	    else {
	      disableHealButton();
	    }
	  }
	
	  //this function needs to inherit the scope of window.onload - passing it to setTimeout as a callback defined directly in the setTimeout arguments would make it lose the scope of window.onload, hence declaring it here and passing this func by name to setTimeout
	  var currentPlayerDiedBehaviour = function(){
	    game.nextTurn(true, gameState);
	    clearDiceDisplay();
	    displayCurrentPlayerArrows();
	    ifCurrentPlayerDiesTriggerNextTurn(); // checks again after players rotated - in case player rotated to died to arrows same as the previous player
	    clearDiceDisplay();
	    
	    dispatchEvent(new Event('load'));
	    currentPlayerDisplayDraw();
	    endTurnButton.setAttribute('class', 'waves-effect waves-light btn disabled');
	  };
	
	  var ifCurrentPlayerDiesTriggerNextTurn = function () {
	    if(game.players[0].health <= 0){
	      // CALL DISABLE DICEROLL FUNCTION HERE
	      // var rollDiceButton = document.getElementById('roll-dice-button')
	      // there doesn't seem to be a function for this - but these 2 lines do it:
	      rollDiceButton.onclick = null;
	      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
	      // the 
	      setTimeout(currentPlayerDiedBehaviour, 3000); // function definition just above
	      return true
	    }
	    else {
	      return false;
	    }
	  };
	  
	  var displayDiceOnScreen = function(){
	
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
	      currentDice.style.visibility = "visible"
	      counter++
	    }
	    // ROLL DICE
	    dice.roll();
	    game.resolveArrows();
	    ifCurrentPlayerDiesTriggerNextTurn();
	    shootButtonEnableChecker()
	    drawArrows(game);
	    displayCurrentPlayerArrows(); // in case current player dies - shows their new arrows (probably 0, cause arrows just went back to the middle)
	    updateCurrentPlayerHealth(); // in case current players dies - shows their 0 filled hearts
	    updateHealthBars();
	
	    ifCurrentPlayerDiesTriggerNextTurn();
	    displayCurrentPlayerArrows(); // NECESSARY duplication
	    updateCurrentPlayerHealth(); // NECESSARY duplication
	    updateHealthBars();
	    game.checkForDeaths();
	
	
	    game.dynamiteExplodes();
	    if (game.dice.threeDynamite()) {
	      playSound("audio/dynamite.mp3")
	    }
	
	    ifCurrentPlayerDiesTriggerNextTurn();
	    displayCurrentPlayerArrows(); // NECESSARY duplication
	    updateCurrentPlayerHealth(); // NECESSARY duplication
	    updateHealthBars();
	
	    // SAVE GAME EVERY ROLL
	    // gameState.save();
	
	    // DISPLAY CURRENT ROLL
	    for (var i = 0; i < dice.currentRoll.length; i++){
	      currentDice = document.getElementById('dice-'+(counter + 1));
	      if (currentDice){
	        currentDice.src = dice.imageUrl[dice.currentRoll[i]];
	        currentDice.style.visibility = "visible"
	      }
	      if(dice.currentRoll[i] === 5) currentDice.style.opacity = 0.5;
	      if(dice.saved.length === 5) currentDice.style.opacity = 1;
	      counter++
	    }
	  };// end rolldice func
	
	  var clearDiceDisplay = function(){
	    for (var i = 0; i < 5; i++) {
	      var currentDice = document.getElementById('dice-'+(i + 1));
	      currentDice.style.visibility = "hidden";
	      diceElements[i].onclick = null;
	    }
	  };
	
	  var enableEndTurnButton = function(){
	    fireGatlingCheck();
	    endTurnButton.setAttribute('class','waves-effect waves-light btn red darken-4');
	      if (game.threeGatling()){
	        playSound("audio/gatling-gun.mp3");
	        updateHealthBars();
	      }
	    endTurnButton.onclick = function(){
	      game.nextTurn(false, gameState);
	      displayCurrentPlayerArrows();
	      clearDiceDisplay();
	      dispatchEvent(new Event('load'));
	      endTurnButton.setAttribute('class', 'waves-effect waves-light btn disabled');
	      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn red darken-4');
	      enableRollDiceButton();
	      // populatePlayerList();
	    }
	  };
	
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
	    }else{
	      selection.setAttribute('class', 'collection-item avatar player');
	      healthBar.setAttribute('class', 'progress red lighten-4');
	    }
	  }
	
	  var savedDiceFull = function(){
	    if(dice.canRoll() === false){
	      game.addToActionCounters();
	      if (game.checkActions()){
	        Materialize.toast("Target a player to resolve dice before ending turn", 3500)
	        shootButtonEnableChecker();
	        //added shootButtonEnable check here so that if targeting a player, then saving all dice, you can shoot that target straight away without reselecting them
	      }
	      for (var i = 0; i < diceElements.length; i++) diceElements[i].style.opacity = 1;
	      game.addToActionCounters();
	      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
	      rollDiceButton.onclick = null;
	      if (game.checkActions() <= 0){
	        fireGatlingCheck();
	        enableEndTurnButton();
	        rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
	      }
	    }; // if dice.canRoll() is false end
	  };//func end
	
	  var fireGatlingCheck = function(){
	    if (dice.canRoll() === false){
	      if (game.checkActions() <= 0) {
	        if (game.threeGatling()){
	          playSound("audio/gatling-gun.mp3")
	          updateHealthBars();
	          // game.checkForDeaths();
	          // need to update the live array if someone dies so that 1s and 2s are still accurate in terms of distance in the same turn as someone dies
	          // -- except don't need to in the case of gatling - as all shoot dice must be resolved before gatling fires - commented out above line
	          // added game.canGatling boolean to game.threeGatling to ensure we only run gatling once per turn (game.canGatling is set to true in game.nextturn)
	          // as savedDiceFull is a checking function, run every time any single die is saved, saving 3 gatling would run it, then saving a fourth would run it again - game.canGatling prevents this.
	          return true;
	        }else{}
	      }else{console.log("must resolve remaining actions - gatling not firing");}
	    }else{console.log("can still roll dice - not firing gatling");}
	  };//func end
	
	  new UI(game);
	
	}; // END OF WINDOW ONLOAD
	
	/////////////////////////////
	// WINDOW ONLOAD ENDS HERE //
	/////////////////////////////
	
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
	};
	
	////////////////////////////////////////////////////////////
	//    'dice.unsave(dice.all[indexOf(dice.all[index])])'   //
	//      -Craig                                            //
	////////////////////////////////////////////////////////////

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(2);
	var playSound = __webpack_require__(3)
	
	var Game = function(dice, players, characterBasedMaxHealth, previousObject, hydratedAllPlayers){
	  this.characterBasedMaxHealth = characterBasedMaxHealth;
	  this.players = players;
	  if (!characterBasedMaxHealth){
	    for (var i = 0; i < this.players.length; i++){
	      this.players.maxHealth = 8;
	    }
	  }
	  if (hydratedAllPlayers !== undefined){
	    this.allPlayers = hydratedAllPlayers;
	  }
	  else{
	    this.allPlayers = [];
	  }
	  this.characters = [];
	  this.totalArrows = 9;
	  this.dice = dice;
	  this.wonBy = null;
	  this.canGatling = true;
	  if (previousObject !== undefined) {
	      this.rehydrate(previousObject);
	  }
	  this.roles = [{name:"Sheriff", imgUrl: "https://i.imgur.com/yYT038yb.jpg"}, {name:"Deputy", imgUrl: "https://i.imgur.com/6HHgfPab.jpg"}, {name:"Deputy", imgUrl: "https://i.imgur.com/6HHgfPab.jpg"}, {name:"Outlaw", imgUrl: "https://i.imgur.com/NoWerAnb.jpg"}, {name:"Outlaw", imgUrl: "https://i.imgur.com/NoWerAnb.jpg"}, {name:"Outlaw", imgUrl: "https://i.imgur.com/NoWerAnb.jpg"}, {name:"Renegade", imgUrl: "https://i.imgur.com/TNeqBpnb.jpg"}, {name:"Renegade", imgUrl: "https://i.imgur.com/TNeqBpnb.jpg"}];
	  var character1 = {
	    name: "Jesse Jones",
	    health: 9,
	    imgUrl: "https://i.imgur.com/bRkKXmX.png",
	    abilityDescription: "If you have four life points or less, you gain two if you use Beer for yourself."
	  };
	  var character2 = {
	    name: "Kit Carlson",
	    health: 7,
	    imgUrl: "https://i.imgur.com/BZIfBge.png",
	    abilityDescription: "For each Gatling you may discard one arrow from any player."
	  };
	  var character3 = {
	    name: "Black Jack",
	    health: 8,
	    imgUrl: "https://i.imgur.com/KUrKkis.png",
	    abilityDescription: "You may re-roll Dynamite. (Unless you roll three or more!)"
	  };
	  var character4 = {
	    name: "Rose Doolan",
	    health: 9,
	    imgUrl: "https://i.imgur.com/Hdcp0p1.png",
	    abilityDescription: "You may use Bullseye 1 or Bullseye 2 for players sitting one place further."
	  };
	  var character5 = {
	    name: "Pedro Ramirez",
	    health: 8,
	    imgUrl: "https://i.imgur.com/WcU2f2w.png",
	    abilityDescription: "Each time you lose a life point, you may discard one of your arrows."
	  };
	  var character6 = {
	    name: "El Gringo",
	    health: 7,
	    imgUrl: "https://i.imgur.com/OF8OH13.png",
	    abilityDescription: "When a player makes you lose one or more life points, they must take an arrow."
	  };
	  var character7 = {
	    name: "Bart Cassidy",
	    health: 8,
	    imgUrl: "https://i.imgur.com/e8oZGYx.png",
	    abilityDescription: "You may take an arrow instead of losing a life point (except to Arrows or Dynamite)."
	  };
	  var character8 = {
	    name: "Vulture Sam",
	    health: 9,
	    imgUrl: "https://i.imgur.com/1HkWchT.png",
	    abilityDescription: "Each time another player is eliminated, you gain two life points."
	  };
	  var character9 = {
	    name: "Calamity Janet",
	    health: 8,
	    imgUrl: "https://i.imgur.com/OY1CiiX.png",
	    abilityDescription: "You can use Bullseye 1 as Bullseye 2 and vice-versa."
	  };
	  var character10 = {
	    name: "Jourdonnais",
	    health: 7,
	    imgUrl: "https://i.imgur.com/tXiiB6L.png",
	    abilityDescription: "You never lose more than one life point to Arrows."
	  };
	  var character11 = {
	    name: "Slab the Killer",
	    health: 8,
	    imgUrl: "https://i.imgur.com/hlVk73M.png",
	    abilityDescription: "Once per turn, you can use a Beer to double a Bullseye 1 or Bullseye 2."
	  };
	  var character12 = {
	    name: "Sid Ketchum",
	    health: 8,
	    imgUrl: "https://i.imgur.com/cXVoKTA.png",
	    abilityDescription: "At the beginning of your turn, any player of your choice gains one life point."
	  };
	  var character13 = {
	    name: "Suzy Lafayette",
	    health: 8,
	    imgUrl: "https://i.imgur.com/KfiWFxk.png",
	    abilityDescription: "If you didn't roll any Bullseye 1 or Bullseye 2 you gain two life points."
	  };
	  var character14 = {
	    name: "Paul Regret",
	    health: 9,
	    imgUrl: "https://i.imgur.com/UFADg9e.png",
	    abilityDescription: "You never lose life points to the Gatling Gun."
	  };
	  var character15 = {
	    name: "Lucky Duke",
	    health: 8,
	    imgUrl: "https://i.imgur.com/F6GioiG.png",
	    abilityDescription: "You may make one extra re-roll"
	  };
	  var character16 = {
	    name: "Willy the Kid",
	    health: 8,
	    imgUrl: "https://i.imgur.com/580j9rS.png",
	    abilityDescription: "You only need 2 Gatling to use the Gatling Gun."
	  };
	  this.characters = [character1, character2, character3, character4, character5, character6, character7, character8, character9, character10, character11, character12, character13, character14, character15, character16];
	
	
	};
	
	var getUniqueRandomElement = function(array){
	  var index = Math.floor((Math.random()*array.length));
	  var choice = array[index];
	  array.splice(index, 1);
	  return choice;
	};
	
	Game.prototype.rehydrate = function(previousObject){
	  // this.characterBasedMaxHealth = previousObject.characterBasedMaxHealth;
	  // if (!this.characterBasedMaxHealth){
	  //   for (var i = 0; i < this.players.length; i++){
	  //     this.players[i].maxHealth = 8;
	  //   }
	  // }
	  this.totalArrows = previousObject.totalArrows;
	  this.wonBy = previousObject.wonBy;
	  console.log(this.players);
	
	  // this.allPlayers = originalOrderPlayers;
	}
	
	
	Game.prototype.setup = function(){
	  this.assignRoles();
	  this.assignCharacters();
	  this.setAllHealth();
	  this.savePlayers();
	  this.rotateSheriffToFirst();
	};
	
	Game.prototype.rotateSheriffToFirst = function(){
	  var sheriffIndex;
	  for (var i = 0; i < this.players.length; i++){
	    if (this.players[i].role.name === "Sheriff"){
	      sheriffIndex = i;
	    }
	  }
	  this.rotatePlayers(sheriffIndex);
	};
	
	Game.prototype.setAllHealth = function(){
	  for (var i = 0; i < this.players.length; i++){
	    this.players[i].setHealth();
	  }
	};
	
	Game.prototype.assignRoles = function(){
	  for (var i = 0; i < this.players.length; i++){
	    this.players[i].role = getUniqueRandomElement(this.roles);
	  };
	};
	
	
	Game.prototype.assignCharacters = function(){
	  for (var i = 0; i < this.players.length; i++){
	    this.players[i].character = getUniqueRandomElement(this.characters);
	  };//loop
	};
	
	Game.prototype.savePlayers = function(){
	  if (this.players.length === 8) {
	    this.allPlayers = this.players.slice();
	  };
	};
	
	Game.prototype.rotatePlayers = function(numSteps){
	  // rotates the array the number of times that is passed as an argument
	  // if no argument is passed, the OR operator will set loops to 1 as numSteps will be undefined, which is falsey
	  var loops = numSteps;
	
	  if (numSteps === undefined) {
	    loops = 1;
	  }
	  // ^ this could have been written:
	  // - which might be better - passing 0 in deliberately would cause the loops to be set to 1, not 0, when using the OR operator method above - but there's no need to ever rotate the players array 0 times
	  // if (numSteps === undefined){
	  //   var loops = 1;
	  // }
	  // else{
	  //   var loops = numSteps;
	  // };
	
	  for (var i = 0; i < loops; i++){
	    //2nd array item becomes first - first becomes last:
	    this.players.push(this.players.shift());
	    // alternative to rotate the other way:
	    // last array item becomes first - first becomes 2nd:
	    // this.players.unshift(this.players.pop());
	  };
	};
	
	Game.prototype.nextTurn = function(currentPlayerDead, gameState){
	
	  ////////////////////////////////////////////////////
	  // Adam has stuff to add to this function         //
	  ////////////////////////////////////////////////////
	  this.checkForDeaths();
	  //reset health to max in case of overhealing
	  for (var i = 0; i < this.players.length; i++){
	    if(this.players[i].health > this.players[i].maxHealth){
	      this.players[i].health = this.players[i].maxHealth
	    }
	  }
	
	  var rotateSteps;
	  if (currentPlayerDead === undefined || currentPlayerDead === false){
	    rotateSteps = 1;
	  }
	  else {
	    rotateSteps = 0
	  }
	  this.dice.reset();
	  this.canGatling = true;
	
	  this.rotatePlayers(rotateSteps);
	  for (var i = 0; i < this.players.length;i++){
	    this.players[i].target = null;
	  }
	  gameState.save(); // save state of the game at another time without resetting dice and rotating players and in theory we could possibly continue the turn with the dice and rerolls remembered
	  // updateDisplayForNewTurn function here (grey out and remove onclicks for dead players - reset buttons etc.)
	
	  // add any other function calls for stuff that needs to happen every time a new turn starts
	};
	
	Game.prototype.end = function(winCheckResult){
	  Materialize.toast(winCheckResult, 3000);
	  window.alert(winCheckResult);
	};
	
	
	// checks if any players have 0 health - and call the game.removePlayer(player) function on them if so
	Game.prototype.checkForDeaths = function(){
	  for (var i = 0; i < this.players.length; i++){
	    if (this.players[i].health <= 0){
	      // removes target from active player if their target is dead - prevents healing your target back to 1 hp straight after you kill them, for example.
	      if (this.players[i] === this.players[0].target){
	        this.players[0].target = null;
	      }
	      this.removePlayer(this.players[i]);
	    }// "if health is 0" conditional [end]
	  };// for loop [end]
	  if(this.winCheck()){
	    this.end(this.winCheck());
	  }
	  return this.players;
	};
	
	Game.prototype.removePlayer = function(player){
	  this.players.splice(this.players.indexOf(player), 1);
	  return this.players;
	};
	
	Game.prototype.winCheckOutlaws = function(){
	  console.log("outlaw wincheck  checking if array empty - players array length:", this.players.length);
	  if (this.players.length === 0){
	    console.log("game.players.length is 0 - therefore winCheckOutlaws is returning an Outlaw victory");
	    return "Outlaws win!"
	  };
	  console.log("loops through players array:", this.players, "length:", this.players.length);
	  for (var i = 0; i < this.players.length; i++){
	    console.log("index:", i, "role:", this.players[i].role.name);
	    if (this.players[i].role.name === "Sheriff") {
	      console.log("index:", i, "role found:", this.players[i].role.name);
	      console.log("sheriff found, returning null from outlaw wincheck");
	      return null;
	    }
	  }
	  console.log("returning outlaws win because no sheriff found ??");
	  return "Outlaws win!"
	};// winConditionOutlaw [end]
	
	Game.prototype.winCheckSheriff = function(){
	  var sheriffLives = false;
	  var outlawsDead = true;
	  var renegadesDead = true;
	  for (var i = 0; i < this.players.length;i++){
	    if (this.players[i].role.name === "Sheriff"){
	      var sheriffLives = true;
	    }
	    else if (this.players[i].role.name === "Outlaw"){
	      outlawsDead = false;
	    }
	    else if (this.players[i].role.name === "Renegade"){
	      renegadesDead = false;
	    }
	  };// loop end
	  if (sheriffLives && outlawsDead && renegadesDead){
	    return "Sheriff wins!";
	  }
	  else{
	    return null;
	  }
	
	};
	
	Game.prototype.winCheckRenegade = function(){
	  if (this.players.length === 1 && this.players[0].role.name === "Renegade") {
	    return "Renegade wins!"
	  }
	  else{
	    return null;
	  };
	};
	
	Game.prototype.winCheck = function(){
	  //all win conditions checked in appropriate order
	
	  // the if else if statement for renegade and outlaw is important, as if the sheriff is dead, the winCheckOutlaws function returns and outlaws win - this is often correct - but if a single renegade is alive, and just killed the sheriff - then the renegade wins - so we have to check if the renegade should win first, before reverting to checking if outlaws should win in the far more common case that the renegade is not the only player left alive.
	
	  if (this.winCheckSheriff()){
	    this.wonBy = "Sheriff";
	    return this.winCheckSheriff();
	  };
	
	  var outlawCheckResult = this.winCheckOutlaws()
	  var renegadeCheckResult = this.winCheckRenegade();
	
	  if (renegadeCheckResult){
	    this.wonBy = "Renegade";
	    return renegadeCheckResult;
	  }
	  else if (outlawCheckResult){
	    this.wonBy = "Outlaws";
	    return outlawCheckResult;
	  }
	  return null;
	};
	
	
	Game.prototype.resolveArrows = function(){
	
	  for (var i = 0; i < this.dice.arrowsRolled; i++){
	    //uncomment these to test currentPlayerDead behaviour MUCH more easily (refresh til no arrows on first role with sheriff, (or else outlaws win) then roll til you get one with other players to kill them straight away)
	    // this.players[0].health = 1
	    // this.totalArrows = 1
	    this.players[0].arrows += 1;
	    this.totalArrows -= 1;
	    // throw new Error("giving an arrow")
	    console.log("you got an arrow");
	    if (this.totalArrows === 0){
	      this.removeHealthAndArrows();
	      this.totalArrows = 9;
	      Materialize.toast("The Indians have attacked!!", 2000);
	      console.log("arrows in!");
	      playSound("audio/bow-and-arrows.mp3")
	      //adding this.checkForDeaths() call  to update who can be targetted by shots still to be resolved after arrows kill some player(s), preventing them from being targetted 
	      this.checkForDeaths();
	    }
	
	  };
	    this.dice.arrowsRolled = 0;
	  // this.dice.currentRoll = [];
	
	};
	
	Game.prototype.removeHealthAndArrows = function(){
	  for (var i = 0; i < this.players.length; i++){
	    this.players[i].health -= this.players[i].arrows;
	    this.players[i].arrows = 0;
	  };
	};
	
	
	
	
	
	
	
	// create players and game before players have name, add names from form (on first turn?)
	// API class to get char (+ role?) + statsData from DB/ our API
	// AI - array of players suspected of being on its team - based on who heals / shoots the sheriff
	// set of numbers of probability, one for each player being on each team based on actions
	//requires log / stats class to check other players actions
	// decisions - manually trigger click events
	
	
	/// 2 - work out how far away other players are from you game.players.length -1 & game.players.length -2 for index 6 & 7.
	
	
	Game.prototype.addToActionCounters = function(){
	  this.players[0].actionCounters = {"1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0}
	  for( var i of this.dice.all){
	    this.players[0].actionCounters[i.toString()] += 1;
	  };
	};
	///// counts how many of each dice result (arrow, beer etc) and saves this to the players actionsCounters.
	
	
	//// function to know if we should light up/make clickable the shoot button
	
	// var checkRangeToTarget = function(){
	//   if (game.players[0].actionCounters["1"]){
	//     game.canShoot(1)
	//   }
	//   if (game.players[0].actionCounters["2"]){
	//     game.canShoot(2)
	//   }
	// }
	
	Game.prototype.canHeal = function(){
	  if (this.players[0].actionCounters["3"] > 0 && this.players[0].target) {
	    return true;
	  }
	    else {
	      return false;
	  }
	}
	
	Game.prototype.canShoot1 = function(){
	  if ( this.players[0].actionCounters["1"] > 0 && (this.players[0].target === this.players[1] || this.players[0].target === this.players[this.players.length - 1] ) ) {
	    return true;
	  }
	  else{
	    return false;
	  }
	}
	
	Game.prototype.canShoot2 = function(){
	  if ( this.players[0].actionCounters["2"] > 0 && (this.players[0].target === this.players[2] || this.players[0].target === this.players[this.players.length - 2] ) ){
	    return true;
	  } else if (this.players[0].actionCounters["2"] > 0 && this.players.length === 2 && this.players[0].target === this.players[1]){
	    return true;
	  }
	  else{
	    return false;
	  }
	}
	
	// ridiculous one line function body (unused) - just for fun:
	Game.prototype.canShootTargetCheck = function(){
	  return ((this.players[0].actionCounters["1"] > 0 && (this.players[0].target === this.players[1] || this.players[0].target === this.players[this.players.length - 1])) || (this.players[0].actionCounters["2"] > 0 && (this.players[0].target === this.players[2] || this.players[0].target === this.players[this.players.length - 2])));
	};
	// returns true if active player can shoot their current targeted player, and false if they cannot
	
	Game.prototype.threeGatling = function(){$
	  var counter = 0;
	  for( item of this.dice.all ){
	    if( item === 4 ) {
	      counter++;
	    };
	  };
	  if ( counter >= 3 && this.canGatling === true) {
	    for(var i = 1; i < this.players.length; i++){
	      this.players[i].health -= 1;
	    };
	    this.totalArrows += this.players[0].arrows;
	    this.players[0].arrows = 0;
	    Materialize.toast(this.players[0].name + " Used gatling!", 2000);
	    this.canGatling = false;
	    return true;
	  };
	};
	
	Game.prototype.shootTarget = function(){
	  var counterToDecrement;
	
	  if (this.players[0].actionCounters["1"] > 0 && this.canShoot1()){
	      counterToDecrement = 1
	  }
	  else if(this.players[0].actionCounters["2"] > 0 && this.canShoot2()){
	    counterToDecrement = 2
	  }
	
	  if (this.players[0].target){
	    this.players[0].target.health -= 1;
	    console.log(this.players[0].name + " shot " + this.players[0].target.name)
	    this.players[0].actionCounters[counterToDecrement.toString()] -= 1;
	    // this.checkForDeaths();// need to update the live array if someone dies so that 1s and 2s are still accurate in terms of distance in the same turn as someone dies
	  }
	  else{
	    console.log("this is a bug - called shoot function but the button to do that should have been disabled!")
	  }
	
	  this.checkForDeaths();
	
	  console.log("action counters:", this.players[0].actionCounters)
	
	};
	
	Game.prototype.beerTarget = function(){
	  if (this.players[0].target){
	    this.players[0].target.health += 1;
	    //moving this to next turn, to allow overhealing of someone you don't want to damage before gatlinging them once your dice resolve.
	    // if(this.players[0].target.health > this.players[0].target.maxHealth){
	    //   this.players[0].target.health = this.players[0].target.maxHealth
	    // }
	    this.players[0].actionCounters["3"] -= 1;
	    console.log(this.players[0].name + " beer'd " + this.players[0].target.name)
	  }
	  else{
	    console.log("you don't have a target to beer! how did you even click the heal button?")
	  }
	};
	
	Game.prototype.checkActions = function(){
	  var counter = 0;
	  for(var i = 1; i < 4; i++){
	
	    if(this.players[0].actionCounters[i.toString()] > 0){
	      counter += this.players[0].actionCounters[i.toString()]
	    }
	  }
	    return counter;
	}
	
	Game.prototype.dynamiteExplodes = function(){
	 if (this.dice.threeDynamite()){
	   this.players[0].health -= 1;
	   Materialize.toast("Boom!", 2000);
	 }
	};
	
	  module.exports = Game;
	  module.exports.randomElement = getUniqueRandomElement;


/***/ },
/* 2 */
/***/ function(module, exports) {

	var Player = function(name, previousObject){
	
	  this.name = name || "";
	  this.character = null;
	//player role is set in game model by function 'assign roles' & player character is set in game model by 'assign character'.
	  this.role = null;
	  this.arrows = 0;
	  this.health = null;
	  this.maxHealth = null;
	  this.target = null;
	  this.actionCounters = { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0, "6": 0}
	  if (previousObject !== undefined) {
	      this.rehydrate(previousObject);
	  }
	};
	
	Player.prototype.rehydrate = function(previousObject){
	    this.name = previousObject.name;
	    this.character = previousObject.character;
	  //player role is set in game model by function 'assign roles' & player character is set in game model by 'assign character'.
	    this.role = previousObject.role;
	    this.arrows = previousObject.arrows;
	    this.health = previousObject.health;
	    this.maxHealth = previousObject.maxHealth;
	    this.target = previousObject.target;
	    this.actionCounters = previousObject.actionCounters;
	  return this;
	}
	
	/// add method for player health as a percentage.
	/// add guard to stop health going below 0.
	
	
	// setHealth: run after characters and roles assigned in game model- sets health and max health from value on character card + 2 extra if sheriff.
	Player.prototype.setHealth = function(){
	  this.maxHealth = this.character.health;
	  if( this.role.name === "Sheriff"){
	    this.maxHealth += 2
	  };
	  this.health = this.maxHealth;
	};
	
	Player.prototype.healthDifference = function(){
	  return this.maxHealth - this.health;
	};
	
	
	Player.prototype.addName = function(name){
	  this.name = name;
	}
	
	Player.prototype.healthAsPercentage = function(){
	  return ( (this.health/this.maxHealth) * 100);
	}
	
	Player.prototype.healthAsPercentageDisplay = function(){
	  var insert = this.healthAsPercentage();
	  return "width: " + insert + "%";
	}
	
	
	
	
	module.exports = Player;

/***/ },
/* 3 */
/***/ function(module, exports) {

	var playSound = function(sound){
	  var audio = new Audio(sound);
	  audio.play();
	}
	
	module.exports = playSound;

/***/ },
/* 4 */
/***/ function(module, exports) {

	var Dice = function(previousObject){
	  this.currentRoll = [];
	  this.saved = [];
	  this.all = [];
	  this.arrowsRolled = 0;
	  this.rolls = 3;
	//// INFO ABOUT ABOVE:
	//// this.currentRoll - the result of the dice from the player's last roll
	//// this.saved - the dice that the player will not re-roll
	//// this.all - an array that is the same as the dice that are being displayed in the browser. It is made of the dice the player didnt re-roll and the remaining dice after they have been rolled. ( this.saved + this.currentRoll after new numbers have been generated)  Used for event listener so can use index position. the dice that are being displayed in the browser come from looping through 2 arrays(saved and currentRoll- so that saved dice wont spin) so dont have proper index positions without this.all
	
	  this.meaningOf = {
	    1: "Shoot 1",
	    2: "Shoot 2",
	    3: "Beer",
	    4: "Gatling",
	    5: "Dynamite",
	    6: "Arrow"
	  };
	
	  this.imageUrl = {
	    1: "https://i.imgur.com/j32ofq3.png",
	    2: "https://i.imgur.com/AR0V71o.png",
	    3: "https://i.imgur.com/TWQYd4q.png",
	    4: "https://i.imgur.com/0q1hvpf.png",
	    5: "https://i.imgur.com/ygbg1Fg.png",
	    6: "https://i.imgur.com/pUn7Uru.png"
	
	  }; 
	  
	  if (previousObject !== undefined) {
	    this.rehydrate(previousObject);
	  }
	};
	
	Dice.prototype.rehydrate = function(previousObject){
	  this.currentRoll = previousObject.currentRoll;
	  this.saved = previousObject.saved;
	  this.all = previousObject.all;
	  // this.arrowsRolled = previousObject.arrowsRolled;
	  this.rolls = previousObject.rolls;
	  return this;
	}
	
	//// Will need to reset the dice between change of player turn - use reset below.
	Dice.prototype.reset = function(){
	  this.currentRoll = [];
	  this.saved = [];
	  this.all = [];
	  this.arrowsRolled = 0;
	  this.rolls = 3;
	}
	
	Dice.prototype.roll = function(){
	  this.arrowsRolled = 0;
	  if(this.rolls === 0){
	    console.log("You can't roll the dice any more!")
	    return;
	  }
	  this.currentRoll = [];
	  var numberOfDiceToRoll = 5 - this.saved.length;
	
	  if( this.canRoll() === false ) return;
	
	  for( var i=0; i < numberOfDiceToRoll; i++ ){
	    var result = Math.floor( Math.random() * 6 ) + 1;
	    this.currentRoll.push( result );
	  };
	
	  this.all = this.saved.concat( this.currentRoll )
	
	  for( var i = 0; i < this.currentRoll.length; i++ ){
	    if( this.currentRoll[i] === 6 ) {
	      this.arrowsRolled++;
	    }
	  }
	
	  this.saveDynamite();
	  // this.countArrows();
	  this.rolls--;
	
	  return this.currentRoll;
	};
	//// for special cards could add in above: if( playerSpecialAbility != [the special ability that lets you re-roll dynamite]){ this.saveDynamite } so save dynamite happens to everyone except the player with the special card. but it wont know what player - so would have to pass in the player object - dice.save( 0, player1) seems a bit ugly but would allow us to check player special card.
	
	// Dice.prototype.countArrows= function(){
	//   for( item of this.currentRoll ){
	//     if( item === 6 ) this.arrowsRolled += 1;
	//   }
	// };
	
	Dice.prototype.save = function( value ){
	  this.saved.push( value );
	};
	
	
	Dice.prototype.saveDynamite = function(){
	  for( var item of this.currentRoll ){
	    if( item === 5 ) this.save( 5 );
	  };
	};
	//// could use dice.currentRoll and dice.saved and loop through each checking if 3 dynamite, 3 gatling, and how many arrows. Return true if 3 dynamite/gatling.  In game can do if(dice.threeDynamite){ the run the function to take life off player and run the function to end player turn/start new player turn }    ----  could also do if(dice.threeGatling){ shoot all players & set current player arrows = 0 }.
	Dice.prototype.threeDynamite = function(){
	  var counter = 0;
	  for( var number of this.all ){
	    if( number === 5 ) counter++;
	  }
	  return ( counter >= 3 ) ? true : false
	};
	
	
	
	
	//// by saving number of arrows - in game model before each roll we can run a 'resolve arrows' function that will add dice.arrowsRolled to players total arrows and subtract dice.arrows rolled from total arrows left in middle.
	//// Could possibly add in counter for each result/outcome of dice (from this.currentRoll) so that we have a total record of each thing rolled by a player that we can then send to database and we'd have stats of what each player did during game for 'review of game page' at end.
	
	Dice.prototype.canRoll = function(){
	  if( this.rolls === 0 ) return false;
	  if( this.saved.length === 5 ) return false;
	  if( this.threeDynamite() ) return false;
	  return true;
	};
	
	module.exports = Dice;
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Player = __webpack_require__(2);
	var Game = __webpack_require__(1);
	var Dice = __webpack_require__(4);
	
	var GameState = function(game){
	  this.gamePassedIn = game;
	  this.savedGame = null;
	  this.hydratedGame = null;
	  this.forceNew = false;
	  this.gameToSave = null;
	}; // constructor [end]
	
	GameState.prototype.save = function(){
	  localStorage.setItem("bang_the_JS_game_save", JSON.stringify(this.gameToSave));
	  console.log("saved this game to localStorage:", this.gameToSave);
	}
	
	GameState.prototype.load = function(){
	  var loadReturn =  JSON.parse(localStorage.getItem("bang_the_JS_game_save"));
	  this.savedGame = loadReturn;
	  console.log("retrieved this game from localStorage:", loadReturn);
	  
	  if (!this.savedGame){
	    console.log("saved game falsey - returning game that was passed to gameStave saver - this.savedGame was:", this.savedGame);
	    this.gameToSave = this.gamePassedIn;
	    return this.gamePassedIn;
	  }
	  else if (this.savedGame.wonBy){
	    console.log("saved game was already won, by", this.savedGame.wonBy, "- returning game that was passed to gameStave saver - this.savedGame was:", this.savedGame);
	    this.gameToSave = this.gamePassedIn;
	    return this.gamePassedIn;
	  };
	
	  if (this.forceNew){
	    console.log("new game forced - loading this new game:", this.gamePassedIn);
	    this.gameToSave = this.gamePassedIn;
	    return this.gamePassedIn;
	  }
	  if (this.savedGame && !this.savedGame.wonBy) {
	    
	    console.log("unfinished game found in storage - rehydrating objects...");
	
	    var hydratedDice = new Dice(this.savedGame.dice);
	    // var dice = new Dice();
	    var hydratedPlayers = new Array();
	    var hydratedAllPlayers = new Array();
	
	    // console.log("looping through:", this.savedGame.allPlayers);
	    // console.log("loop length:", this.savedGame.allPlayers.length);
	    for (var i = 0; i < this.savedGame.allPlayers.length; i++){
	      hydratedAllPlayers.push(new Player("dummy name", this.savedGame.allPlayers[i]))
	    }
	
	    hydratedAllPlayers;
	    for (var i = 0; i < hydratedAllPlayers.length; i++){
	      for (var j = 0; j < this.savedGame.players.length; j++){
	        if (hydratedAllPlayers[i].name === this.savedGame.players[j].name){
	          hydratedPlayers[j] = hydratedAllPlayers[i].rehydrate(this.savedGame.players[j]);
	        }
	      }
	    }
	
	
	
	    // console.log("looping through:", this.savedGame.players);
	    // console.log("loop length:", this.savedGame.players.length);
	    // for (var i = 0; i < this.savedGame.players.length; i++){
	    //   hydratedPlayers.push(new Player("dummy name", this.savedGame.players[i]))
	    // }
	
	
	    //using fresh dice // //////////////////////////////////////////////////
	    var characterMaxHealthValues = true;
	    this.hydratedGame = new Game(hydratedDice, hydratedPlayers, characterMaxHealthValues, this.savedGame, hydratedAllPlayers);
	    this.gameToSave = this.hydratedGame;
	    return this.hydratedGame;
	
	
	  }// if we want to use saved game - if statement end
	}
	
	module.exports = GameState;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const PlayerList = __webpack_require__(7);
	const Hint = __webpack_require__(8);
	
	class UI {
	  constructor(game) {
	    this.render(game);
	  }
	
	  render(game) {
	    new PlayerList(game);
	    new Hint();
	  }
	}
	
	module.exports = UI;


/***/ },
/* 7 */
/***/ function(module, exports) {

	class PlayerList {
	  constructor(game) {
	    this.render(game);
	  }
	
	  render(game) {
	    this.renderPlayers(game);
	  }
	
	  renderPlayers(game, playerNumber) {
	    if (!playerNumber) playerNumber = 1;
	    if (playerNumber > 8) return;
	
	    const elements = {
	      player: document.getElementById(`player-${ playerNumber }`),
	      name: document.getElementById(`player-${ playerNumber }-name`),
	      avatar: document.getElementById(`player-${ playerNumber }-avatar`),
	      character: document.getElementById(`player-${ playerNumber }-character`),
	      healthBar: document.getElementById(`player-${ playerNumber }-health-bar`),
	      healthContainer: document.getElementById(`player-${ playerNumber }-health-div`),
	      cpContainer: document.getElementById(`player-${ playerNumber }-cp-div`),
	      currentPlayerText: document.getElementById(`current-player-${ playerNumber }`)
	    }
	
	    const players = {
	      thisPlayer: game.allPlayers[playerNumber - 1],
	      currentPlayer: game.players[0],
	      nextPlayer: game.players[1],
	      previousPlayer: game.players[game.players.length - 1]
	    }
	
	    if (players.thisPlayer !== players.currentPlayer) {
	      this.renderDefaultPlayer(elements, players);  
	    }
	    else {
	      this.renderCurrentPlayer(elements, players);
	    }
	
	    if (players.thisPlayer == players.previousPlayer) {
	      elements.name.innerHTML = '<b>' + players.thisPlayer.name + '</b>' + ' - PREVIOUS';
	    }
	    else if (players.thisPlayer == players.nextPlayer) {
	      elements.name.innerHTML = '<b>' + players.thisPlayer.name + '</b>' + ' - NEXT';
	    }
	
	    const displayStatus = players.thisPlayer.role.name === 'Sheriff' ? 'role' : 'character';
	    elements.avatar.src = players.thisPlayer[displayStatus].imgUrl;
	    elements.character.innerText = players.thisPlayer[displayStatus].name;
	
	    if (players.thisPlayer.health <= 0) {
	      this.renderDeadPlayer(elements, players);
	    }
	
	    this.renderPlayers(game, ++playerNumber);
	  }
	
	  renderDefaultPlayer(elements, players) {
	    elements.name.innerHTML = '<b>' + players.thisPlayer.name + '</b>';
	    elements.name.setAttribute('class', 'title grey-text text-darken-4');
	    elements.character.setAttribute('class', 'grey-text text-darken-4');
	    elements.cpContainer.style.display = 'none';
	    elements.healthContainer.style.display = 'block';
	    elements.healthContainer.setAttribute('class', 'progress red lighten-4');
	    elements.player.setAttribute('class', 'collection-item avatar player');
	    elements.healthBar.style.width = players.thisPlayer.healthAsPercentage() + '%';
	  }
	
	  renderCurrentPlayer(elements, players) {
	    elements.name.innerHTML = '<b>' + players.thisPlayer.name;
	    elements.name.setAttribute('class', 'title white-text');
	    elements.character.setAttribute('class', 'white-text');
	    elements.cpContainer.style.display = 'inline';
	    elements.healthContainer.style.display = 'none';
	    elements.currentPlayerText.innerText = 'Current Player';
	    elements.player.setAttribute('class', 'collection-item avatar red darken-4 player');
	  }
	
	  renderDeadPlayer(elements, players) {
	    elements.character.innerText = players.thisPlayer.role.name;
	    elements.avatar.src = players.thisPlayer.role.imgUrl;
	    elements.player.setAttribute('class', 'collection-item avatar grey lighten-4 player');
	    elements.currentPlayerText.innerText = 'DEAD';
	    elements.currentPlayerText.setAttribute('class', 'grey-text text-darken-4');
	    elements.cpContainer.style.display = 'inline';
	    elements.healthContainer.style.display = 'none';
	  }
	}
	
	module.exports = PlayerList;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const hints = __webpack_require__(9);
	
	class Hint {
	    constructor() {
	        this.render();
	    }
	
	    render() {
	        const elements = this.createElements();
	        this.setClasses(elements);
	        this.setText(elements);
	        this.appendToPage(elements);
	    }
	
	    createElements() {
	        return {
	            row: document.createElement('div'),
	            column: document.createElement('div'),
	            card: document.createElement('div'),
	            span: document.createElement('div'),
	            text: document.createElement('p')
	        };
	    }
	
	    setClasses(elements) {
	        elements.row.setAttribute('class', 'row');
	        elements.column.setAttribute('class', 'col s12 m8 offset-m3');
	        elements.card.setAttribute('class', 'card-panel red darken-4 center-align');
	        elements.span.setAttribute('class', 'white-text');
	        elements.text.setAttribute('id', 'hint');
	    }
	
	    setText(elements) {
	        const title = document.createElement('b');
	        title.innerText = 'Hint: ';
	
	        const hint = document.createElement('text');
	        hint.innerText = this.getHintText();
	
	        elements.text.appendChild(title);
	        elements.text.appendChild(hint);
	    }
	
	    getHintText() {
	        const random = Math.floor(Math.random() * hints.length);
	        const hintText = hints[random];
	        return hintText;
	    }
	
	    appendToPage(elements) {
	        elements.span.appendChild(elements.text);
	        elements.card.appendChild(elements.span);
	        elements.column.appendChild(elements.card);
	        elements.row.appendChild(elements.column);
	        document.body.appendChild(elements.row);
	    }
	}
	
	module.exports = Hint;


/***/ },
/* 9 */
/***/ function(module, exports) {

	const hints = [
	  "Don't believe Tony's lies.",
	  'Beware of the Erik special.',
	  "Remember to utilise your character's special ability!",
	  'Arrow damage is not dealt until the last arrow is taken and the Indians attack.',
	  'A Renegade wins by being the last character in play.',
	  'Dynamite cannot be re-rolled.',
	  'Arrows must be resolved immediately after each roll.',
	  'Rolling 3 Gatling deals 1 damage to all players.',
	  "If a player's life points reach 0 they are eliminated from the game.",
	  'If all players are eliminated at the same time, the Outlaws win!',
	  'Deputies must help and protect the Sherrif.',
	  'Rolling 3 Dynamite deals 1 damage and ends your turn.',
	  'Outlaws must eliminate the Sheriff.',
	  'The Sheriff must eliminate all Outlaws and Renegades.',
	  'If you are eliminated but your teammates win, you win too!',
	  'If the Sheriff is confronted by 2 Renegades and the Sheriff dies first, the Outlaws win!',
	  'Click on a die to save it and prevent it from re-rolling.',
	  "If you aren't satisfied with your roll, you can re-roll up to twice.",
	  'The Sheriff always takes the first turn.',
	  'Open the Current Player panel to check your special ability and role.'
	]
	
	module.exports = hints;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map