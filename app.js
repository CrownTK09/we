let currentUser = null;
let profiles = JSON.parse(localStorage.getItem("perfiles.json")) || [];
let accounts = JSON.parse(localStorage.getItem("cuentas.json")) || [];

// Mostrar mensaje dinámico
function updateMessage() {
    const message = document.getElementById("login-message");
    if (currentUser) {
        message.innerHTML = `<p>Para crear un perfil, pulsa el botón 'Crear Perfil'.</p>`;
    } else {
        message.innerHTML = `<p>Para crear un perfil, inicia sesión o regístrate.</p>`;
    }
}

// Mostrar perfiles
function showProfiles() {
    const profilesContainer = document.getElementById("profiles-container");
    profilesContainer.innerHTML = "";
    profiles.forEach((profile) => {
        const profileCard = document.createElement("div");
        profileCard.className = "profile-card";

        const profileImage = document.createElement("img");
        profileImage.src = profile.photo || "default.jpg";
        profileImage.className = "profile-photo";

        const profileName = document.createElement("h4");
        profileName.textContent = profile.name;

        const discordName = document.createElement("p");
        discordName.textContent = profile.discord;

        profileCard.appendChild(profileImage);
        profileCard.appendChild(profileName);
        profileCard.appendChild(discordName);

        profilesContainer.appendChild(profileCard);
    });
}

// Registrar usuario
document.getElementById("register-btn").addEventListener("click", () => {
    const username = document.getElementById("register-username").value;
    const password = document.getElementById("register-password").value;

    if (username && password) {
        accounts.push({ username, password });
        localStorage.setItem("cuentas.json", JSON.stringify(accounts));
        currentUser = username;
        closePopup("register-popup");
        updateMessage();
        showProfiles();
    }
});

// Cerrar popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}

// Abrir popup
function openPopup(popupId) {
    document.getElementById(popupId).style.display = "flex";
}

// Inicialización
updateMessage();
showProfiles();
