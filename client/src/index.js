window.onload = function(){
  // BUTTONS
  var rollDiceButton = document.getElementById('roll-dice-button');
  var healButton = document.getElementById('heal-button');
  var shootButton = document.getElementById('shoot-button');
  var endTurnButton = document.getElementById('end-turn-button');

  // DICE
  var dice1 = document.getElementById('dice-1') || document.getElementById('hidden');
  var dice2 = document.getElementById('dice-2') || document.getElementById('hidden');
  var dice3 = document.getElementById('dice-3') || document.getElementById('hidden');
  var dice4 = document.getElementById('dice-4') || document.getElementById('hidden');
  var dice5 = document.getElementById('dice-5') || document.getElementById('hidden');
  
  // PLAYER LIST
  var player1 = document.getElementById('player-1') || document.getElementById('hidden');
  var player2 = document.getElementById('player-2') || document.getElementById('hidden');
  var player3 = document.getElementById('player-3') || document.getElementById('hidden');
  var player4 = document.getElementById('player-4') || document.getElementById('hidden');
  var player5 = document.getElementById('player-5') || document.getElementById('hidden');
  var player6 = document.getElementById('player-6') || document.getElementById('hidden');
  var player7 = document.getElementById('player-7') || document.getElementById('hidden');
  var player8 = document.getElementById('player-8') || document.getElementById('hidden');
  var currentPlayer = document.getElementById('current-player') || document.getElementById('hidden');

  rollDiceButton.onclick = function(){
    console.log('You clicked on the roll dice button!');
  }
  healButton.onclick = function(){
    console.log('You clicked on the heal button!');
  }
  shootButton.onclick = function(){
    console.log('You clicked on the shoot button!');
  }
  endTurnButton.onclick = function(){
    console.log('You clicked on the end turn button!');
  }
  dice1.onclick = function(){
    console.log('You clicked on dice 1!');
  }
  dice2.onclick = function(){
    console.log('You clicked on dice 2!');
  }
  dice3.onclick = function(){
    console.log('You clicked on dice 3!');
  }
  dice4.onclick = function(){
    console.log('You clicked on dice 4!');
  }
  dice5.onclick = function(){
    console.log('You clicked on dice 5!');
  }
  player1.onclick = function(){
    console.log('You clicked on player 1!');
  }
  player2.onclick = function(){
    console.log('You clicked on player 2!');
  }
  player3.onclick = function(){
    console.log('You clicked on player 3!');
  }
  player4.onclick = function(){
    console.log('You clicked on player 4!');
  }
  player5.onclick = function(){
    console.log('You clicked on player 5!');
  }
  player6.onclick = function(){
    console.log('You clicked on player 6!');
  }
  player7.onclick = function(){
    console.log('You clicked on player 7!');
  }
  player8.onclick = function(){
    console.log('You clicked on player 8!');
  }
  currentPlayer.onclick = function(){
    console.log('You clicked on the current player!')
  }
}