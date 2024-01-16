import {jwt} from "./util.js";

function addServerToUser(serverID: number | string) {
    fetch("http://localhost:8080/server/addServerToUser",{
        method: "POST",
        headers: {
            "authorization": <string>jwt(),
            "content-type": "application/json"
        },
        body: <string>serverID
    }).then((response)=>{
        console.log(response);
    })
}



// @ts-ignore
$("#accept-invite").on("click",function (){
    // @ts-ignore
    const serverID = $("button[serverid]").attr("serverid");
    addServerToUser(serverID);
    window.location.href = `http://localhost:8080/server/${serverID}`;
})