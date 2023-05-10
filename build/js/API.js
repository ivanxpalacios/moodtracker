const url = 'http://localhost:4000/entries';

// Adds the ney entry to JSON.server db
export const newEntry = async entrada => {
    
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
export const getEntries = async () => {
    try {
        const resultado = await fetch(url);
        const entradas = await resultado.json();
        return entradas;

    } catch (error) {
        console.log(error)
    }
}

// Elimina un cliente
export const deleteEntry = async (id) => {
    
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
}