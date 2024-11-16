let currentUser = null;
let profiles = JSON.parse(localStorage.getItem("perfiles.json")) || [];
let accounts = JSON.parse(localStorage.getItem("cuentas.json")) || [];

function showProfiles() {
    const profilesContainer = document.getElementById("profiles-container");
    profilesContainer.innerHTML = "";
    profiles.forEach((profile) => {
        const profileCard = document.createElement("div");
        profileCard.className = "profile-card";

        const profileImage = document.createElement("img");
        profileImage.src = profile.photo || "default.jpg";
        profileImage.className = "profile-photo";

        const profileName = document.createElement("p");
        profileName.textContent = `Usuario: ${profile.username}`;

        const discordButton = document.createElement("button");
        discordButton.textContent = "Discord";
        discordButton.onclick = () => {
            openPopup("discord-popup");
            document.getElementById("discord-name-display").textContent =
                profile.discordName;
        };

        profileCard.appendChild(profileImage);
        profileCard.appendChild(profileName);
        profileCard.appendChild(discordButton);

        profilesContainer.appendChild(profileCard);
    });
}

function register() {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (username && password) {
        accounts.push({ username, password });
        localStorage.setItem("cuentas.json", JSON.stringify(accounts));
        alert("Cuenta registrada con éxito");
        currentUser = { username };
        closePopup("register-popup");
        toggleLoginState();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

function toggleLoginState() {
    document.getElementById("btn-login").style.display = "none";
    document.getElementById("btn-register").style.display = "none";

    const createProfileBtn = document.createElement("button");
    createProfileBtn.textContent = "Crear Perfil";
    createProfileBtn.className = "header-btn";
    createProfileBtn.onclick = () => openPopup("create-profile-popup");

    document.querySelector(".header-container").appendChild(createProfileBtn);

    document.getElementById("login-message").textContent =
        "Para crear un perfil, pulsa en el botón 'Crear Perfil'.";
}

function createProfile() {
    const photo = document.getElementById("profile-photo").files[0];
    const username = document.getElementById("profile-name").value;
    const discordName = document.getElementById("discord-name").value;

    if (username && discordName) {
        const profile = {
            photo: photo ? URL.createObjectURL(photo) : "default.jpg",
            username,
            discordName,
        };
        profiles.push(profile);
        localStorage.setItem("perfiles.json", JSON.stringify(profiles));
        alert("Perfil creado con éxito");
        closePopup("create-profile-popup");
        showProfiles();
    } else {
        alert("Por favor, completa todos los campos.");
    }
}

function openPopup(popupId) {
    document.getElementById(popupId).style.display = "flex";
}

function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}

document.getElementById("register-btn").onclick = register;
document.getElementById("create-profile-btn").onclick = createProfile;
document.getElementById("copy-discord-btn").onclick = () => {
    const discordName = document.getElementById("discord-name-display").textContent;
    navigator.clipboard.writeText(discordName);
    alert("¡Nombre de Discord copiado!");
};

// Inicializar
showProfiles();
