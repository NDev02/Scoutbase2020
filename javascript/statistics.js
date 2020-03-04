async function statsInit() {
    
    hideCharts();

    let teams = await asyncGetTeams(localStorage.getItem("currentEvent"), "team_number");
    let teamList = document.querySelector("#teams");
    for(let team of teams) {

        let elm = document.createElement("option");
        elm.appendChild(document.createTextNode(team.team_number));
        teamList.append(elm);

    }

    document.querySelector("#team-select").oninput = async (val) => {

        if(!val.real) {

            let data = await readData(`/${localStorage.getItem("currentEvent")}/${event.target.value}/`);
            generateCharts(data);

        } else {

            let data = await readData(`/${localStorage.getItem("currentEvent")}/${val.real}/`);
            generateCharts(data);

        }

    }

    if(currentQuery.team) {

        document.querySelector("#team-select").value = currentQuery.team.substring(3);
        document.querySelector("#team-select").oninput({real: currentQuery.team.substring(3)});

    }

}

function hideCharts() {

    let cards = document.querySelectorAll(".card:not(:first-child)");
    for(let card of cards) {

        card.setAttribute("hidden", true);
    
    }

}

function showCharts() {

    let cards = document.querySelectorAll(".card:not(:first-child)");
    for(let card of cards) {

        card.removeAttribute("hidden");
    
    }

}

function generateCharts(data) {

    if(!data || document.querySelector("#team-select").value == "") {
        
        hideCharts();
        return;

    } else {

        showCharts();
    
    }

    let options = {
        font: {
            family: 'Roboto, sans-serif'
        }
    };
    let layout = {
        autosize: true,
        dragmode: true,
        responsive: true
    };

    data = Object.values(data);
    data = data.filter(elm => {return elm != undefined});

    let flatData = {};
    let firstPass = true;

    for(let form of data) {

        if(firstPass) {

            for(let field in form) {
    
                flatData[field] = [];
    
            }

            firstPass = false;

        }

        for(let field in form) {

            flatData[field].push(form[field]);

        }

    }

    let crossedLine = {
        values: [getArrOccurence(flatData["cross-line"], "false"), getArrOccurence(flatData["cross-line"], "true")],
        labels: ["Didn't Cross Auto Line", "Crossed Auto Line"],
        type: 'pie',
        marker: {
            colors: ['red', 'green']
        }
    };
    Plotly.newPlot('crossed-line', [crossedLine], options, layout);

    let autoShotBottom = {
        x: flatData["auto-bottom"],
        type: 'box',
        name: 'Bottom',
        boxmean: true,
        marker: {
            color: '#0f2481'
        }
    };
    let autoShotTopOuter = {
        x: flatData["auto-top-outer"],
        type: 'box',
        name: 'Top Outer',
        boxmean: true,
        marker: {
            color: '#0f2481'
        }
    };
    Plotly.newPlot('auto-shot', [autoShotBottom, autoShotTopOuter], options, layout);

    let shotDistanceAuto = {
        values: [getArrOccurence(flatData["auto-shot-distance"], "false"), getArrOccurence(flatData["auto-shot-distance"], "true")],
        labels: ["Shot against wall", "Shot from distance"],
        type: 'pie',
        marker: {
            colors: ['red', 'green']
        }
    };
    Plotly.newPlot('shot-distance-auto', [shotDistanceAuto], options, layout);

    let collectedAuto = {
        values: [getArrOccurence(flatData["auto-collect"], "false"), getArrOccurence(flatData["auto-collect"], "true")],
        labels: ["No Gathering in Auto", "Gathered in Auto"],
        type: 'pie',
        marker: {
            colors: ['red', 'green']
        }
    };
    Plotly.newPlot('collected-auto', [collectedAuto], options, layout);

    let teleShotBottom = {
        x: flatData["tele-bottom"],
        type: 'box',
        name: 'Bottom',
        boxmean: true,
        marker: {
            color: '#0f2481'
        }
    };
    let teleShotTopOuter = {
        x: flatData["tele-top-outer"],
        type: 'box',
        name: 'Top Outer',
        boxmean: true,
        marker: {
            color: '#0f2481'
        }
    };
    Plotly.newPlot('tele-shot', [teleShotBottom, teleShotTopOuter], options, layout);

    let shotDistanceTele = {
        values: [getArrOccurence(flatData["tele-shot-distance"], "false"), getArrOccurence(flatData["tele-shot-distance"], "true")],
        labels: ["Shot against wall", "Shot from distance"],
        type: 'pie',
        marker: {
            colors: ['red', 'green']
        }
    };
    Plotly.newPlot('shot-distance-tele', [shotDistanceTele], options, layout);

    let controlPanel = {
        values: [getArrOccurence(flatData["control-panel"], "false"), getArrOccurence(flatData["control-panel"], "true")],
        labels: ["No Control Panel", "Did Control Panel"],
        type: 'pie',
        marker: {
            colors: ['red', 'green']
        }
    };
    Plotly.newPlot('control-panel', [controlPanel], options, layout);

    let noEndGameCount = flatData["climbed"].length - (getArrOccurence(flatData["climbed"], "true") + getArrOccurence(flatData["parked"], "true"))
    let endGame = {
        values: [noEndGameCount, getArrOccurence(flatData["parked"], "true"), getArrOccurence(flatData["climbed"], "true")],
        labels: ["Nothing", "Parked", "Climbed"],
        type: 'pie',
        marker: {
            colors: ['red', 'orange', 'green']
        }
    };
    Plotly.newPlot('end-game', [endGame], options, layout);

    let defense = {
        values: [getArrOccurence(flatData["defense"], "false"), getArrOccurence(flatData["defense"], "true")],
        labels: ["No Defense", "Defense"],
        type: 'pie',
        marker: {
            colors: ['red', 'green']
        }
    };
    Plotly.newPlot('defense', [defense], options, layout);

}

function arrAvg(arr) {

    let sum = 0;

    for(let val of arr) {

        sum += val;

    }

    return sum / arr.length;
    
}

function getArrOccurence(arr, search) {

    let count = 0;

    for(let val of arr) {

        if(val == search)
            count ++;

    }

    return count;

}