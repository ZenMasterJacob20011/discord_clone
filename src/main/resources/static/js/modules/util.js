export const decodedJWTJSON = parseJwt(localStorage.getItem("token"));
export let jwt = localStorage.getItem("token");
export let user = await loadUsersInfo(localStorage.getItem("token"));

function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}

async function loadUsersInfo(jwt) {
    const response = await fetch('http://localhost:8080/api/v1/getUserInfo', {
        method: "GET",
        headers: {
            "Authorization": jwt
        }
    })
    return await response.json();
}
export function loadNameTag() {
    document.getElementById("name").innerText = decodedJWTJSON.sub;
}

export function addErrorMessageToHTML(cssSelector, errorMessage) {
    const css = document.querySelector(cssSelector);
    css.innerText = errorMessage;
    css.classList.add("text-danger")
}

window.onload = function () {
    loadNameTag();
}