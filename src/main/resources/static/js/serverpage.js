import {
    decodedJWTJSON, getServerInformationByID,
    handleCopyInviteLinkButton,
    loadNameTag, Message
} from "./util.js"
import {handleContextMenu, loadSideServers} from "./serversidebar.js";


loadNameTag();
loadSideServers();
handleContextMenu();
handleCopyInviteLinkButton()


async function sendMessage(serverID) {
    const input = document.querySelector("#typedinput").value;
    const response = await fetch(`http://localhost:8080/server/postmessages/${serverID}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify({
                'message': input
            }
        )
    });
    document.querySelector("#typedinput").value = '';
    console.log(response.status);
    if (response.status === 403) {
        window.location.href = "http://localhost:8080";
    }
}

export async function loadMessages(server_id) {
    fetch(`http://localhost:8080/server/messages/${server_id}`, {
        method: "GET"
    }).then((response) => {
        if (!response.ok) {
            throw new Error("Could not get server messages")
        }
        return response.json();
    }).then((messages) => {
        for (const message of messages) {
            addMessage(message);
        }
    });
}




export function addMessage(jsonData) {
    console.log(jsonData)
    const curUser = decodedJWTJSON.sub;
    if (window.location.pathname.match("\\/\\d+|\\/@me")[0].substring(1) == jsonData.serverID) {
        document.getElementById("main-content-mid").innerHTML += Message(jsonData.username === curUser, jsonData.message, jsonData.username);
    }
}

// document.getElementById("members-button").onclick = function (){
//     let serverMembersBar = document.getElementById("server-members");
//     if(serverMembersBar.style.display === "none"){
//         serverMembersBar.style.display = "";
//     }else{
//         serverMembersBar.style.display = "none";
//     }
// }

function MessageBar() {
    return `
        <input type="text" class="form-control message-bar" id="typedinput" placeholder="Type message">
    `
}

function ServerOptionsMenu(server_id) {
    console.log(getServerInformationByID(server_id))
    const serverName = getServerInformationByID(server_id).serverName
    return `
        <div class="dropdown" style="width: 100%">
            <button id="serverNameButton" class="btn w-100 dropdown-toggle p-0" type="button" data-bs-toggle="dropdown" style="height: 48px">
                ${getServerInformationByID(server_id).serverName}
            </button>
            <ul class="dropdown-menu">
                <li class="dropdown-item">1</li>
                <li class="dropdown-item">2</li>
                <li class="dropdown-item">3</li>
            </ul>
        </div>
    `
}

function ServerTopBar() {
    return `
        <div class="container-fluid d-flex justify-content-between align-items-center">
            <div class="flex-container">
                <svg width="24" height="24" viewBox="0 0 24 24" class="icon" x="0" y="0" aria-hidden="true" role="img">
                    <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M5.88657 21C5.57547 21 5.3399 20.7189 5.39427 20.4126L6.00001 17H2.59511C2.28449 17 2.04905 16.7198 2.10259 16.4138L2.27759 15.4138C2.31946 15.1746 2.52722 15 2.77011 15H6.35001L7.41001 9H4.00511C3.69449 9 3.45905 8.71977 3.51259 8.41381L3.68759 7.41381C3.72946 7.17456 3.93722 7 4.18011 7H7.76001L8.39677 3.41262C8.43914 3.17391 8.64664 3 8.88907 3H9.87344C10.1845 3 10.4201 3.28107 10.3657 3.58738L9.76001 7H15.76L16.3968 3.41262C16.4391 3.17391 16.6466 3 16.8891 3H17.8734C18.1845 3 18.4201 3.28107 18.3657 3.58738L17.76 7H21.1649C21.4755 7 21.711 7.28023 21.6574 7.58619L21.4824 8.58619C21.4406 8.82544 21.2328 9 20.9899 9H17.41L16.35 15H19.7549C20.0655 15 20.301 15.2802 20.2474 15.5862L20.0724 16.5862C20.0306 16.8254 19.8228 17 19.5799 17H16L15.3632 20.5874C15.3209 20.8261 15.1134 21 14.8709 21H13.8866C13.5755 21 13.3399 20.7189 13.3943 20.4126L14 17H8.00001L7.36325 20.5874C7.32088 20.8261 7.11337 21 6.87094 21H5.88657ZM9.41045 9L8.35045 15H14.3504L15.4104 9H9.41045Z"></path>
                </svg>
                <h5 class="mb-0 p-2" id="group-name">Chat</h5>
            </div>
            <div class="flex-container" style="gap: 1rem">
                <button class="members-button">
                    <svg x="0" y="0" class="icon" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"></path>
                        <path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M14 8.00598C14 10.211 12.206 12.006 10 12.006C7.795 12.006 6 10.211 6 8.00598C6 5.80098 7.794 4.00598 10 4.00598C12.206 4.00598 14 5.80098 14 8.00598ZM2 19.006C2 15.473 5.29 13.006 10 13.006C14.711 13.006 18 15.473 18 19.006V20.006H2V19.006Z"></path>
                        <path fill="currentColor" d="M20.0001 20.006H22.0001V19.006C22.0001 16.4433 20.2697 14.4415 17.5213 13.5352C19.0621 14.9127 20.0001 16.8059 20.0001 19.006V20.006Z"></path>
                        <path fill="currentColor" d="M14.8834 11.9077C16.6657 11.5044 18.0001 9.9077 18.0001 8.00598C18.0001 5.96916 16.4693 4.28218 14.4971 4.0367C15.4322 5.09511 16.0001 6.48524 16.0001 8.00598C16.0001 9.44888 15.4889 10.7742 14.6378 11.8102C14.7203 11.8418 14.8022 11.8743 14.8834 11.9077Z"></path>
                    </svg>
                </button>
                <div class="search-bar">
                    <input class="search" type="text" placeholder="Search">
                    <svg class="icon" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"></path>
                    </svg>
                </div>
            </div>
        </div>
    `
}


export function loadServerPage(server_id) {
    document.getElementById("content-sidebar-mid").innerHTML = ``;
    document.getElementById("content-sidebar-top").innerHTML = ServerOptionsMenu(server_id);
    document.getElementById("main-content-top").innerHTML = ServerTopBar();
    loadMessages(server_id)
    document.getElementById("main-content-bot").innerHTML = MessageBar();
    document.getElementById("typedinput").addEventListener("keydown", e => {
        if (e.key === 'Enter') {
            if (document.querySelector("#typedinput").value !== "" && document.activeElement === document.getElementById("typedinput")) {
                sendMessage(server_id);
            }
        }
    })
}

function ServerCircle(serverID, serverName) {
    return `
        <li class="squircle">
            <button id="${serverID}" data-link>${serverName.substring(0, 2)}</button>
        </li>
    `
}

export function createServerCircle(serverID, serverName) {
    let squircle = ServerCircle(serverID, serverName);
    insertServerCircleIntoSideBar(squircle);
}


function insertServerCircleIntoSideBar(squircle) {
    document.getElementById("user-server-divider").insertAdjacentHTML("afterend", squircle);
}