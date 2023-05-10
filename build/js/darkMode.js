// Variables
const botonDarkMode = document.querySelector("#darkMode");
let darkOn = false;
darkOn = localStorage.getItem("dark") == "true" ? true : false;

const tabla = document.querySelector('#table');
const form = document.querySelector('#form');


// Event Listeners
eventListeners();
function eventListeners() {
    botonDarkMode.addEventListener('click', toggle);
}

// Funciones
setTheme();
function setTheme(){
    localStorage.setItem("dark", darkOn ? "true" : "false");
    if(darkOn){
        document.body.setAttribute("theme", "dark");

        document.querySelector('.titulo').classList.add('text-white');

        if(tabla) {
            tabla.classList.add('table-dark');
        }

        const links = document.querySelectorAll('.link-blanco');

        links.forEach(link => {
            link.classList.add('text-white');
        });

        document.querySelector('#navbar').classList.add('navbar-dark');

        if(form) {
            form.classList.add('form-dark-bg');
            form.classList.remove('bg-white');
        }
        
    }
    else{
      document.body.setAttribute("theme", "light");

      document.querySelector('.titulo').classList.remove('text-white');

      if(tabla) {
        tabla.classList.remove('table-dark');
      }

      const links = document.querySelectorAll('.link-blanco');

      links.forEach(link => {
          link.classList.remove('text-white');
      });

      document.querySelector('#navbar').classList.remove('navbar-dark');

      if(form) {
        form.classList.remove('form-dark-bg');
        form.classList.add('bg-white');
    }
    }
  }

function toggle(){
    darkOn = !darkOn;
    setTheme();
}