const socket = require("socket.io");
const logger = require("../middleware/logger");
const { Game } = require("../game2/game");
const { initGame } = require('../game');
const { handleNewGame, handleJoinGame } = require('../socket/game');
const {
  PLAYER_STATUS_NOT_PRESENT,
  PLAYER_STATUS_JOIN,
  PLAYER_STATUS_READY,
} = require('../game/player');



module.exports = function(server) {
    const io = socket(server);
    
    io.on("connection", function (client) {

      client.on('newGame', () => {handleNewGame(io, client)} );
      client.on('joinGame', (roomName) => {handleJoinGame(io, client, roomName)} );

    });
}