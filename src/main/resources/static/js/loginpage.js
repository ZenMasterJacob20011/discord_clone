async function verifyUser() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    let formdata = new FormData();
    formdata.append("username",username.value);
    formdata.append("password",password.value);
    const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
            'Accept': "*/*",
        },
        body: formdata
    });
    const token = await response.text();
    if (response.ok) {
        localStorage.setItem("token", token);
        navigateToUserPage();
    } else {
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

function navigateToUserPage() {
    window.location.href = "http://localhost:8080/server/@me"
}