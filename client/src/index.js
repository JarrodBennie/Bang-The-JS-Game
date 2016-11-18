const Game = require('./models/game');
const Player = require('./models/player');
const Dice = require('./models/dice');
const GameState = require("./models/gameState.js");
const playSound = require("./models/play_sound.js");

const UI = require('./ui/ui.js');

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