import {
    addErrorMessageToHTML,
    addServerToUser, Circle,
    getInviteLink,
    getServerInformationByID, inviteFriendToServer,
    loadUsersInfo,
    user
} from "./util.js";
import {subscribeToChannel} from "./websocket.js";

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
        createServerCircle(server.serverID, server.serverName);
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

            function createInviteFriendButtonBars() {
                getServerInformationByID(curServerID).then(server => {
                    function createInviteFriendButtonBar(user) {
                        document.getElementById("invite-friends-list").insertAdjacentHTML("beforeend",
                            `
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="d-flex align-items-center">
                                    ${Circle("32px", "32px")}
                                    <div style="padding-left: 40px">
                                        ${user.username}
                                    </div>
                                </div>
                                <div>
                                    <button class="invite-button btn btn-outline-success btn-sm text-white">Invite</button>
                                </div>
                            </div>
                            `
                        );
                        document.getElementsByClassName("invite-button")
                            .item(document.getElementsByClassName("invite-button").length - 1)
                            .addEventListener("click", function () {
                                inviteFriendToServer(user.username, server.id);
                            })
                    }

                    document.getElementById("invite-friends-list").innerHTML = "";
                    user.acceptedFriends.forEach(createInviteFriendButtonBar)
                })
                document.getElementById("invite-friends-list")
            }

            createInviteFriendButtonBars()
            let inviteCode = responseJSON.invites[responseJSON.invites.length - 1].inviteCode;
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
    createServerCircle(json.serverID, serverName);
    await addServerToUser(localStorage.getItem("token"), json.serverID);
    await loadUsersInfo();
    console.log(user);
    getServerInformationByID(json.serverID).then(serverInfo => {
        console.log(serverInfo);
        subscribeToChannel(serverInfo.channels[0].channelID);
    })
}

document.getElementById("createServerButton").onclick = function () {
    createServer();
}