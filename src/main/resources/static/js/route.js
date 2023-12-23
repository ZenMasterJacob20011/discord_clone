import {loadProfilePage} from "./profilepage.js";
import {loadServerPage} from "./serverpage.js";

const router = async () => {
    const href = window.location.pathname.match("\\/\\d+|\\/@me")[0].substring(1);
    if(href === null){
        return;
    }
    console.log(href)
    if(href === "@me"){
        loadProfilePage();
    }else{
        loadServerPage(href);
    }
}

export function navigateTo(href) {
    history.pushState(null, null, `${href}`);
    router();
}

document.addEventListener("click", e => {
    if (e.target.matches("[data-link]")) {
        e.preventDefault();
        navigateTo(e.target.id);
    }
})

window.addEventListener("popstate", (e) => {
    router();
})

router();