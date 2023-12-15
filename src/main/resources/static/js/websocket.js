import {addMessage} from "./serverpage.js";

let stompClient = null

function connect() {
    let socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        // setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/chat', function (messageJSON) {
            console.log("I just ran")
            addMessage(JSON.parse(messageJSON.body));
        });
    });
}

function disconnect() {
    if (stompClient !== null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}


connect();


window.onbeforeunload = function () {
    disconnect();
}