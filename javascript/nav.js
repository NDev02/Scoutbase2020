function toggleNavigation() {

    let nav = document.querySelector(".nav");
    let closed = nav.hasAttribute("closed");

    if(closed || window.innerWidth > 800) {

        nav.removeAttribute("closed");
        document.body.style.gridTemplateRows = "1fr";
    
    } else {
    
        nav.setAttribute("closed", "");
        document.body.style.gridTemplateRows = "5em auto";
    
    }

}