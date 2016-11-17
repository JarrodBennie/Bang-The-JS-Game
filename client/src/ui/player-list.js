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

    elements.healthBar.style.width = players.thisPlayer.healthAsPercentage() + '%';

    if (players.thisPlayer == players.currentPlayer) {
      this.renderCurrent(elements, players);
    }
    else if (players.thisPlayer == players.previousPlayer) {
      elements.name.innerHTML = '<b>' + players.thisPlayer.name + '</b>' + ' - PREVIOUS';
    }
    else if (players.thisPlayer == players.nextPlayer) {
      elements.name.innerHTML = '<b>' + players.thisPlayer.name + '</b>' + ' - NEXT';
    }
    else {
      this.renderDefault(elements, players);
    }

    const displayStatus = players.thisPlayer.role.name === 'Sheriff' ? 'role' : 'character';
    elements.avatar.src = players.thisPlayer[displayStatus].imgUrl;
    elements.character.innerText = players.thisPlayer[displayStatus].name;

    if (players.thisPlayer.health <= 0) {
      this.renderDead(elements, players);
    }

    this.renderPlayers(game, ++playerNumber);
  }

  renderDefault(elements, players) {
    elements.name.innerHTML = '<b>' + players.thisPlayer.name + '</b>';
    elements.name.setAttribute('class', 'title grey-text text-darken-4');
    elements.character.setAttribute('class', 'grey-text text-darken-4');
    elements.cpContainer.style.display = 'none';
    elements.healthContainer.style.display = 'block';
    elements.healthContainer.setAttribute('class', 'progress red lighten-4');
    elements.player.setAttribute('class', 'collection-item avatar player');
    elements.currentPlayerText.innerText = 'Current Player';
  }

  renderCurrent(elements, players) {
    elements.name.innerHTML = '<b>' + players.thisPlayer.name;
    elements.name.setAttribute('class', 'title white-text');
    elements.character.setAttribute('class', 'white-text');
    elements.cpContainer.style.display = 'inline';
    elements.healthContainer.style.display = 'none';
    elements.player.setAttribute('class', 'collection-item avatar red darken-4 player');
  }

  renderDead(elements, players) {
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
