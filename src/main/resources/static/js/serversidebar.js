import {addErrorMessageToHTML, addServerToUser, loadUsersInfo, user} from "./util.js";
import {createServerCircle, loadServerPage} from "./serverpage.js";
import {loadProfilePage} from "./profilepage.js";


let servers = []

export async function loadSideServers() {
    let servers = user.serverList;
    for (const server of servers) {
        createServerCircle(server.id, server.serverName);
    }
}

export function handleContextMenu() {
    let $contextMenu = $("#contextMenu");
    let curServerID;
    let curServerName;
    $("body").on("contextmenu", "li.squircle button", function (e) {
        console.log(e);
        $contextMenu.css({
            display: "block",
            left: e.pageX,
            top: e.pageY
        });
        curServerID = e.currentTarget.id;
        curServerName = e.currentTarget.servername;
        return false;
    })
    $contextMenu.on("click", "button#invite-people", function (e) {
        getInviteLink(curServerID);
        $("#insertservername").text(`Invite friends to ${curServerName} server`);
        $contextMenu.hide();
    })
    $('body').click(function () {
        $($contextMenu).hide();
    })
}



export async function createServer() {
    let serverName = document.getElementById("serverName").value;
    let response = await fetch("http://localhost:8080/server/createserver", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "serverName": serverName
        })

    });
    if (!response.ok) {
        addErrorMessageToHTML("label[for='serverName']", "server name length must be greater than 2");
        return;
    }
    const json = await response.json();
    createServerCircle(json.id, serverName);
    await addServerToUser(localStorage.getItem("token"), json.id);
    await loadUsersInfo();
}

document.getElementById("createServerButton").onclick = function () {
    createServer();
}
