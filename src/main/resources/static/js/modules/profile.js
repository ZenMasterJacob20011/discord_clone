import {jwt, user} from "./util.js";

function loadFriends() {
    createTopFriendsBar();
    createContentPage();
}
export function loadUserPage() {
    loadSideBar();
    loadFriends();
}



function createTopSideBar() {
    const searchBar = document.createElement("div");
    searchBar.classList.add("search-bar-2");
    searchBar.classList.add("rounded");
    searchBar.classList.add("px-1");
    searchBar.classList.add("mx-2");
    const search = document.createElement("input");
    search.classList.add("search");
    search.placeholder = "Find or start a conversation";
    searchBar.appendChild(search);
    const sideBarTop = document.getElementById("side-bar-top");
    sideBarTop.innerHTML = "";
    sideBarTop.appendChild(searchBar);
}

function createMidSideBar() {
    let midSideBar = document.getElementById("side-bar-mid");
    midSideBar.innerHTML = `
        <div class="container">
            <div>
                <svg class="icon" aria-hidden="true" role="img" width="16" height="16"
                     viewBox="0 0 24 24">
                    <g fill="none" fill-rule="evenodd">
                        <path fill="currentColor" fill-rule="nonzero"
                              d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
                              transform="translate(2 4)"></path>
                        <path
                            d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
                    </g>
                </svg>
                <span>Friends</span>
            </div>
            <div>
                <svg class="icon" aria-hidden="true" role="img" width="24" height="24"
                     viewBox="0 0 24 24">
                    <path fill="currentColor"
                          d="M2.98966977,9.35789159 C2.98966977,9.77582472 2.63442946,10.1240466 2.20807287,10.1240466 L1.78171628,10.1240466 C1.35535969,10.1240466 0.999948837,9.77582472 0.999948837,9.35789159 C0.999948837,8.93995846 1.35535969,8.59173658 1.78171628,8.59173658 L2.20807287,8.59173658 C2.63442946,8.59173658 2.98966977,8.93995846 2.98966977,9.35789159 Z M22.2467643,9.14892503 C24.0942527,12.9800344 22.3888264,17.5772989 18.3384388,19.3882867 C14.4302837,21.1297305 9.74036124,19.457998 7.9638186,15.6268886 C7.60857829,14.8607335 7.3954,14.0248673 7.32428372,13.189001 L5.76091938,13.189001 C5.33456279,13.189001 4.97932248,12.840612 4.97932248,12.4226788 C4.97932248,12.0047457 5.33456279,11.6565238 5.76091938,11.6565238 L8.03493488,11.6565238 C8.46129147,11.6565238 8.81653178,11.3083019 8.81653178,10.8903688 C8.81653178,10.4724357 8.46129147,10.1240466 8.03493488,10.1240466 L4.41090388,10.1240466 C3.98454729,10.1240466 3.62913643,9.77582472 3.62913643,9.35789159 C3.62913643,8.93995846 3.98454729,8.59173658 4.41090388,8.59173658 L9.45606667,8.59173658 C9.88242326,8.59173658 10.2376636,8.24334752 10.2376636,7.82541439 C10.2376636,7.40748126 9.88242326,7.05925937 9.45606667,7.05925937 L7.3954,7.05925937 C6.75586512,7.05925937 6.18727597,6.57161499 6.18727597,5.87517123 C6.18727597,5.24827153 6.68474884,4.69091591 7.3954,4.69091591 L15.4250589,4.69091591 C18.267493,4.8303384 20.9676946,6.43235968 22.2467643,9.14892503 Z M13.2662961,8.38056332 C11.0193969,9.3919615 10.0341721,11.9973566 11.065955,14.1998642 C12.097738,16.4023718 14.755645,17.3681317 17.0025442,16.3567335 C19.249614,15.3453354 20.2346682,12.7399402 19.2028853,10.5374326 C18.1711023,8.33492503 15.5131953,7.36916515 13.2662961,8.38056332 Z M16.8462589,9.84548582 L18.2673907,12.2138293 C18.338507,12.3530846 18.338507,12.4227958 18.2673907,12.5620512 L16.8462589,14.9303946 C16.7751426,15.0696499 16.6330806,15.0696499 16.5619643,15.0696499 L13.7906465,15.0696499 C13.6485845,15.0696499 13.5774682,14.9999387 13.5065225,14.9303946 L12.0852202,12.5620512 C12.0142744,12.4227958 12.0142744,12.3530846 12.0852202,12.2138293 L13.5065225,9.84548582 C13.5774682,9.7062305 13.7197008,9.7062305 13.7906465,9.7062305 L16.5619643,9.7062305 C16.7041969,9.63651925 16.7751426,9.7062305 16.8462589,9.84548582 Z"></path>
                </svg>
                <span>Nitro</span>
            </div>
            <div>
                <svg class="icon" aria-hidden="true" role="img" width="24" height="24"
                     viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12.0002 10.823L20.9652 5.26C20.6772 5.1 20.3522 5 20.0002 5H4.00016C3.64816 5 3.32216 5.1 3.03516 5.26L12.0002 10.823Z"
                        fill="currentColor"></path>
                    <path
                        d="M12.527 12.8489C12.366 12.9489 12.183 12.9999 12 12.9999C11.817 12.9999 11.634 12.9489 11.473 12.8499L2.003 6.97292C2.003 6.98192 2 6.99092 2 6.99892V15.9989C2 17.1009 2.897 17.9989 4 17.9989H20C21.103 17.9989 22 17.1009 22 15.9989V6.99892C22 6.98992 21.997 6.98092 21.997 6.97192L12.527 12.8489Z"
                        fill="currentColor"></path>
                </svg>
                <span>Message Requests</span>
            </div>
        </div>

        <div>
            <span>DIRECT MESSAGES</span>
            <svg x="0" y="0" className="privateChannelRecipientsInviteButtonIcon-1ObKXK icon-2xnN2Y" aria-hidden="true"
                 role="img" width="24" height="24" viewBox="0 0 18 18">
                <polygon fill-rule="nonzero" fill="currentColor"
                         points="15 10 10 10 10 15 8 15 8 10 3 10 3 8 8 8 8 3 10 3 10 8 15 8"></polygon>
            </svg>
        </div>
    `
}

