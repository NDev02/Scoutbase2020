let version = "1.0.5";

let testing = false;

let currentQuery = {};

window.addEventListener("load", () => {

    validationInterval = setInterval(pageValidate, 1000 / 60);
    let q = {};
    for(let item of location.search.substring(1).split("&")) {

        let arr = item.split("=");
        q[arr[0]] = arr[1];

    }

    setPage(q.page || "home.html", q);

});

function pageValidate() {

    let nav = document.querySelector(".nav");

    if(window.innerWidth > 800 && nav.hasAttribute("closed")) {

        toggleNavigation();
    
    }

    if(window.innerWidth < 800) {

        let container = document.querySelector(".container");

        if(!nav.hasAttribute("closed")) {

            container.addEventListener("click", toggleNavigation);

        } else {

           container.removeEventListener("click", toggleNavigation);

        }

    }

}

function setPage(url, query) {

    if(query == undefined) {
        
        query = {};

    }

    let str = `?page=${url}`;

    for(let i = (Object.keys(query)[0] == "page" ? 1: 0); i < Object.keys(query).length; i++) {

        let qKey = Object.keys(query)[i];
        str += (`&${qKey}=${query[qKey]}`);

    }

    if(location.search != str) {
        
        location.search = str;

    }

    currentQuery = query;

    if(currentQuery.testing || eval(localStorage.getItem("testing"))) {

        testing = true;
        localStorage.setItem("testing", true);

    }

    if(currentQuery.mobile_testing) {

        testing = true;
        console.log = (val) => {

            if(typeof val == "object") {

                val = JSON.stringify(val);

            }
            alert(val);

        };

        console.error = (err) => {

            alert(err);

        }

    }

    fetch(url).then(res => res.text()).then(html => {

        document.querySelector(".container").innerHTML = html;
        let loadCommand = html.split("\n")[0].substring(html.indexOf("<!--") + 4, html.indexOf("-->"));
        eval(loadCommand);

    });

}

function arrayToList(arr, classList, evalPath, links) {

    let list = document.createElement("ul");
    list.classList = classList;

    for(let item of arr) {

        let listItem = document.createElement("li");
        if(evalPath) {

            if(links) {

                let link = document.createElement("a");
                link.appendChild(document.createTextNode(eval(evalPath)));
                link.originObject = JSON.parse(JSON.stringify(item));
                listItem.appendChild(link);

            } else {

                listItem.appendChild(document.createTextNode(eval(evalPath)));
                listItem.originObject = JSON.parse(JSON.stringify(item));

            }

        } else {
            
            if(links) {

                let link = documnet.createElement("a");
                link.appendChild(document.createTextNode(item));
                listItem.appendChild(link);

            } else {

                listItem.appendChild(document.createTextNode(item));

            }

        }
        list.appendChild(listItem);

    }

    return list;

}

function arrayToTable(arr, classList, column_heads, table_heads) {

    let table = document.createElement("table");
    table.classList = classList;

    if(table_heads) {

        let row = document.createElement("tr");
        for(let head of table_heads) {

            let th = document.createElement("th");
            th.appendChild(document.createTextNode(head));
            row.appendChild(th);

        }
        table.appendChild(row);

    }

    for(let obj of arr) {

        let row = document.createElement("tr");
        row.originObject = JSON.parse(JSON.stringify(obj));

        for(let col of column_heads) {

            let td = document.createElement("td");
            td.appendChild(document.createTextNode(obj[col]));
            row.appendChild(td);

        }

        table.appendChild(row);

    }

    return table;

}

function createElement(elm, text) {

    let e = document.createElement(elm);
    e.appendChild(document.createTextNode(text));
    return e;

}

function setEvent() {

    if(currentQuery.page == "event.html") {

        localStorage.currentEvent = currentQuery.key;

    }

}