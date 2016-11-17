const PlayerList = require('./player-list.js');
const Hint = require('./hint.js');

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
