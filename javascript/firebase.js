// Database

let database = firebase.database();

async function readData(path) {

    let snapshot = await database.ref(path).once("value");
    let data = snapshot.val();
    return data;

}

function setData(path, data, cb) {

    let ref = database.ref(path);
    ref.set(data, cb);

}

function pushData(path, data, cb) {

    let ref = database.ref(path);
    ref.push(data, cb);

}

function pushTeams(teams) {

    teams.forEach(team => {
        setData(`/teams/${team.key}/`, team);
    });
    
}