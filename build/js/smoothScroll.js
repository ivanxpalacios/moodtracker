// ---------------- Event Listener --------------
eventListeners();
function eventListeners() {
    document.addEventListener('DOMContentLoaded', smoothScroll);
}

// ---------------- FUNCIONES -----------------

// Smooth Scroll
function smoothScroll() {
    const enlaces = document.querySelectorAll('.navbar-nav a');

    enlaces[0].addEventListener('click', function(e) {
        e.preventDefault();

        const seccionScroll = e.target.attributes.href.value;

        console.log(seccionScroll);

        const seccion = document.querySelector(seccionScroll);

        seccion.scrollIntoView({ behavior: "smooth"});
    });

    enlaces[1].addEventListener('click', function(e) {
        e.preventDefault();

        const seccionScroll = e.target.attributes.href.value;

        const seccion = document.querySelector(seccionScroll);

        seccion.scrollIntoView({ behavior: "smooth"});
    });
}