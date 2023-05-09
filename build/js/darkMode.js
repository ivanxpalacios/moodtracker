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

    document.querySelector('.titulo').classList.toggle('text-white');

    const links = document.querySelectorAll('.link-blanco');

    links.forEach(link => {
        link.classList.toggle('text-white');
    });

    document.querySelector('#navbar').classList.toggle('navbar-dark');

    if(document.querySelector('#form').classList.contains('bg-white')) {
        document.querySelector('#form').classList.add('blue');
        document.querySelector('#form').classList.remove('bg-white');
    } else {
        document.querySelector('#form').classList.add('bg-white');
        document.querySelector('#form').classList.remove('blue');
    }

}