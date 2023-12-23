

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
        <div style="width: ${width}; height: ${height}; position: absolute" class="circle">
            
        </div>
    `
}

export function SearchBar() {
    return `
        <div class="search-bar rounded">
            <input class="search p-2" name="search-for-friends" type="text" placeholder="Search">
            <svg class="icon me-2" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"></path>
            </svg>
        </div>
    `;
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
export function inviteFriendToServer(username, serverID) {

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

export async function getInviteLink(serverID) {
    return fetch(`http://localhost:8080/invite/getInviteLink/${serverID}`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            "authorization": jwt
        }
    }).then(response => {
        if (response.ok){
            return response.json();
        }
        throw Error("Could not get response json for invite link")
    }).then(responseJSON => {
        return responseJSON;
    });
}

/**
 * returns server information given a server_id as a JSON object
 * @param server_id {String} the id of the server e.g. 1
 * @returns The JSON object containing server information
 */
export async function getServerInformationByID(server_id) {
    if (localStorage.getItem(server_id) === null){
        return fetch(`http://localhost:8080/server/${server_id}/getServerInfo`, {
            method: "GET"
        }).then(r => {
            if (!r.ok){
                throw Error(`Could not fetch server info with the id ${server_id}`);
            }
            return r.json();
        }).then(serverInfo => {
            console.log(serverInfo)
            localStorage.setItem(String(server_id),JSON.stringify(serverInfo));
            return serverInfo;
        });
    }
    return JSON.parse(localStorage.getItem(server_id));

}

/**
 * This will fetch the server with only the given two users in it. The object with be a serverDTO as JSON
 * @param username
 * @returns {Promise<Response>}
 */
export function getServerIDWithOnlyThisUserInIt(username) {
    return fetch(`http://localhost:8080/server/directmessage/${username}`,{
        method: "GET"
    });
}