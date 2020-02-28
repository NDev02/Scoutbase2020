function teamsInit() {

    getTeams(localStorage.currentEvent, 'team_number', (teamData) => {

        if(testing) {

            console.log(teamData);

        }

        document.querySelector("#teams .content p").remove();
        let table = arrayToTable(teamData, "teams-table", ["team_number", "nickname"], ["Number", "Name"]);
        
        for(let row of table.children) {

            if(row.originObject) {

                row.onclick = () => {

                    setPage('team.html', {team: row.originObject.key});

                }

            }

        }

        document.querySelector("#teams .content").appendChild(table);

    }, console.error);

}