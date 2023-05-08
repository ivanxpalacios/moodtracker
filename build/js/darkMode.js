// Botón dark mode
const botonDarkMode = document.querySelector("#darkMode");


// ---------------- Event Listener --------------
eventListeners();
function eventListeners() {

    botonDarkMode.addEventListener('click', darkMode);
}

// ---------------- FUNCIONES -----------------

// Modo oscuro
function darkMode() {
    document.body.classList.toggle('dark-mode');
}