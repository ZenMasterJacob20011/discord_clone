

export const decodedJWTJSON = parseJwt(localStorage.getItem("token"));
export let jwt = localStorage.getItem("token");
export let user;
function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

export function Circle(width, height) {
    return `
        <div style="width: ${width}; height: ${height}" class="circle">
            
        </div>
    `
}

export function Message(start, message, username) {
    return `
        <div style="height: 40px" class="mt-4 d-flex align-items-center flex-row mb-4 ${(start) ? "justify-content-start" : "justify-content-end"}">
            ${Circle("40px", "40px")}
            <div class="d-flex container-fluid flex-column">
                <div>
                    <span style="font-size: 16px; font-weight: 500" class="text-white">
                        ${username}
                    </span>
                </div>
                <div>
                    <span style="font-size: 16px; font-weight: 400" class="small">
                        ${message}
                    </span>
                </div>
            </div>
        </div>
    
    `
}


export async function loadUsersInfo() {
    const response = await fetch('http://localhost:8080/user/getUserInfo', {
        method: "GET",
        headers: {
            "Authorization": jwt
        }
    })

    user = await response.json();
}
await loadUsersInfo();
export function loadNameTag() {
    document.getElementById("name").innerText = decodedJWTJSON.sub;
}

export function addErrorMessageToHTML(cssSelector, errorMessage) {
    const css = document.querySelector(cssSelector);
    css.innerText = errorMessage;
    css.classList.add("text-danger")
}

export function handleCopyInviteLinkButton(){
    $("#copy-invite").on("click",function (){
        const inviteCode = document.getElementById("inviteCode").innerText;
        navigator.clipboard.writeText(inviteCode);
    });
}

export async function addServerToUser(jwt, serverID) {
    const response = await fetch("http://localhost:8080/server/addServerToUser", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": jwt
        },
        body: serverID
    })
    const responseJSON = await response.json();
    console.log(responseJSON);
}

window.onload = function () {
    loadNameTag();
}

async function getInviteLink(serverID) {
    let response = await fetch(`http://localhost:8080/server/${serverID}/invites`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": jwt
        }
    });
    let responseJSON = await response.json();
    let inviteCode = responseJSON.invite.inviteCode;
    let inviter = responseJSON.invite.inviter;
    $("#inviteCode").text(`http://localhost:8080/invite/${inviteCode}`);
}

/**
 * returns server information given a server_id. This checks the serverList property inside user
 * @param server_id the id of the server e.g. 1
 * @returns {undefined|Object}
 */
export function getServerInformationByID(server_id) {
    for (const server of user.serverList) {
        if (server.id == server_id) {
            return server
        }
    }
    return undefined
}