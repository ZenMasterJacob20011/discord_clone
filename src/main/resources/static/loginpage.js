async function verifyUserHandler(userNameId, passwordId) {
    const username = document.querySelector(userNameId);
    const password = document.querySelector(passwordId);
    const response = await fetch("http://localhost:8080/verify", {
        method: "POST",
        headers: {
            'Accept': "*/*",
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            'username': username.value,
            'password': password.value
        })
    });
    const responseJSON = await response.json();
    if (response.ok) {
        localStorage.setItem("token", responseJSON.token);
        window.location.href = "http://localhost:8080/login";
    } else {
        //add login or password is invalid text to username part also change the text to red
        //add login or password is invalid to password part
        const invalidUsername = document.querySelector("label[for='username']")
        invalidUsername.innerText = "Username - login or password is invalid";
        invalidUsername.classList.add("text-danger")
        const invalidPassword = document.querySelector("label[for='password']")
        invalidPassword.innerText = "Password - login or password is invalid";
        invalidPassword.classList.add("text-danger")
    }
    username.value = '';
    password.value = '';
}

async function validatejwt(token) {
    let response = await fetch("http://localhost:8080/chat", {
        method: "GET",
        headers: {
            'Authorization': token,
        },
    });
    if (!response.redirected) {
        document.write(await response.text());
        document.close();
    }
}

