const url = 'http://localhost:4000/entries';

// Cuando se crea una entrada nueva
export const nuevaEntrada = async entrada => {
    
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(entrada),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = 'my-entries.html'
    } catch (error) {
        console.log(error);
    }
}

// Obtiene las entradas
export const obtenerEntradas = async () => {
    try {
        const resultado = await fetch(url);
        const entradas = await resultado.json();
        return entradas;

    } catch (error) {
        console.log(error)
    }
}

// Elimina un cliente
export const eliminarEntrada = async (id) => {
    
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
}