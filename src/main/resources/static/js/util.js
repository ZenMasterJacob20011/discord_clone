

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

/**
 * converts a standard datetime to a more human-readable datetime
 * @param dateTime {string} the datetime in the form YYYY-MM-DDTHH:MM:SS.SSS e.g. 2023-12-15T19:46:41.0922186
 * @returns {string} human readable datetime e.g. Today at 7:46 PM
 */
export function convertDateTimeToString(dateTime) {
    const dateTimeObject = new Date(dateTime);
    const today = new Date();
    const yesterday = today.getDay()-1 <= -1 ? 6 : today.getDay()-1;
    const localTime = dateTimeObject.toLocaleTimeString().substring(0,dateTimeObject.toLocaleTimeString().lastIndexOf(":")) + dateTimeObject.toLocaleTimeString().substring(dateTimeObject.toLocaleTimeString().lastIndexOf(" "));
    let localDate = dateTimeObject.toLocaleDateString();
    if(dateTimeObject.getDay() === today.getDay()){
        localDate = "Today";
    }else if(dateTimeObject.getDay() === yesterday){
        localDate = "Yesterday";
    }
    return `${localDate} at ${localTime}`
}

/**
 * contains html for displaying messages with profile picture
 * @param message {string} the message
 * @param username {string} user who sent the message
 * @param timestamp {string} the time the message was sent
 * @returns {string} the html
 */
export function MessageWithProfilePicture(message, username, timestamp) {
    return `
        <div style="height: 48px; margin-top: 17px" data-timestamp="${timestamp}" data-username="${username}">
            <span style="position: absolute">${Circle("40px", "40px")}</span>
            <div style="padding-left: 50px">
                <span style="font-size: 16px; font-weight: 500" class="text-white">
                    ${username}
                </span>
                <span>
                    <time style="font-size: 12px; color: rgb(148, 155, 164); margin-left: 4px" datetime="${timestamp}">${convertDateTimeToString(timestamp)}</time>
                </span>
            </div>
            ${Message(message,username,timestamp)}
        </div>
    
    `
}

/**
 * contains the html to display a message without displaying the profile picture and username
 * @param message {string} the message to be displayed
 * @param username {string} the username stored in data-username attribute
 * @param timestamp {string} the timestamp stored in data-timestamp attribute
 * @returns {string} the html
 * @constructor
 */
export function Message(message, username, timestamp) {
    return `
        <div style="padding-left: 50px" data-timestamp="${timestamp}" data-username="${username}">
            <span style="font-size: 16px; font-weight: 400" class="small">
                ${message}
            </span>
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

Date.prototype.addMinutes = function(m) {
    this.setTime(this.getTime() + (m*60*1000));
    return this;
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
 * returns server information given a server_id
 * @param server_id {Number} the id of the server e.g. 1
 * @returns {Object}
 */
export async function getServerInformationByID(server_id) {
    const response = await fetch(`http://localhost:8080/server/${server_id}/getServerInfo`, {
        method: "GET"
    });
    if (response.ok) {
        return response.json();
    } else {
        throw Error(await response.text());
    }
}