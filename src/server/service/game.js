const { Game } = require("../game/game");
const { Player } = require("../game/player");
const {
    PLAYER_STATUS_JOIN
} = require("../game/player");


class GameService {

    game;

    constructor() {
    }

    loadGame(game) {
        this.game = game;
    }

    playerJoin(playername, socketId) {
        let player;

        if(this.game.players.length > 1) {
            let playerFilter = this.game.players.filter(p => p.name == playerName)
            if(playerFilter.length == 0) {
                throw new Error("game is full.");
            }
            player = playerFilter[0];

            player.status = PLAYER_STATUS_JOIN;
            player.socketId = socketId;
            return player;

        } else {
            player = new Player(this.game.players.length + 1, playername, socketId);

            player.status = PLAYER_STATUS_JOIN;
            this.game.players.push(player);
            return player;
        }
    }

    
}

module.exports = {
    GameService : GameService
}
