let games = [];

/*

game model :
{
    "host":"player-name",
    "status":"created" or "started" or "ended",
    "players":[player-name-1,player-name-2, ...],
}

*/

function addNew(host){

    let game = {
        "host":host,
        "status":"created",
        "players":[host]
    }

    games.push(game);
}

function findAll(host){
    return games.filter(g => g.status == "created");
}

function findByHost(host){
    const game = games.filter(g => g.host == host)
    return game.length > 0 ? game[0] : null;
}

function deleteByHost(host){
    games = games.filter(g => g.host != host)
}

module.exports.addNew = addNew;
module.exports.findAll = findAll;
module.exports.findByHost = findByHost;
module.exports.deleteByHost = deleteByHost;
