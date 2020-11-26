const PLAYER_STATUS_NOT_PRESENT = 0;
const PLAYER_STATUS_JOIN = 1;
const PLAYER_STATUS_READY = 2;

class Player {
    
    status = PLAYER_STATUS_NOT_PRESENT;
    name = '';
    no = 0;
    socketId;

    constructor(no, name, socketId) {
        this.no = no;
        this.name = name;
        this.socketId = socketId;
    }
}

module.exports = {
    Player : Player,
    PLAYER_STATUS_NOT_PRESENT,
    PLAYER_STATUS_JOIN,
    PLAYER_STATUS_READY,
}
