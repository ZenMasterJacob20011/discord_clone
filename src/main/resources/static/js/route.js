import {loadProfilePage} from "./profilepage.js";
import {loadChannel, loadServerPage} from "./serverpage.js";
import {getServerInformationByID} from "./util.js";

let currentServerID = null;


/**
 * This will update the page accordingly to the current href in the browsers' path. Ideally it is not to be used directly
 * but instead to be used within another function
 * @returns {Promise<void>}
 */
const router = async () => {
    //if the href is just the server then default the general channel
    //if the href is the server and channel then add logic for channel navigation
    const re = /\/\d+|\/@me/g
    const href = window.location.pathname.match(re);
    console.log("href: " + href);
    if (href === null) {
        return;
    }
    console.log(href)
    if (href.length === 1) {
        if (href[0].substring(1) === "@me") {
            loadProfilePage();
        } else {
            const serverID = href[0].substring(1);
            const serverInfo = await getServerInformationByID(serverID)
            loadServerPage(serverInfo);
            loadChannel(serverInfo.channels[0].channelID);
        }
    } else if (href.length > 1) {
        const serverID = href[0].substring(1);
        const channelID = href[1].substring(1);
        if (currentServerID == serverID){
            loadChannel(channelID);
        }else{
            const serverInfo = await getServerInformationByID(serverID)
            loadServerPage(serverInfo);
            loadChannel(channelID);
        }
    }
    currentServerID = href[0].substring(1);
}

/**
 * used to navigate to another page. will push the state of the page to the history api for forward and backward traversal
 * @param href {String} the page to navigate to
 */
export function navigateTo(href) {
    history.pushState(null, null, `http://localhost:8080/server/${href}`);
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