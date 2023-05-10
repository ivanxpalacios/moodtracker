const url = 'http://localhost:4000/entries';

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