
let pitScoutForm = {};

function pitScoutInit() {
    
    for(let elm of document.querySelectorAll("input")) {

        let field = (elm.id.replace(/_/g, " "));
        let value = "";
        pitScoutForm[field] = value;

        elm.onchange = () => {

            let field = (event.target.id.replace(/_/g, " "));
            let value = (event.target.value);
            pitScoutForm[field] = value;

        };

    }

}

function submitPit() {

    for(let elm of document.querySelectorAll("input")) {

        let field = (elm.id.replace(/_/g, " "));
        if(pitScoutForm[field] == "") {

            alert("Need to fill out field: " + field);
            return;

        }

    }

    document.querySelector("#blocker").removeAttribute("hidden");

    setData(`/teams/${pitScoutForm["team-number"]}`, pitScoutForm, () => {
        
        alert("Form Submitted");
        document.querySelector("#blocker").setAttribute("hidden", true);
        setPage('pit-scout.html');

    });

}