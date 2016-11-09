const PlayerList = require('./player-list.js');

class UI {
  constructor(game) {
    this.render(game);
  }

  render(game) {
    new PlayerList(game);
  }
}

module.exports = UI;
