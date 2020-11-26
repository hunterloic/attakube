require("dotenv").config();
const express = require("express");
const http = require('http');
const socket = require("socket.io");
const logger = require("./middleware/logger");
const error = require('./middleware/error');
const { handleNewGame, handleJoinGame } = require('./socket/game');

const app = express();

logger.info(`app name: ${process.env.APP_NAME}`);
logger.info(`env: ${process.env.NODE_ENV}`);

require('./startup/logging');

app.use(error);
app.use(express.static(`${__dirname}/../client`));

const server = http.createServer(app);

server.on('error', (err) => {
  console.error(err);
  logger.error(err);
});

const io = socket(server);

io.on("connection", function (client) {

  client.on('newGame', () => {handleNewGame(io, client)} );
  client.on('joinGame', (roomName) => {handleJoinGame(io, client, roomName)} );

});

const port = process.env.PORT || 3000
server.listen(port, () => {
    logger.info(`App listening at http://localhost:${port}`);
});
