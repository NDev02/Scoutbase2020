function strategyInit() {

    let selected = document.querySelector("#event .content p");
    let selector = document.querySelector("#event .content select");
    getAllEvents("name", events => {

        if(testing) {

            console.log(events);

        }

        for(let e of events) {

            let option = document.createElement("option");
            option.appendChild(document.createTextNode(e.name));
            option.originObject = e;
            selector.appendChild(option);

        }

    }, console.error);

    selector.onchange = () => {

        let eventIndex = selector.selectedIndex;
        let e = selector.children[eventIndex].originObject;
        let link = document.createElement("a");
        link.appendChild(document.createTextNode(e.name));
        link.onclick = function() {

            setPage("event.html", {key: e.key});

        }
        document.querySelector("#event .content p").innerHTML = "";
        document.querySelector("#event .content p").appendChild(link);

        document.querySelector("#blue-alliance").setAttribute("hidden", true);
        document.querySelector("#red-alliance").setAttribute("hidden", true);

        generateTeamDetails(e.key);

    }

    currentQuery.robotFailures = [
        "broken climber",
        "autonomous not functional",
        "robot disabled",
        "gatherer not functional",
        "shooter inaccurate",
        "shooter not functional"
    ];

}

function generateTeamDetails(key) {

    getTeams(key, "number", teams => {

        if(testing) {

            console.log(teams);

        }

        let teamDetailsCard = document.querySelector("#team-details");
        teamDetailsCard.removeAttribute("hidden");

        let teamCountSpan = document.querySelector("#team-count");
        teamCountSpan.innerHTML = teams.length;
        currentQuery.teams = teams;

    }, console.error);

}

function runScenario(r, b) {

    let allianceSize = document.querySelector("#alliance-size").value;
    allianceSize = (allianceSize >= 1 ? allianceSize: 1);
    allianceSize = (allianceSize <= 10 ? allianceSize: 10);

    let red;
    let blue;

    if(r == undefined) {

        red = [];
        blue = [];

        for(let i = 0; i < allianceSize; i++) {
    
            let selectedTeam  = currentQuery.teams[Math.floor(Math.random() * currentQuery.teams.length)];
            while(red.includes(selectedTeam) || blue.includes(selectedTeam)) {
    
                selectedTeam  = currentQuery.teams[Math.floor(Math.random() * currentQuery.teams.length)];
    
            }
            red[i] = selectedTeam;
    
        }
    
        for(let i = 0; i < allianceSize; i++) {
    
            let selectedTeam  = currentQuery.teams[Math.floor(Math.random() * currentQuery.teams.length)];
            while(red.includes(selectedTeam) || blue.includes(selectedTeam)) {
    
                selectedTeam  = currentQuery.teams[Math.floor(Math.random() * currentQuery.teams.length)];
    
            }
            blue[i] = selectedTeam;
    
        }

    } else {

        red = r;
        blue = b;
    }

    if(testing) {

        console.log(red);
        console.log(blue);

    }

    let blueAlliance = document.querySelector("#blue-alliance");
    let blueAllianceContent = document.querySelector("#blue-alliance .content");
    let blueAllianceHolder = document.querySelector("#blue-alliance .content div");
    blueAllianceHolder.innerHTML = "";
    blueAllianceContent.querySelectorAll("p").forEach(elm => elm.remove());

    let scenarioBlue = (Math.random() * 100) < document.querySelector("#scenario-odds").value;
    if(testing) {

        console.log(scenarioBlue);

    }
    if(scenarioBlue) {

        let selectedIndex = Math.floor(Math.random() * blue.length);
        blue[selectedIndex] = JSON.parse(JSON.stringify(blue[selectedIndex]));
        blue[selectedIndex].failure = currentQuery.robotFailures[Math.floor(Math.random() * currentQuery.robotFailures.length)];

    }

    for(let alliance of blue) {

        let input = document.createElement("input");
        input.classList = "alliance-member";
        if(alliance.failure) {

            input.classList += " failure";
            let failureText = document.createElement("p");
            failureText.appendChild(document.createTextNode(`${alliance.team_number} failure: ${alliance.failure}`));
            blueAllianceContent.appendChild(failureText);

        }
        input.value = alliance.team_number;
        input.type = "number";
        input.originObject = alliance;
        input.ondblclick = openTeamPage;
        input.onchange = changedTeams;
        blueAllianceHolder.appendChild(input);

    }
    blueAlliance.removeAttribute("hidden");

    let redAlliance = document.querySelector("#red-alliance");
    let redAllianceContent = document.querySelector("#red-alliance .content");
    let redAllianceHolder = document.querySelector("#red-alliance .content div");
    redAllianceHolder.innerHTML = "";
    redAllianceContent.querySelectorAll("p").forEach(elm => elm.remove());
    
    let scenarioRed = (Math.random() * 100) < document.querySelector("#scenario-odds").value;
    if(testing) {

        console.log(scenarioRed);

    }
    if(scenarioRed) {

        let selectedIndex = Math.floor(Math.random() * red.length);
        red[selectedIndex] = JSON.parse(JSON.stringify(red[selectedIndex]));
        red[selectedIndex].failure = currentQuery.robotFailures[Math.floor(Math.random() * currentQuery.robotFailures.length)];

    }

    for(let alliance of red) {

        let input = document.createElement("input");
        input.classList = "alliance-member";
        if(alliance.failure) {

            input.classList += " failure";
            let failureText = document.createElement("p");
            failureText.appendChild(document.createTextNode(`${alliance.team_number} failure: ${alliance.failure}`));
            redAllianceContent.appendChild(failureText);

        }
        input.value = alliance.team_number;
        input.type = "number";
        input.originObject = alliance;
        input.ondblclick = openTeamPage;
        input.onchange = changedTeams;
        redAllianceHolder.appendChild(input);

    }
    redAlliance.removeAttribute("hidden");

}

function  openTeamPage() {

    if(testing) {

        console.log(event);

    }

    window.open(`${location.origin}?page=team.html&team=frc${event.target.originObject.team_number}`, "_blank");

}

async function changedTeams() {

    let foundTeam = false;
    for(let team of currentQuery.teams) {

        if(team.team_number == event.target.value) {
        
            foundTeam = true;
        
        }

    }
    if(!foundTeam) {

        alert("Invalid team number entered.");
        event.target.value = event.target.originObject.team_number;
        return;

    }

    let blueElms = document.querySelectorAll("#blue-alliance .alliance-member");
    let redElms = document.querySelectorAll("#red-alliance .alliance-member");
    
    let b = [];
    let r = [];

    for(let elm of blueElms) {

        document.querySelector("#blocker").removeAttribute("hidden");
        let team = await asyncGetTeam(`frc${elm.value}`);
        document.querySelector("#blocker").setAttribute("hidden", true);
        b.push(team);

    }

    for(let elm of redElms) {

        document.querySelector("#blocker").removeAttribute("hidden");
        let team = await asyncGetTeam(`frc${elm.value}`);
        document.querySelector("#blocker").setAttribute("hidden", true);
        r.push(team);

    }

    runScenario(r, b);

}