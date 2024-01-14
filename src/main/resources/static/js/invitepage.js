import {jwt} from "./util.js";

function addServerToUser(serverID) {
    fetch("http://localhost:8080/server/addServerToUser",{
        method: "POST",
        headers: {
            "authorization": jwt(),
            "content-type": "application/json"
        },
        body: serverID
    }).then((response)=>{
        console.log(response);
    })
}



$("#accept-invite").on("click",function (){
    const serverID = $("button[serverid]").attr("serverid");
    addServerToUser(serverID);
    window.location.href = `http://localhost:8080/server/${serverID}`;
})