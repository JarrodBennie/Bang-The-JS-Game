class PlayerList {
  constructor() {
    this.addEventListeners();
  }

  addEventListeners(playerElement, players) {
    playerElement.onclick = function () {
      if (game.players[0].target === game.allPlayers[0]) {
        game.players[0].target = null;
      }
      else {
        game.players[0].target = game.allPlayers[0];
      }
      
      targetPlayer(this, game);
      shootButtonEnableChecker()
      
      if (game.canHeal()) {
        enableHealButton(game.players[0].target);
      }
      else {
        disableHealButton(healButton);
      }
    }
  }
}

module.exports = PlayerList;
