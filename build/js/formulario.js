import { newEntry } from './API.js';

// Variables
const form = document.querySelector('#form');
const dateInput = document.querySelector('#date');
const selectMood = document.querySelector('#mood');
const inputThoughts = document.querySelector('#thoughts');
const inputGratitude = document.querySelector('#gratitude');
const btnSubmit = document.querySelector('#form button[type="submit"]');

const spinner = document.querySelector('#spinner');

// Fills with the information entered in the form
let entry = {
    date: '',
    mood: '',
    thoughts: '',
    gratitude: ''
}

// Sets the maximum date for the dateInput to the current date
let today = new Date();
let todayToISO = new Date(today.getTime() - (today.getTimezoneOffset() * 60000)).toISOString().substring(0, 10);
dateInput.setAttribute('max', todayToISO);

// Sets the minimum date for the dateInput to three days before the current date
let minDate = new Date();
minDate.setDate(minDate.getDate() - 3);
let minToISO = new Date(minDate.getTime() - (minDate.getTimezoneOffset() * 60000)).toISOString().substring(0, 10);
dateInput.setAttribute('min', minToISO);


// Events
eventListeners();
function eventListeners() {
    dateInput.addEventListener('blur', validateInput);
    selectMood.addEventListener('blur', validateInput);
    inputThoughts.addEventListener('blur', validateInput);
    inputGratitude.addEventListener('blur', validateInput);

    form.addEventListener('submit', submitForm);
}

// Functions

function validateInput(e) {
    if(e.target.value.trim() === '') {
        showAlert('All fields are required');
        entry[e.target.id] = '';
        checkFormFilled();
        return;
    }

    removeAlert();

    entry[e.target.id] = e.target.value.trim();

    // Checks that the entry object is full and sets disabled = false to the submit button
    checkFormFilled();
}

function showAlert(message) {
    const alert = document.createElement('P');
    alert.textContent = message;
    alert.classList.add('alerta');

    const exists = form.querySelector('.alerta');

    if(exists) {
        exists.remove();
    }

    setTimeout(() => {
        alert.remove();
    }, 3000);

    form.insertBefore(alert, btnSubmit);
}

function removeAlert() {
    // Checks if an alert already exists, and if it already exists, removes it before inserting the new one
    const alert = form.querySelector('.alerta');
    if(alert) {
        alert.remove();
    }
}

function checkFormFilled() {
    // If one of the values of the entry object includes an empty space, we add the opacity class and the disabled true to the submit button
    if( Object.values(entry).includes('') ) {
        btnSubmit.disabled = true;
        return;
    } 
        btnSubmit.disabled = false;
}



function submitForm(e) {

    e.preventDefault();

    spinner.classList.add('spinner__contenedor');
    spinner.classList.remove('hidden');

    // Changes the format of the date
    let splitDate = entry.date.split("-");
    let formattedDate = [splitDate[1], splitDate[2], splitDate[0]].join('/');


    entry.date = formattedDate;
    
    // Removes the spinner and resets the form
    setTimeout(() => {
        spinner.classList.remove('spinner__contenedor');
        spinner.classList.add('hidden');

        checkFormFilled();
        form.reset();

        const alertSuccess = document.createElement('p');
        alertSuccess.classList.add('exito');
        alertSuccess.textContent = 'Your entry was uploaded succesfully';

        form.insertBefore(alertSuccess, btnSubmit);

        setTimeout(() => {
            newEntry(entry);
            alertSuccess.remove();
        }, 2500);

    }, 2500);
}