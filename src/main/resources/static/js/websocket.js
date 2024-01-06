import {addMessage} from "./serverpage.js";
import {getServerInformationByID, user} from "./util.js";

let stompClient = null

function connect() {
    console.log(user);
    let socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        if (user.serverList.length > 0) {
            for (const serverInfo of user.serverList) {
                getServerInformationByID(serverInfo.serverID).then(serverInfo => {
                    console.log(serverInfo);
                    for (const channel of serverInfo.channels) {
                        subscribeToChannel(channel.channelID);
                    }
                });
            }
        }
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}

export function subscribeToChannel(channelID) {
    stompClient.subscribe(`/topic/${channelID}`, function (messageJSON) {
        console.log(messageJSON);
        addMessage(JSON.parse(messageJSON.body));
    });
}

connect();


window.onbeforeunload = function () {
    disconnect();
}