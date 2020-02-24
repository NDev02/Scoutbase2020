
async function homeInit() {

    if(localStorage.getItem("uuid") == null) {

        setPage('profile.html');

    }

    currentEvents((events) => {

        if(events.length > 0) {

            document.querySelector("#current-events .content p").remove();
            let list = arrayToList(events, "event-list", "item.name", true);
            document.querySelector("#current-events .content").appendChild(list);

            for(let child of list.children) {
                
                child.children[0].onclick = () => {

                    let q = {

                        key: event.target.originObject.key

                    }
                    setPage("event.html", q);

                }

            }

        }

    }, console.error);

    let messages = await readData("/messages");
    document.querySelector("#team-message-board .content p").innerHTML = messages;

    let teamList = await readData(`/registered_users/${localStorage.getItem("name")}/team_watch`);
    let list = document.querySelector(".team-list");
    if(teamList !== null) {

        for(let key in teamList) {

            let team = teamList[key];
            let template = `<li onclick="setPage('team.html', {team: '${team}'})">${team}</li>`;
            list.innerHTML = list.innerHTML + template;
    
        }

        list.removeAttribute("hidden");
        document.querySelector("#team-watchlist .content p").setAttribute("hidden", true);

    }

}