import {
    addErrorMessageToHTML,
    addServerToUser,
    getInviteLink,
    getServerInformationByID,
    loadUsersInfo,
    user
} from "./util.js";

function ServerCircle(serverID, serverName) {
    return `
        <li class="squircle">
            <button id="${serverID}" data-link>${serverName.substring(0, 2)}</button>
        </li>
    `
}

function insertServerCircleIntoSideBar(squircle) {
    document.getElementById("user-server-divider").insertAdjacentHTML("afterend", squircle);
}

function createServerCircle(serverID, serverName) {
    let squircle = ServerCircle(serverID, serverName);
    insertServerCircleIntoSideBar(squircle);
}

export async function loadSideServers() {
    let servers = user.serverList;
    for (const server of servers) {
        createServerCircle(server.id, server.serverName);
    }
}

function handleContextMenu() {
    let $contextMenu = $("#contextMenu");
    let curServerID;
    let serverInfo;
    $("body").on("contextmenu", "[data-link]", function (e) {
        console.log(e);
        if (e.target.id === "@me") {
            return false;
        }
        $contextMenu.css({
            display: "block",
            left: e.pageX,
            top: e.pageY
        });
        curServerID = e.currentTarget.id;
        getServerInformationByID(curServerID).then(r => {
            serverInfo = r;
        });
        return false;
    });
    $contextMenu.on("click", "#invite-people", function () {
        getInviteLink(curServerID).then(responseJSON => {
            $contextMenu.hide();
            $("#insertservername").text(`Invite friends to ${serverInfo.serverName} server`);
            let inviteCode = responseJSON.invite.inviteCode;
            $("#inviteCode").text(`http://localhost:8080/invite/${inviteCode}`);
        });
    })
    $('body').click(function () {
        $($contextMenu).hide();
    })
}

handleContextMenu();

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