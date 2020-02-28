async function profileInit() {

    if(localStorage.getItem("uuid") == null) {
        
        localStorage.clear();
        let name = prompt("Enter your name to setup application");
        name = name.toLowerCase().replace(/ /g, "_").replace(/\./g, "_");
        let uuid = uuidv4();
        pushData(`/registered_users/${name}`, uuid);
        localStorage.setItem("uuid", uuid);
        localStorage.setItem("name", name);

    }

    document.querySelector("#user-id").value = localStorage.getItem("uuid");
    
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

function uuidv4() {
    
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {

        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);

    });

}