const decodedJWTJSON = parseJwt(localStorage.getItem("token"));

async function sendMessage() {
    const input = document.querySelector("#typedinput").value;
    const response = await fetch('http://localhost:8080/postmessages', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("token")
        },
        body: JSON.stringify({'message': input})
    });
    document.querySelector("#typedinput").value = '';
    console.log(response.status);
    if(response.status === 403) {
        window.location.href = "http://localhost:8080";
    }
}

async function getMessages() {
    const response = await fetch("http://localhost:8080/getmessages", {
        method: 'GET',
        headers: {
            'Accept': "*/*",
            'Content-Type': "application/json"
        }
    });
    let messages = await response.json();
    for (const curMessage of messages) {
        addMessage(curMessage);
    }
}


function addMessage(jsonData) {
    const curUser = decodedJWTJSON.sub;

    const messageBox = document.querySelector("#messages");
    const divMessage = document.createElement("div");
    const justADiv = document.createElement('div');
    const tempMessage = document.createElement("p");
    const tempUserMessage = document.createElement("p");
    if(jsonData.username === curUser) {
        divMessage.classList.add("d-flex", "flex-row", "justify-content-start", "mb-4");
    }else{
        divMessage.classList.add("d-flex", "flex-row", "justify-content-end", "mb-4");
    }
    tempMessage.classList.add("small","p-2","me-3","text-white","rounded-3","bg-primary");
    tempUserMessage.classList.add("small","p-2","mb-1","font-weight-bold");
    tempUserMessage.textContent = jsonData.username;
    tempMessage.textContent = jsonData.message;
    justADiv.appendChild(tempMessage);
    divMessage.appendChild(tempUserMessage);
    divMessage.appendChild(justADiv);
    messageBox.appendChild(divMessage);
}

function parseJwt (token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}



document.addEventListener('keydown',function (e) {
    if(e.key === 'Enter'){
        if(document.querySelector("#typedinput").value !== "") {
            sendMessage();
        }
    }
})

let stompClient = null
function connect() {
    let socket = new SockJS('/gs-guide-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function (frame) {
        // setConnected(true);
        console.log('Connected: ' + frame);
        stompClient.subscribe('/topic/chat', function (messageJSON) {
            // console.log(greeting);
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

window.onbeforeunload = function (){
    disconnect();
}