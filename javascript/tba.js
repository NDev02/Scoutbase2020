// https://www.thebluealliance.com/apidocs/v3
// XVapXeXpAc91fcLyT3tQrIzxt7GjEqBQQpiHANLVP8RHSLhOTVUTPnyKU4GX8n4b

let key = "XVapXeXpAc91fcLyT3tQrIzxt7GjEqBQQpiHANLVP8RHSLhOTVUTPnyKU4GX8n4b";
let mapsKey = "AIzaSyAq1Cq4eHpOWGq3tgLatD5DNAzYlilp5WY";
let rootURL = "https://www.thebluealliance.com/api/v3";

function basicReq(path, cb, err) {

    if(path.charAt(0) != '/') {

        path = '/' + path;

    }

    fetch(rootURL + path + `?X-TBA-Auth-Key=${key}`).then(res => res.json()).then(cb).catch(err);

}

async function asyncReq(path) {

    if(path.charAt(0) != '/') {

        path = '/' + path;

    }

    let res = await fetch(rootURL + path + `?X-TBA-Auth-Key=${key}`);
    return res.json();

}

function currentEvents(cb, err) {

    let date = new Date();
    if(testing) {
        
        date = new Date("2/27/2020");

    }
    basicReq(`/events/${date.getFullYear()}/simple`, events => {

        filtered = events.filter(ev => {

            let start = new Date(ev.start_date);
            let end = new Date(ev.end_date);
            return (date <= end && date >= start);

        });
        cb(filtered);

    }, err);

}

function getAllEvents(sortBy, cb, err) {

    let date = new Date();
    basicReq(`/events/${date.getFullYear()}/simple`, events => {

        events.sort((a, b) => {

            return (a[sortBy] > b[sortBy] ? 1: -1);

        });

        cb(events);

    }, err);

}

function getEvent(key, cb, err) {

    basicReq(`/event/${key}`, cb, err);

}

function getTeams(eventKey, sortBy, cb, err) {

    basicReq(`/event/${eventKey}/teams`, data => {

        data.sort((a, b) => {

            return a[sortBy] - b[sortBy];

        });

        cb(data);

    }, err);

}

async function asyncGetTeams(eventKey, sortBy) {

    let data = await asyncReq(`/event/${eventKey}/teams`);
    data.sort((a, b) => {
    
        return a[sortBy] - b[sortBy];
    
    });
    return data;

}


function getTeam(teamKey, cb, err) {

    basicReq(`/team/${teamKey}`, cb, err);

}

function getTeamSocial(teamKey, cb, err) {

    basicReq(`/team/${teamKey}/social_media`, cb, err);

}

function asyncGetTeam(teamKey) {

    return asyncReq(`/team/${teamKey}`);

}

async function validData(eventKey, teamKey, matchNumber) {

    let matches = await asyncReq(`/team/${teamKey}/event/${eventKey}/matches`);
    let includes = false;
    for(let match of matches) {

        if(match.match_number == matchNumber)
            includes = true;

    }
    return includes;

}

async function getMatchesTeams(eventKey) {

    let matchesObj = {};
    let matches = await asyncReq(`/event/${eventKey}/matches`);
    for(let match of matches) {

        let blue = (match.alliances.blue.team_keys);
        let red  = (match.alliances.red.team_keys);
        let flat = (red.concat(blue));
        flat = JSON.parse(JSON.stringify(flat).replace(/frc/g, ""));
        matchesObj[match.match_number] = flat;

    }

    return matchesObj;

}