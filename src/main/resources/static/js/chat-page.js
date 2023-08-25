import {loadNameTag} from "./modules/util.js"
import {createServer, handleContextMenu, loadSideServers} from "./modules/server.js";
import {loadUserPage} from "./modules/profile.js";
function main() {
    loadNameTag();
    loadSideServers();
    document.getElementById("home-icon").onclick = function (){
        loadUserPage();
    }
    document.getElementById("createServerButton").onclick = function (){
        createServer();
    }
    handleContextMenu();
}

main();