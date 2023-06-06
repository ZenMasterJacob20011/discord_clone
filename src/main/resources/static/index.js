
function sendMessage() {
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
    for (const message of messages) {
        const divMessage = document.createElement("div");
        const tempMessage = document.createElement("p");
        divMessage.classList.add("d-flex","flex-row","justify-content-start","mb-4");
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