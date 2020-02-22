
function homeInit() {

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

}