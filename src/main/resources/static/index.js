
function sendMessage() {
    var curUser = document.cookie.split("=")[1];
    const input = document.querySelector("#typedinput").value;
    fetch('http://localhost:8080/postmessages', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'message': input})
    }).then(response => response.json())
        .then(response => console.log(JSON.stringify(response)))
    document.querySelector("#typedinput").value = '';
    const messageBox = document.querySelector("#messages");
    const divMessage = document.createElement("div");
    const tempMessage = document.createElement("p");
    const tempUserMessage = document.createElement("p");
    divMessage.classList.add("d-flex", "flex-row", "justify-content-start", "mb-4");
    tempMessage.classList.add("small","p-2","me-3","mb-1","text-white","rounded-3","bg-primary");
    tempUserMessage.textContent = curUser;
    tempMessage.textContent = input;
    divMessage.appendChild(tempMessage);
    messageBox.appendChild(divMessage);
}

async function grabAllMessages() {
    const messageBox = document.querySelector("#messages");
    let messages = []
    const response = await fetch("http://localhost:8080/getmessages", {
        method: 'GET',
        headers: {
            'Accept': "*/*",
            'Content-Type': "application/json"
        }
    });
    messages = await response.json();
    console.log(messages);
    var curUser = document.cookie.split("=")[1];
    console.log(curUser);
    for (const curMessage of messages) {
        console.log(curMessage);
        let message = curMessage.message;
        let username = curMessage.username;
        const divMessage = document.createElement("div");
        const tempMessage = document.createElement("p");
        if(curUser === username) {
            divMessage.classList.add("d-flex", "flex-row", "justify-content-start", "mb-4");
        }else{
            divMessage.classList.add("d-flex", "flex-row", "justify-content-end", "mb-4")
        }
        tempMessage.classList.add("small","p-2","me-3","mb-1","text-white","rounded-3","bg-primary");
        tempMessage.textContent = message;
        divMessage.appendChild(tempMessage);
        messageBox.appendChild(divMessage);
    }
}


document.addEventListener('keydown',function (e) {
    if(e.key === 'Enter'){
        if(document.querySelector("#typedinput").value !== "") {
            sendMessage();
        }
    }
})