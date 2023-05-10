import { obtenerEntradas } from './API.js';

(function() {
    
    const listadoEntradas = document.querySelector('#tbody');

    document.addEventListener('DOMContentLoaded', mostrarEntradas);

    async function mostrarEntradas () {
        const entradas = await obtenerEntradas();

        entradas.forEach(entrada => {
            const {date, mood, thoughts, gratitude} = entrada;

            const tr = document.createElement('tr');

            tr.innerHTML += `
                <td>${date}</td>
                <td>${mood}</td>
                <td>${thoughts}</td>
                <td>${gratitude}</td>
                <td>
                    <div class="icono-contenedor">
                        <img src="build/img/edit.svg" class="icono" />
                        <img src="build/img/trash-solid.svg" class="icono" />
                    </div>
                </td>
            `;

            listadoEntradas.appendChild(tr);


        });
    }

})();