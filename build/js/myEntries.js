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

        // Sorts the entries in ascending order by the date
        entries.sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });

        entries.forEach(entry => {
            const {date, mood, thoughts, gratitude, id} = entry;

            const tr = document.createElement('tr');

            // Makes sure line breaks are being printed in the td
            const thoughtsWithBr = thoughts.replace(/(?:\r\n|\r|\n)/g, '<br />');
            const gratitudeWithBr = gratitude.replace(/(?:\r\n|\r|\n)/g, '<br />');

            tr.innerHTML += `
                <td>${date}</div></td>
                <td>${mood}</div></td>
                <td><div class="hide-content td-width">${thoughtsWithBr}</div></td>
                <td><div class="hide-content td-width">${gratitudeWithBr}</div></td>
                <td>
                    <div class="icono-contenedor">
                        <a class="icono" href="edit-entry.html?id=${id}"><img class="editar" src="build/img/edit.svg" /></a>
                        <a class="icono" href="#"><img class="delete" data-entry="${id}" data-bs-toggle="modal" data-bs-target="#exampleModal" src="build/img/trash-solid.svg"/> </a>
                    </div>
                    <a class="d-block mt-2 text-black text-center see-more" id="seeMore" href="#">See more</a>
                </td>
            `;

            entriesList.appendChild(tr);

        });

        // Adds the functionality to the see more button
        const seeMoreBtn = document.querySelectorAll('#seeMore');

        seeMoreBtn.forEach(btn => {
            btn.onclick = function(e) {
                const tdThoughts = e.target.parentElement.previousElementSibling.previousElementSibling.firstChild;
                const tdGratitute = e.target.parentElement.previousElementSibling.firstChild;

                if(tdThoughts.classList.contains('hide-content')) {
                    tdThoughts.classList.remove('hide-content');
                    tdGratitute.classList.remove('hide-content');

                    tdThoughts.classList.add('show-content');
                    tdGratitute.classList.add('show-content');

                    btn.textContent = 'See less';
                } else {
                    tdThoughts.classList.add('hide-content');
                    tdGratitute.classList.add('hide-content');

                    tdThoughts.classList.remove('show-content');
                    tdGratitute.classList.remove('show-content');

                    btn.textContent = 'See more';
                }

            }
        })
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