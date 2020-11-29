const KUBE_TYPE = {
    STAR : 1,
    COMET : 2,
    EARTHQUAKE : 3,
    TSUNAMI : 4,
    TORNADO : 5,
    FIRE : 6,
    ECLIPSE : 7,
    SHIELD : 8,
    KEY : 9,
    EYE : 10,
}

const KUBE_STATE = {
    HIDDEN:1,
    SHOWN:1,
};

const KUBE_ALTER = {
    NONE:1,
    FIRE:2,
    ECLIPSE:3,
};

class Kube {
    x;
    y;
    player;
    kubeType;
    state;
    alter;

    constructor(x, y, player, kubeType) {
        let cell = {
            x,
            y,
            player,
            kube : {
            }
        };
        
        this.x = kubeType;
        this.y = kubeType;
        this.player = player;
        this.type = kubeType;
        this.state = KUBE_STATE.HIDDEN;
        this.alter = KUBE_ALTER.NONE;
    }
}

module.exports = {
    KUBE_TYPE,

    KUBE_STATE,
    
    Kube,
}

