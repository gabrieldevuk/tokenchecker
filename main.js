async function SubmitToken() {

    let alerter = document.getElementById("alert-doe");
    let list = document.getElementsByClassName("list-group")[0];
    let id = document.getElementById("id");
    let tag = document.getElementById("tag");
    let tel = document.getElementById("phone");
    let loc = document.getElementById("locale");
    let email = document.getElementById("email");
    let ver = document.getElementById("verified");
    let profile = document.querySelector("#profile");
    let info = document.querySelector(".info")
    let token = document.getElementsByClassName("label")[0].value;

    alerter.style.display = "none";
    list.style.display = "none";
    profile.style.display = "none";
    info.style.display = "block";

    let response;
    try {
        response = await fetch("https://discordapp.com/api/v8/users/@me", {
            method: "GET",
            headers: {
                Authorization: token
            },
        });
        response = await response.json();
    } catch (e) {
        return alert(`Request failed: ${e}`);
    }

    if (!response.username) {
        return (alerter.style.display = "block");
    }

    if (response.avatar) {
        profile.src = "https://cdn.discordapp.com/avatars/" + response.id + "/" + response.avatar + ".png?size=128";
    } else {
        profile.src = "https://cdn.discordapp.com/embed/avatars/" + (response.discriminator % 5) + ".png?size=128";
    }

    tag.textContent = response.username + "#" + response.discriminator;
    email.textContent = response.email ? response.email : "no email";
    ver.textContent = response.verified ? "verified" : "not verified";
    tel.textContent = response.phone ? response.phone : "no phone";
    id.textContent = response.id;
    loc.textContent = response.locale;

    profile.style.display = "flex";
    list.style.display = "block";
    info.style.display = "none";
}
