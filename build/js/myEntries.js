import { obtenerEntradas, eliminarEntrada } from './API.js';

(function() {
    // Variables
    const listadoEntradas = document.querySelector('#tbody');

    let entradaDeleteId = '';

    const btnDelete = document.querySelector('#btnDelete');

    // Eventos
    document.addEventListener('DOMContentLoaded', mostrarEntradas);

    listadoEntradas.addEventListener('click', asignarId);

    btnDelete.addEventListener('click', confirmarEliminar);



    // Funciones
    async function mostrarEntradas () {
        const entradas = await obtenerEntradas();

        entradas.forEach(entrada => {
            const {date, mood, thoughts, gratitude, id} = entrada;

            const tr = document.createElement('tr');

            tr.innerHTML += `
                <td>${date}</td>
                <td>${mood}</td>
                <td>${thoughts}</td>
                <td>${gratitude}</td>
                <td>
                    <div class="icono-contenedor">
                        <a class="icono" href="edit-entry.html?id=${id}"><img class="editar" src="build/img/edit.svg" /></a>
                        <a class="icono" href="#"><img class="eliminar" data-entrada="${id}" data-bs-toggle="modal" data-bs-target="#exampleModal" src="build/img/trash-solid.svg"/> </a>
                    </div>
                </td>
            `;

            listadoEntradas.appendChild(tr);
        });
    }

    function asignarId(e) {
        if(e.target.classList.contains('eliminar')) {
            entradaDeleteId = parseInt(e.target.dataset.entrada);
        }
    }

    function confirmarEliminar() {
        eliminarEntrada(entradaDeleteId);
    }

})();