function loadSideBar() {
    createTopSideBar();
    createMidSideBar();
}

function createTopFriendsBar() {
    let topFriendsBar = document.querySelector("div.card-header");
    topFriendsBar.innerHTML = `
            <div class="container d-flex justify-content-evenly align-items-center">
                <svg x="0" y="0" class="icon" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path fill="currentColor" fill-rule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path><path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path></g></svg>
                <span>Friends</span> 
                <div class="divider-vertical"></div>
                <button class="btn btn-secondary btn-sm">Online</button>
                <button class="btn btn-secondary btn-sm" id="view-all-friends">All</button>
                <button class="btn btn-secondary btn-sm" id="pending-friend">Pending</button>
                <button class="btn btn-secondary btn-sm">Blocked</button>
                <button class="btn btn-success btn-sm" id="add-friend">Add Friend</button>
            </div>
            <div class="container d-flex justify-content-evenly w-25">
                <svg x="0" y="0" class="icon" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M20.998 0V3H23.998V5H20.998V8H18.998V5H15.998V3H18.998V0H20.998ZM2.99805 20V24L8.33205 20H14.998C16.102 20 16.998 19.103 16.998 18V9C16.998 7.896 16.102 7 14.998 7H1.99805C0.894047 7 -0.00195312 7.896 -0.00195312 9V18C-0.00195312 19.103 0.894047 20 1.99805 20H2.99805Z"></path></svg>
                <span class="divider-vertical"></span>
                <svg x="0" y="0" class="icon" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z" fill="currentColor"></path></svg>
                <svg x="0" y="0" class="icon" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z"></path></svg>
            </div>
    `;
    let pendingButton = document.getElementById("pending-friend");
    let addFriendButton = document.getElementById("add-friend");
    let allButton = document.getElementById("view-all-friends");
    addFriendButton.onclick = function (){
        function loadAddFriendElement() {
            const addFriendElement = `
                <div class="container">
                    <div>ADD FRIEND</div>
                    <div class="py-2" style="color: rgb(181, 186, 193)">You can add friends with their Discord username</div>
                    <div class="search-bar-2 rounded px-1 justify-content-between">
                        <input class="search w-75" placeholder="You can add friends with their Discord username.">
                        <button class="btn btn-primary btn-sm m-2" id="sendFriendRequest">Send Friend Request</button>
                    </div>
                </div>
            `;
            document.getElementById("main-content-page").innerHTML = addFriendElement;
            document.getElementById("sendFriendRequest").onclick = function () {
                function sendFriendRequest() {
                    let username = document.querySelector("input[placeholder='You can add friends with their Discord username.']").value;
                    fetch("http://localhost:8080/api/v1/sendFriendRequest",{
                        method: "PUT",
                        headers: {
                            "Authorization": jwt,
                            "Content-Type": "application/json"
                        },
                        body: username
                    }).then(async (response) => {
                        if (response.ok) {
                            const successMessage = `<div class="text-success">${await response.text()}</div>`;
                            document.querySelector("div.justify-content-between.search-bar-2").insertAdjacentHTML("afterend", successMessage);
                        } else {
                            const errorMessage = `<div class="text-danger">${await response.text()}</div>`;
                            document.querySelector("div.justify-content-between.search-bar-2").insertAdjacentHTML("afterend", errorMessage);
                        }
                    })
                }

                sendFriendRequest();
            }
        }

        loadAddFriendElement();
    }
    pendingButton.onclick = function (){
        async function loadFriendRequests() {
            let userJSON = await user;
            let frindRequests = userJSON.pendingFriends;
            let pendingFriendRequestBody = document.getElementById("main-content-page");
            pendingFriendRequestBody.innerHTML = `
            <div>PENDING - ${frindRequests.length}</div>
        `

            function createFriendRequestElement(request) {
                return `
                <div class="container d-flex justify-content-between align-items-center">
                    <div class="container d-flex align-items-center">
                        <div class="profile-image"></div>
                        <div class="container">
                            <div>${request}</div>
                            <div>Incoming friend request</div>
                        </div>
                    </div>
                    <div class="container d-flex justify-content-end">
                        <button class="accept-friend-request">
                            <img width="32" alt="Eo circle green checkmark" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/32px-Eo_circle_green_checkmark.svg.png">
                        </button>
                        <button class="decline-friend-request">
                                <img width="32" alt="Cross red circle" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Cross_red_circle.svg/32px-Cross_red_circle.svg.png">
                        </button>
                    </div>
                </div>
            
                `;
            }

            for (const request of frindRequests) {
                pendingFriendRequestBody.innerHTML += createFriendRequestElement(request.username);
                let acceptFriendRequestButton = document.getElementsByClassName("accept-friend-request").item(document.getElementsByClassName("accept-friend-request").length-1);
                acceptFriendRequestButton.onclick = async function () {
                    let response = await fetch("http://localhost:8080/api/v1/acceptFriendRequest",{
                        method: "POST",
                        headers: {
                            "Authorization": jwt
                        },
                        body: request.username
                    });
                    let friendRequestContainer = acceptFriendRequestButton.parentNode.parentNode;
                    if(response.ok){
                        friendRequestContainer.innerHTML = `
                            <div class="text-success">${await response.text()}</div>
                        `;
                        return;
                    }
                    friendRequestContainer.innerHTML = `
                            <div class="text-danger">${await response.text()}</div>
                        `;
                }
                let declineFriendRequestButton = document.getElementsByClassName("decline-friend-request").item(document.getElementsByClassName("decline-friend-request").length-1)
                declineFriendRequestButton.onclick = async function (){
                    let response = await fetch("http://localhost:8080/api/v1/declineFriendRequest",{
                        method: "POST",
                        headers: {
                            "Authorization": jwt
                        },
                        body: request.username
                    });
                    let friendRequestContainer = declineFriendRequestButton.parentNode.parentNode;
                    if(response.ok){
                        friendRequestContainer.innerHTML = `
                            <div class="text-success">${await response.text()}</div>
                        `;
                        return;
                    }
                    friendRequestContainer.innerHTML = `
                            <div class="text-danger">${await response.text()}</div>
                        `;
                }

            }

        }

        loadFriendRequests();
    }
    allButton.onclick = function (){
        function loadAllFriends() {
            let mainContentPage = document.getElementById("main-content-page");
            mainContentPage.innerHTML = `
                <div class="search-bar">
                    <input class="search" type="text" placeholder="Search">
                    <svg class="icon" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"></path>
                    </svg>
                </div>
                <div>ALL FRIENDS - ${user.acceptedFriends.length}</div>
            `
            function createFriendElement(name) {
                return `
                <div class="container d-flex justify-content-between align-items-center">
                    <div class="container d-flex align-items-center">
                        <div class="profile-image"></div>
                        <div class="container">
                            <div>${name}</div>
                            <div>offline/online</div>
                        </div>
                    </div>
                    <div class="container d-flex justify-content-end">
                        <button class="accept-friend-request">
                            <svg class="icon" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill="currentColor" d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"></path></svg>
                        </button>
                        <button class="decline-friend-request">
                                <svg class="icon" aria-hidden="true" role="img" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M24 0v24H0V0z"></path><path fill="currentColor" d="M12 16c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z"></path></g></svg>
                        </button>
                    </div>
                </div>
                `;
            }

            for (const acceptedFriend of user.acceptedFriends) {
                mainContentPage.innerHTML += createFriendElement(acceptedFriend.username);
            }
        }

        loadAllFriends()
    }

}

function createContentPage() {
    let midFriendsBar = document.querySelector(".card-body").innerHTML = `
    
    
    `;
    let cardFooter = document.querySelector(".card-footer");
    if(cardFooter!=null){
        cardFooter.remove();
    }
}