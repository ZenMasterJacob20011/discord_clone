async function verifyUserHandler(userNameId, passwordId){
    const username = document.querySelector(userNameId);
    const password = document.querySelector(passwordId);
    const response = await fetch("http://localhost:8080/verify",{
        method: "POST",
        headers: {
            'Accept': "*/*",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({'username':username.value,
                                    'password':password.value})
    });
    const responseJSON = await response.json();
    if(response.ok){
        localStorage.setItem("token",responseJSON.token);
        window.location.href = "http://localhost:8080";
    }else{
        alert("Invalid username/password");
    }
    username.value = '';
    password.value = '';
}