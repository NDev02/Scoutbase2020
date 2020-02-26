let databaseObjectId = "";

async function teamInit() {

    let team = await asyncGetTeam(currentQuery.team);
    if(testing) {

        console.log(team);

    }
    document.querySelector("#name").innerHTML = team.nickname;
    document.querySelector("#number").innerHTML = team.team_number;

    let generalContent = document.querySelector("#general-information .content");

    let location = createElement("p", `${team.city}, ${team.state_prov}`);
    generalContent.appendChild(location);

    let website = createElement("a", team.website);
    website.setAttribute("href", team.website);
    generalContent.appendChild(website);

    let aboutContent = document.querySelector("#about .content");

    let aboutTable = document.createElement("table");
    aboutTable.classList = "about-team";
    let robotSpecifics = await readData(`/teams/${team.team_number}`);
    let robotInfo = ["Height", "Weight", "Shoots", "Chassis", "Defense", "Control Panel", "Climb", "Level", "Autonomous"];
    for(let rowHead of robotInfo) {

        let row = document.createElement("tr");
        row.appendChild(createElement("th", rowHead));
        row.appendChild(createElement("td", robotSpecifics[rowHead]));
        aboutTable.appendChild(row);

    }

    aboutContent.appendChild(aboutTable);

    let teamList = await readData(`/registered_users/${localStorage.getItem("name")}/team_watch`);
    if(teamList !== null) {

        for(let key in teamList) {

            let teamListTeam = teamList[key];
            if(teamListTeam == team.key) {

                databaseObjectId = key;
                document.querySelector("#add-watch").setAttribute("hidden", true);
                document.querySelector("#remove-watch").removeAttribute("hidden");

            }
    
        }

    }

}

function viewStatistics() {

    setPage('statistics.html', {team: currentQuery.team});

}

function addToWatchlist() {

    pushData(`/registered_users/${localStorage.getItem("name")}/team_watch`, currentQuery.team);
    setPage('team.html', currentQuery);

}

function removeFromWatchlist() {

    setData(`/registered_users/${localStorage.getItem("name")}/team_watch/${databaseObjectId}`, null);
    setPage('team.html', currentQuery);

}
