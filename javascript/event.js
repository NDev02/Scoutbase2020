function eventInit() {

    getEvent(currentQuery.key, (eventData) => {

        if(testing) {

            console.log(eventData);

        }

        document.querySelector("#name").innerHTML = eventData.name;
        document.querySelector("#city-state").innerHTML = `${eventData.city}, ${eventData.state_prov}`;
        document.querySelector("#start-date .content p").innerHTML = eventData.start_date;
        document.querySelector("#end-date .content p").innerHTML = eventData.end_date;
        document.querySelector("#event-location iframe").setAttribute("src", `https://www.google.com/maps/embed/v1/place?q=place_id:${eventData.gmaps_place_id}&key=${mapsKey}`);

    }, console.error);

    getTeams(currentQuery.key, 'team_number', (teamData) => {

        if(testing) {

            console.log(teamData);

        }

        document.querySelector("#teams .content p").remove();
        let table = arrayToTable(teamData, "teams-table", ["team_number", "nickname"], ["Number", "Name"]);
        
        for(let row of table.children) {

            if(row.originObject) {

                row.onclick = () => {

                    let website = event.srcElement.parentElement.originObject.website;
                    if(website) {

                        window.open(website, "_blank");

                    } else {

                        alert("No website for " + event.srcElement.innerHTML);

                    }

                }

            }

        }

        document.querySelector("#teams .content").appendChild(table);

    }, console.error);

}