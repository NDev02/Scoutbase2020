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

// Messaging

let notifier;

function initNotifications() {

    notifier = firebase.messaging();
    notifier.requestPermission().then(e => {

        return notifier.getToken();

    }).then(token => {

    }).catch(err => console.log);

    notifier.onMessage(payload => {

    });

}