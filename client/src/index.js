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
var dice = new Dice();
var characterMaxHealthValues = true;
var game = new Game(dice, players, characterMaxHealthValues);
game.setup();
console.log("the new game object:", game);
var gameState = new GameState(game);
game = gameState.load();
console.log("the game object that is used:", game);
var view = new View(gameState, game);

window.onload = function(){
  view.grabElements();
  console.log(view.ele);
  view.hint = hint;

  view.setNewGameButtonOnClick();

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

  view.renderCurrentPlayer();
  view.renderCurrentPlayerArrows();
  view.renderCurrentPlayerHealth();

  view.renderPlayerList();

  // HINT CARD
  view.renderHintCard();
  // var hintElement = document.getElementById('hint');
  // // replaced _.sample(hint.all) with manual random sample using Math.random - this was the only lodash in the app and seems unecessary to require it just for this line.
  // hintElement.innerHTML = hint.all[Math.floor(Math.random()*hint.all.length)];

  view.renderArrowPile();

  // EVENT LISTENERS
  // BUTTONS
  // ROLL DICE BUTTON

  var enableRollDiceButton = function(){
    rollDiceButton.setAttribute('class','waves-effect waves-light btn red darken-4');
    rollDiceButton.onclick = function(){
      diceClickEnable();
      rollDice(dice, diceElements, game);
      view.game.resolveArrows();
      shootButtonEnableChecker()
      ifCurrentPlayerDiesTriggerNextTurn();
      view.game.checkForDeaths();
      shootButtonEnableChecker();
      view.renderCurrentPlayerHealth();
      updateHealthBars();
      if(view.game.dice.canRoll() === false){
        //maybe re-add duplicate "use all dice to end turn" toast
        this.onclick = null;
        rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
        view.game.addToActionCounters();
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
      currentPlayerAvatarReveal.src = view.game.players[0].role.imgUrl;
      currentPlayerCharacter.innerHTML = view.game.players[0].role.name + '<i class="material-icons right">close</i>';
      setTimeout(function(){
        currentPlayerAvatarReveal.src = view.game.players[0].character.imgUrl;
        currentPlayerCharacter.innerHTML = view.game.players[0].character.name + '<i class="material-icons right">close</i>';
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
      var dice1Value = view.game.dice.all[0];
      if(dice1Value != 5) view.game.dice.save(dice1Value);
      dice1.onclick = null;
      dice1.style.opacity = 0.5;

      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState);
    }
    dice2.onclick = function(){
      var dice2Value = view.game.dice.all[1];
      if(dice2Value != 5) view.game.dice.save(dice2Value);
      dice2.onclick = null;
      dice2.style.opacity = 0.5;
      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState)
    }
    dice3.onclick = function(){
      var dice3Value = view.game.dice.all[2];
      if(dice3Value != 5) view.game.dice.save(dice3Value);
      dice3.onclick = null;
      dice3.style.opacity = 0.5;
      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState)
    }
    dice4.onclick = function(){
      var dice4Value = view.game.dice.all[3];
      if(dice4Value != 5) view.game.dice.save(dice4Value);
      dice4.onclick = null;
      dice4.style.opacity = 0.5;
      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState)
    }
    dice5.onclick = function(){
      var dice5Value = view.game.dice.all[4];
      if(dice5Value != 5) view.game.dice.save(dice5Value);
      dice5.onclick = null;
      dice5.style.opacity = 0.5;
      savedDiceFull(dice, endTurnButton, diceElements, rollDiceButton, game, gameState)
    }
  };//diceclickenable end

  var rollDiceDefault = function(){
    diceClickEnable();
    rollDice();

    if(view.game.dice.canRoll() === false){
      this.onclick = null;
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
      view.game.addToActionCounters();
    }
    savedDiceFull();
  };

  //commented out because it's up near the start now - was causing double arrows
  // rollDiceButton.onclick = rollDiceDefault;

  // DICE CLICKS DISABLED BEFORE DICE ARE ROLLED TO PREVENT ROLL DICE BUTTON LOCKOUT.
  var diceClickDisable = function(){
    dice1.onclick = null;
    dice2.onclick = null;
    dice3.onclick = null;
    dice4.onclick = null;
    dice5.onclick = null;
  };
  diceClickDisable();

  // utility function to avoid repition in the playerX.onclick functions below:
  // what was a one line ternary now has to be these 14 lines in this function:
  var shootButtonEnableChecker = function(){
    if (view.game.players.length > 3){
      if (view.game.canShoot1()){
        enableShootButton(view.game.players[0].target);
        playSound("shotgun-cock.wav");
      }
      else if(!view.game.canShoot1() && !view.game.canShoot2()){
        disableShootButton();
      }
      if(view.game.canShoot2()){
        enableShootButton(view.game.players[0].target);
        playSound("revolver-cock.wav")
      }
      else if(!view.game.canShoot2() && !view.game.canShoot1()){
        disableShootButton();
      }
    } else if (view.game.players.length === 3){
      if (view.game.canShoot1() && view.game.canShoot2()){
        enableShootButton(view.game.players[0].target);
        playSound("shotgun-cock.wav");
      } else if (view.game.canShoot1()){
        enableShootButton(view.game.players[0].target);
        playSound("shotgun-cock.wav");
      }
      else if(!view.game.canShoot1() && !view.game.canShoot2()){
        disableShootButton();
      }
      if (view.game.canShoot1() && view.game.canShoot2()){
        enableShootButton(view.game.players[0].target);
        playSound("shotgun-cock.wav");
      } else if(view.game.canShoot2()){
        enableShootButton(view.game.players[0].target);
        playSound("revolver-cock.wav")
      }
      else if(!view.game.canShoot2() && !view.game.canShoot1()){
        disableShootButton();
      }

    }
    else if (view.game.players.length === 2){
      if (view.game.players[0].target == view.game.players[1] && view.game.players[0].actionCounters["1"]){
      enableShootButton(view.game.players[0].target);
      playSound("shotgun-cock.wav");
      } else if (view.game.players[0].target == view.game.players[1] && view.game.players[0].actionCounters["2"]){
      enableShootButton(view.game.players[0].target);
        playSound("revolver-cock.wav")
      } else if (view.game.players[0].target == view.game.players[0]){
        console.log("You can't shoot yourself, try shooting the other surviving player");
        disableShootButton();
      }
    } else if (view.game.players.length < 2){
      if (view.game.players[0].target == view.game.players[0] && (view.game.players[0].actionCounters["1"] || view.game.players[0].actionCounters["2"])){
        console.log("You can't shoot yourself - the game should be over, you're the only player alive");
        disableShootButton();
      }
    }

  };

  // PLAYER LIST
  player1.onclick = function(){
    if(view.game.players[0].target === view.game.allPlayers[0]){
      view.game.players[0].target = null;
    }else{
      view.game.players[0].target = view.game.allPlayers[0];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker()
    if (view.game.canHeal()) {
      enableHealButton(view.game.players[0].target);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player2.onclick = function(){
    if(view.game.players[0].target === view.game.allPlayers[1]){
      view.game.players[0].target = null;
    }else{
      view.game.players[0].target = view.game.allPlayers[1];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker()
    if (view.game.canHeal()) {
      enableHealButton(healButton, endTurnButton, view.game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player3.onclick = function(){
    if(view.game.players[0].target === view.game.allPlayers[2]){
      view.game.players[0].target = null;
    }else{
      view.game.players[0].target = view.game.allPlayers[2];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker();
    if (view.game.canHeal()) {
      enableHealButton(healButton, endTurnButton, view.game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player4.onclick = function(){
    if(view.game.players[0].target === view.game.allPlayers[3]){
      view.game.players[0].target = null;
    }else{
      view.game.players[0].target = view.game.allPlayers[3];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker();
    if (view.game.canHeal()) {
      enableHealButton(healButton, endTurnButton, view.game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player5.onclick = function(){
    if(view.game.players[0].target === view.game.allPlayers[4]){
      view.game.players[0].target = null;
    }else{
      view.game.players[0].target = view.game.allPlayers[4];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker();
    if (view.game.canHeal()) {
      enableHealButton(healButton, endTurnButton, view.game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player6.onclick = function(){
    if(view.game.players[0].target === view.game.allPlayers[5]){
      view.game.players[0].target = null;
    }else{
      view.game.players[0].target = view.game.allPlayers[5];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker();
    if (view.game.canHeal()) {
      enableHealButton(healButton, endTurnButton, view.game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player7.onclick = function(){
    if(view.game.players[0].target === view.game.allPlayers[6]){
      view.game.players[0].target = null;
    }else{
      view.game.players[0].target = view.game.allPlayers[6];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker();
    if (view.game.canHeal()) {
      enableHealButton(healButton, endTurnButton, view.game.players[0].target, allHealthBars, game);
    }
    else{
      disableHealButton(healButton);
    }
  }
  player8.onclick = function(){
    if(view.game.players[0].target === view.game.allPlayers[7]){
      view.game.players[0].target = null;
    }else{
      view.game.players[0].target = view.game.allPlayers[7];
    }
    targetPlayer(this, game);
    shootButtonEnableChecker();
    if (view.game.canHeal()) {
      enableHealButton(healButton, endTurnButton, view.game.players[0].target, allHealthBars, game);
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
      allHealthBars[i].style.width = view.game.allPlayers[i].healthAsPercentage() + "%";
      var p = document.getElementById("player-" + (i + 1));
      var pChar = document.getElementById("player-" + (i + 1) + "-character");
      var pAva = document.getElementById("player-" + (i + 1) + "-avatar");
      var pDead = document.getElementById("current-player-" + (i + 1));
      var pDeadDiv = document.getElementById("player-" + (i + 1) + "-cp-div");
      var pHealthBar = document.getElementById("player-" + (i + 1) + "-health-div");
      if(view.game.allPlayers[i].health <= 0){
        view.game.checkForDeaths();
        p.onclick = null;
        p.setAttribute('class', 'collection-item avatar grey lighten-4 player');
        pChar.innerHTML = view.game.allPlayers[i].role.name;
        pAva.src = view.game.allPlayers[i].role.imgUrl;
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

      view.game.shootTarget();
      playSound("pistol-riccochet.ogg")

      if (view.game.canShoot1()){
        enableShootButton(view.game.players[0].target);
      }
      else if(!view.game.canShoot1() && !view.game.canShoot2()){
        disableShootButton();
      }
      if(view.game.canShoot2()){
        enableShootButton(view.game.players[0].target);
      }
      else if(!view.game.canShoot2() && !view.game.canShoot1()){
        disableShootButton();
      }


      (view.game.canShoot1() || view.game.canShoot2()) ? enableShootButton(view.game.players[0].target) : disableShootButton();
      if (view.game.canHeal()) {
        enableHealButton(view.game.players[0].target);
      }
      else{
        disableHealButton();
      }

      updateHealthBars(allHealthBars, game);
      if (view.game.checkActions() <= 0){
        enableEndTurnButton();
      }

    }; // onclick end
  };//enable shoot button func end

  var disableShootButton = function(){
    shootButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    shootButton.onclick = null;
  };


  var enableHealButton = function(target){
    healButton.setAttribute('class','waves-effect waves-light btn red darken-4');
    healButton.onclick = function(){
      Materialize.toast('You healed ' + target.name, 2000);
      playSound("bottle-pour.mp3");
      view.game.beerTarget();
      if (view.game.canHeal()) {
        enableHealButton(view.game.players[0].target);
      }else{
        disableHealButton();
      }
      updateHealthBars();
      view.renderCurrentPlayerHealth();
      if (view.game.checkActions() <= 0){
        enableEndTurnButton();
      }
    }
  };

  var disableHealButton = function(){
    healButton.setAttribute('class', 'waves-effect waves-light btn disabled');
    healButton.onclick = null;
  }

  var healButtonEnableChecker = function(){
    if (view.game.canHeal()){
      enableHealButton();
    }
    else {
      disableHealButton();
    }
  }


  //this function needs to inherit the scope of window.onload - passing it to setTimeout as a callback defined directly in the setTimeout arguments would make it lose the scope of window.onload, hence declaring it here and passing this func by name to setTimeout
  var currentPlayerDiedBehaviour = function(){
    view.game.nextTurn(true, gameState);
    clearDiceDisplay();
    view.renderCurrentPlayerArrows();
    ifCurrentPlayerDiesTriggerNextTurn(); // checks again after players rotated - in case player rotated to died to arrows same as the previous player
    clearDiceDisplay();
    
    dispatchEvent(new Event('load'));
    view.renderCurrentPlayer();
    endTurnButton.setAttribute('class', 'waves-effect waves-light btn disabled');
  };

  var ifCurrentPlayerDiesTriggerNextTurn = function(){
    if(view.game.players[0].health <= 0){
      // CALL DISABLE DICEROLL FUNCTION HERE
      // var rollDiceButton = document.getElementById('roll-dice-button')
      // there doesn't seem to be a function for this - but these 2 lines do it:
      rollDiceButton.onclick = null;
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
      // the 
      setTimeout(currentPlayerDiedBehaviour, 3000); // function definition just above
      return true
    }
    else{
      return false;
    }
  };
  
  var displayDiceOnScreen = function(){

  };



  // ROLL DICE BUTTON

  var rollDice = function(){
    var counter = 0;
    // DISPLAY SAVED DICE
    for (var i = 0; i < view.game.dice.saved.length; i++) {
      var currentDice = document.getElementById('dice-'+(counter + 1));
      currentDice.src = view.game.dice.imageUrl[view.game.dice.saved[i]];
      diceElements[i].onclick = null;
      diceElements[i].style.opacity = 0.5;
      currentDice.style.visibility = "visible"
      counter++
    }
    // ROLL DICE
    view.game.dice.roll();
    view.game.resolveArrows();
    ifCurrentPlayerDiesTriggerNextTurn();
    shootButtonEnableChecker()
    view.renderArrowPile();
    view.renderCurrentPlayerArrows(); // in case current player dies - shows their new arrows (probably 0, cause arrows just went back to the middle)
    view.renderCurrentPlayerHealth(); // in case current players dies - shows their 0 filled hearts
    updateHealthBars();

    ifCurrentPlayerDiesTriggerNextTurn();
    view.renderCurrentPlayerArrows(); // NECESSARY duplication
    view.renderCurrentPlayerHealth(); // NECESSARY duplication
    updateHealthBars();
    view.game.checkForDeaths();


    view.game.dynamiteExplodes();
    if (view.game.dice.threeDynamite()) {
      playSound("dynamite.mp3")
    }

    ifCurrentPlayerDiesTriggerNextTurn();
    view.renderCurrentPlayerArrows(); // NECESSARY duplication
    view.renderCurrentPlayerHealth(); // NECESSARY duplication
    updateHealthBars();

    // SAVE GAME EVERY ROLL
    // gameState.save();

    // DISPLAY CURRENT ROLL
    for (var i = 0; i < view.game.dice.currentRoll.length; i++){
      currentDice = document.getElementById('dice-'+(counter + 1));
      if (currentDice){
        currentDice.src = view.game.dice.imageUrl[view.game.dice.currentRoll[i]];
        currentDice.style.visibility = "visible"
      }
      if(view.game.dice.currentRoll[i] === 5) currentDice.style.opacity = 0.5;
      if(view.game.dice.saved.length === 5) currentDice.style.opacity = 1;
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
      if (view.game.threeGatling()){
        playSound("gatling-gun.mp3");
        updateHealthBars();
      }
    endTurnButton.onclick = function(){
      view.game.nextTurn(false, gameState);
      view.renderCurrentPlayerArrows();
      clearDiceDisplay();
      dispatchEvent(new Event('load'));
      endTurnButton.setAttribute('class', 'waves-effect waves-light btn disabled');
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn red darken-4');
      enableRollDiceButton();
      // view.renderPlayerList();
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
    if(view.game.dice.canRoll() === false){
      view.game.addToActionCounters();
      if (view.game.checkActions()){
        Materialize.toast("Target a player to resolve dice before ending turn", 3500)
        shootButtonEnableChecker();
        //added shootButtonEnable check here so that if targeting a player, then saving all dice, you can shoot that target straight away without reselecting them
      }
      for (var i = 0; i < diceElements.length; i++) diceElements[i].style.opacity = 1;
      view.game.addToActionCounters();
      rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
      rollDiceButton.onclick = null;
      if (view.game.checkActions() <= 0){
        fireGatlingCheck();
        enableEndTurnButton();
        rollDiceButton.setAttribute('class', 'waves-effect waves-light btn disabled');
      }
    }; // if view.game.dice.canRoll() is false end
  };//func end

  var fireGatlingCheck = function(){
    if (view.game.dice.canRoll() === false){
      if (view.game.checkActions() <= 0) {
        if (view.game.threeGatling()){
          playSound("gatling-gun.mp3")
          updateHealthBars();
          // view.game.checkForDeaths();
          // need to update the live array if someone dies so that 1s and 2s are still accurate in terms of distance in the same turn as someone dies
          // -- except don't need to in the case of gatling - as all shoot dice must be resolved before gatling fires - commented out above line
          // added view.game.canGatling boolean to view.game.threeGatling to ensure we only run gatling once per turn (view.game.canGatling is set to true in view.game.nextturn)
          // as savedDiceFull is a checking function, run every time any single die is saved, saving 3 gatling would run it, then saving a fourth would run it again - view.game.canGatling prevents this.
          return true;
        }else{}
      }else{console.log("must resolve remaining actions - gatling not firing");}
    }else{console.log("can still roll dice - not firing gatling");}
  };//func end

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
  view.game.end();
};

////////////////////////////////////////////////////////////
//    'view.game.dice.unsave(view.game.dice.all[indexOf(view.game.dice.all[index])])'   //
//      -Craig                                            //
////////////////////////////////////////////////////////////
