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

    getTeamSocial(currentQuery.team, gotSocial, console.error);

    let aboutContent = document.querySelector("#about .content");

    let aboutTable = document.createElement("table");
    aboutTable.classList = "about-team";
    let robotInfo = ["Height", "Weight", "Shoots", "Chassis", "Defense", "Control Panel", "Climb", "Level", "Autonomous"];
    for(let rowHead of robotInfo) {

        let row = document.createElement("tr");
        row.appendChild(createElement("th", rowHead));
        row.appendChild(createElement("td", "place_holder"));
        aboutTable.appendChild(row);

    }

    aboutContent.appendChild(aboutTable);

}

function gotSocial(team) {

    console.log(team);

}