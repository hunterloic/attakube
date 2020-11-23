const {
  PLAYER_STATUS_NOT_PRESENT,
  PLAYER_STATUS_JOIN,
  PLAYER_STATUS_READY,
} = require('./player');


module.exports = {
  initGame,
}

function initGame() {
  const state = createGameState()
  return state;
}

function createGameState() {
  return {
    players: [
      {
        status:PLAYER_STATUS_JOIN
      },
      {
        status:PLAYER_STATUS_NOT_PRESENT
      }
    ],
    board: {},
    turn: 0,
    winner: 0
  };
}