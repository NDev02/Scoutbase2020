async function statsInit() {
    
    let teams = await asyncGetTeams(localStorage.getItem("currentEvent"), "team_number");
    let teamList = document.querySelector("#teams");
    for(let team of teams) {

        let elm = document.createElement("option");
        elm.appendChild(document.createTextNode(team.team_number));
        teamList.append(elm);

    }

    document.querySelector("#team-select").oninput = async () => {

        let data = await readData(`/${localStorage.getItem("currentEvent")}/${event.target.value}/`);
        generateCharts(data);

    }

}

function generateCharts(data) {

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

    console.log(flatData);

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
    let autoShotTopInner = {
        x: flatData["auto-top-inner"],
        type: 'box',
        name: 'Top Inner',
        boxmean: true,
        marker: {
            color: '#0f2481'
        }
    };
    Plotly.newPlot('auto-shot', [autoShotBottom, autoShotTopOuter, autoShotTopInner], {font: {family: 'Roboto, sans-serif'}}, layout);

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
    let teleShotTopInner = {
        x: flatData["auto-top-inner"],
        type: 'box',
        name: 'Top Inner',
        boxmean: true,
        marker: {
            color: '#0f2481'
        }
    };
    Plotly.newPlot('tele-shot', [teleShotBottom, teleShotTopOuter, teleShotTopInner], {font: {family: 'Roboto, sans-serif'}}, layout);
}

function arrAvg(arr) {

    let sum = 0;

    for(let val of arr) {

        sum += val;

    }

    return sum / arr.length;
    
}