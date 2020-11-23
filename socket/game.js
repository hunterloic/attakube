const socket = require("socket.io");
const { Game } = require('../game2/game');
const { GameService } = require('../service/game');
const { makeid } = require('../utils/common');

const state = {};
const clientRooms = {};
const gameService = new GameService();

function handleJoinGame(io, client, roomName) {
  const room = io.sockets.adapter.rooms.get(roomName);

  let numClients = 0;
  if (room) {
    numClients = room.size;
  }

  if (numClients === 0) {
    client.emit('unknownCode');
    return;
  } else if (numClients > 1) {
    client.emit('tooManyPlayers');
    return;
  }

  clientRooms[client.id] = roomName;

  const game = state[roomName];
  gameService.loadGame(game);
  const player = gameService.playerJoin('player 2', client.id)

  client.join(roomName);
  client.number = player.no;
  client.emit('init', { game, player });
}

function handleNewGame(io, client) {
  let roomName = makeid(5);
  clientRooms[client.id] = roomName;
  client.emit('gameCode', roomName);
  
  let game = new Game();
  state[roomName] = game;
  gameService.loadGame(game);
  const player = gameService.playerJoin('player 1', client.id)

  client.join(roomName);
  client.number = player.no;
  client.emit('init', { game, player });
}

      
module.exports = {
    handleJoinGame,
    handleNewGame,
}