import { obtenerEntradas } from './API.js';

(function() {
    // Variables
    const listadoEntradas = document.querySelector('#tbody');

    // Eventos
    document.addEventListener('DOMContentLoaded', mostrarEntradas);

    listadoEntradas.addEventListener('click', confirmarEliminar);



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
                        <a class="icono" href="#" data-entrada="${id}"><img class="eliminar" src="build/img/trash-solid.svg"/> </a>
                    </div>
                </td>
            `;

            listadoEntradas.appendChild(tr);
        });
    }

    function confirmarEliminar(e) {
        if(e.target.classList.contains('eliminar')) {
            console.log('Diste click en el botón de eliminar')
        }
    }

})();