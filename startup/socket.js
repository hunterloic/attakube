const socket = require("socket.io");
const logger = require("../middleware/logger");
const { Game } = require("../game/game");
const { handleNewGame, handleJoinGame } = require('../socket/game');

module.exports = function(server) {
    const io = socket(server);
    
    io.on("connection", function (client) {

      client.on('newGame', () => {handleNewGame(io, client)} );
      client.on('joinGame', (roomName) => {handleJoinGame(io, client, roomName)} );

    });
}