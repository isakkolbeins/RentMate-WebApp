
async function populateNAV(currPath) {

    const urlParams = new URLSearchParams(window.location.search);
    const user_id = await urlParams.get('user_id');
    let profile = "../Profile/?user_id="+user_id;
    let home = "../Home/?user_id="+user_id;
    let chat = "../Chat/?user_id="+user_id;
    let {profileCurrent, homeCurrent, chatCurrent} = "";
    console.log("user_id");

    console.log(user_id);
    switch (currPath) {
        case "Profile":
            profile = "./?user_id="+user_id;
            profileCurrent = "nav_current";
            break;
        case "Home":
            home = "./?user_id="+user_id;
            homeCurrent = "nav_current";
            break;
        case "Chat":
            chat = "./?user_id="+user_id;
            chatCurrent = "nav_current";
            break;
    }

    const nav_bar = document.querySelector(".nav_bar");

    nav_bar.innerHTML = `

    <a href='${profile}' class="nav_button profile_button ${profileCurrent}">
        <div >
            <span class="material-symbols-outlined">
            person
            </span>
        </div>
        </a>

        <a href='${home}' class="nav_button home_button ${homeCurrent}">
            <div >
            <span class="material-symbols-outlined">
                home
                </span>
            </div>
        </a>

        <a href='${chat}' class="nav_button chat_button ${chatCurrent}">
            <div >
            <span class="material-symbols-outlined">
                chat
                </span>
            </div>
        </a>
        </div>
    `;

}