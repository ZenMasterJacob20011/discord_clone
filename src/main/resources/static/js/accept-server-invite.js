import {jwt} from "./util.js";

function acceptServerInvite(serverID) {

    console.log(serverID);
    fetch("http://localhost:8080/server/addServerToUser",{
        method: "POST",
        headers: {
            "authorization": jwt,
            "content-type": "application/json"
        },
        body: serverID
    }).then((response)=>{
        console.log(response);
    })
}



$("#accept-invite").on("click",function (){
    const serverID = $("button[serverid]").attr("serverid");
    acceptServerInvite(serverID);
    window.location.href = `http://localhost:8080/server/${serverID}`;
    //when you navigate to that page, its going to start running javascript to load the content of that page. It will check the authorization code.
    //the GET request from this navigation needs to return the html in loadServerPage function
    //this should accept the invite and navigate you to servers page. Also addServerToUser api call need to check if server is already added
})