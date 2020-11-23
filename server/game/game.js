const { Player } = require("./player");

const BOARD_SIZE = 7;
const GAME_WIN_POINTS = 5;

class Game {
    
    players = [];
    board = {};
    turn = 0;
    winner = 0;

    constructor() {
    }
}

module.exports = {
    Game : Game
}
