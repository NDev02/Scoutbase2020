let formInputs;
let originalInputs;

function scoutInit() {

    formInputs = {};
    
    let inputs = document.querySelectorAll("input");
    for(let elm of inputs) {

        if(formInputs[elm.id] == undefined) {

            formInputs[elm.id] = 0;

        }

        elm.onchange = function() {

            formInputs[elm.id] = elm.value;
            if(formInputs[elm.id] == parseInt(formInputs[elm.id])) {

                formInputs[elm.id] = parseInt(formInputs[elm.id]);

            }

        }

    }

    let selects = document.querySelectorAll("select");
    for(let elm of selects) {

        if(formInputs[elm.id] == undefined) {

            formInputs[elm.id] = "false";

        }

        elm.oninput = function() {

            formInputs[elm.id] = elm.selectedOptions[0].value;

        }

    }


    currentEvents(e => {

        e.forEach(event => {

            let opt = document.createElement("option");
            opt.setAttribute("value", event.key);
            opt.appendChild(document.createTextNode(event.name));
            document.querySelector("#scouting-event").appendChild(opt);

        });

        document.querySelector("#scouting-event").oninput = function() {

            formInputs["scouting-event"] = document.querySelector("#scouting-event").selectedOptions[0].value;

        }

        let i = 0;

        for(let child of document.querySelector("#scouting-event").children) {

            if(localStorage.getItem("currentEvent") == (child.value)) {
    
                document.querySelector("#scouting-event").selectedIndex = i;
                formInputs["scouting-event"] = child.value;
                originalInputs["scouting-event"] = child.value;
    
            }
            i++;
    
        }

    }, console.error);

    originalInputs = JSON.parse(JSON.stringify(formInputs));

}

async function submit() {

    if(formInputs["scouting-event"] == "false") {

        alert("Choose an event.");
        return;

    }

    if(formInputs["match-number"] == 0) {

        alert("Enter a match number.");
        return;

    }

    if(formInputs["team-number"] == 0) {

        alert("Enter a team number.");
        return;

    }
    
    if(!(await validData(formInputs["scouting-event"], "frc" + formInputs["team-number"], formInputs["match-number"]))) {

        alert("Check team and match number, inputed team is not in inputed match.");
        return;

    }

    document.querySelector("#blocker").removeAttribute("hidden");

    setData(`/${formInputs["scouting-event"]}/${formInputs["team-number"]}/${formInputs["match-number"]}`, formInputs, () => {
        
        alert("Form Submitted");
        document.querySelector("#blocker").setAttribute("hidden", true);
        setPage('scout.html');

    });
    
}