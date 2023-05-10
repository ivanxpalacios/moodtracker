import { nuevaEntrada } from './API.js';

// Variables
const containerForm = document.querySelector('#container-form');
const formulario = document.querySelector('#form');
const inputFecha = document.querySelector('#date');
const selectHumor = document.querySelector('#mood');
const inputPensamientos = document.querySelector('#thoughts');
const inputAgradecimientos = document.querySelector('#gratitude');
const btnSubmit = document.querySelector('#form button[type="submit"]');

const spinner = document.querySelector('#spinner');

// Objeto que se llena con la información del formulario
let entrada = {
    date: '',
    mood: '',
    thoughts: '',
    gratitude: ''
}

// Establece como fecha máxima para el input de fecha la fecha actual
let today = new Date();
let todayToISO = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().substring(0, 10);
inputFecha.setAttribute('max', todayToISO);

// Establece como fecha mínima tres días antes de hoy
let minDate = new Date();
minDate.setDate(minDate.getDate() - 3);
let minToISO = new Date(minDate.getTime() - (minDate.getTimezoneOffset() * 60000)).toISOString().substring(0, 10);
inputFecha.setAttribute('min', minToISO);


// Eventos
eventListeners();
function eventListeners() {
    inputFecha.addEventListener('blur', validarCampo);
    selectHumor.addEventListener('blur', validarCampo);
    inputPensamientos.addEventListener('blur', validarCampo);
    inputAgradecimientos.addEventListener('blur', validarCampo);

    formulario.addEventListener('submit', enviarForm);
}

// Funciones

function validarCampo(e) {
    if(e.target.value.trim() === '') {
        mostrarAlerta('Todos los campos son obligatorios');
        entrada[e.target.id] = '';
        comprobarForm();
        return;
    }

    limpiarAlerta();

    entrada[e.target.id] = e.target.value.trim();

    // Comprobar que el objeto datosForm esté lleno y cambia el disabled del boton
    comprobarForm();
}

function mostrarAlerta(mensaje) {
    const alerta = document.createElement('P');
    alerta.textContent = mensaje;
    alerta.classList.add('alerta');

    const existe = formulario.querySelector('.alerta');

    if(existe) {
        existe.remove();
    }

    setTimeout(() => {
        alerta.remove();
    }, 3000);

    formulario.insertBefore(alerta, btnSubmit);
}

function limpiarAlerta() {
    // Comprueba si ya existe una alerta en ese input, y si ya existe la elimina antes de insertar la nueva
    const alerta = formulario.querySelector('.alerta');
    if(alerta) {
        alerta.remove();
    }
}

function comprobarForm() {
    // Si uno de los valores del objeto datosForm incluye un espacio vacío, añadimos la clase de opacity y el disabled true
    if( Object.values(entrada).includes('') ) {
        btnSubmit.disabled = true;
        return;
    } 
        btnSubmit.disabled = false;
}



function enviarForm(e) {

    e.preventDefault();

    spinner.classList.add('spinner__contenedor');
    spinner.classList.remove('hidden');

    nuevaEntrada(entrada);

    // Quitamos el spinner 3.5s después y reiniciamos el formulario
    // setTimeout(() => {
    //     spinner.classList.remove('spinner__contenedor');
    //     spinner.classList.add('hidden');

    //     comprobarForm();
    //     formulario.reset();

    //     const alertaExito = document.createElement('p');
    //     alertaExito.classList.add('exito');
    //     alertaExito.textContent = 'Tu entrada se ha enviado correctamente';

    //     formulario.insertBefore(alertaExito, btnSubmit);

    //     setTimeout(() => {
    //         alertaExito.remove();

    //     }, 3500);

    // }, 3500);
}