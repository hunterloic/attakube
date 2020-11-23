const {
    PLAYER_STATUS_NOT_PRESENT,
    PLAYER_STATUS_JOIN,
    PLAYER_STATUS_READY,
} = require('./player');

const KUBE_TYPE_STAR = 1;
const KUBE_TYPE_COMET = 2;
const KUBE_TYPE_EARTHQUAKE = 3;
const KUBE_TYPE_TSUNAMI = 4;
const KUBE_TYPE_TORNADO = 5;
const KUBE_TYPE_FIRE = 6;
const KUBE_TYPE_ECLIPSE = 7;
const KUBE_TYPE_SHIELD = 8;
const KUBE_TYPE_KEY = 9;
const KUBE_TYPE_EYE = 10;

const KUBE_STATE_HIDDEN = 1;
const KUBE_STATE_SHOWN = 2;

const KUBE_STATE_HIDDEN = 1;
const KUBE_STATE_SHOWN = 2;

module.exports = {
    KUBE_TYPE_STAR,
    KUBE_TYPE_COMET,
    KUBE_TYPE_EARTHQUAKE,
    KUBE_TYPE_TSUNAMI,
    KUBE_TYPE_TORNADO,
    KUBE_TYPE_FIRE,
    KUBE_TYPE_ECLIPSE,
    KUBE_TYPE_SHIELD,
    KUBE_TYPE_KEY,
    KUBE_TYPE_EYE,
    
    createKube,
}

function createKube(x, y, player, kubeType) {
    let cell = {
        x,
        y,
        player,
        kube : {
            type: kubeType,
            state: KUBE_STATE_HIDDEN,
            alter: KUBE_ALTER_NONE
        }
    };

    return cell;
}