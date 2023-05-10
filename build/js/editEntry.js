import { getEntries, deleteEntry } from './API.js';

(function() {
    // Variables
    const entriesList = document.querySelector('#tbody');

    let entryDeleteId = '';

    const btnDelete = document.querySelector('#btnDelete');

    // Events
    document.addEventListener('DOMContentLoaded', showEntries);

    entriesList.addEventListener('click', assignId);

    btnDelete.addEventListener('click', confirmDelete);



    // Functions
    // It runs as soon as the app loads and shows the entries saved in the json server
    async function showEntries () {
        const entries = await getEntries();

        entries.forEach(entry => {
            const {date, mood, thoughts, gratitude, id} = entry;

            const tr = document.createElement('tr');

            tr.innerHTML += `
                <td>${date}</td>
                <td>${mood}</td>
                <td>${thoughts}</td>
                <td>${gratitude}</td>
                <td>
                    <div class="icono-contenedor">
                        <a class="icono" href="edit-entry.html?id=${id}"><img class="editar" src="build/img/edit.svg" /></a>
                        <a class="icono" href="#"><img class="delete" data-entry="${id}" data-bs-toggle="modal" data-bs-target="#exampleModal" src="build/img/trash-solid.svg"/> </a>
                    </div>
                </td>
            `;

            entriesList.appendChild(tr);
        });
    }

    // Assigns the id to which the delete was clicked
    function assignId(e) {
        if(e.target.classList.contains('delete')) {
            entryDeleteId = parseInt(e.target.dataset.entry);
        }
    }

    // It is executed when the delete button of the Modal is pressed
    function confirmDelete() {
        deleteEntry(entryDeleteId);
    }
})();