const url = 'http://localhost:4000/entries';

// Adds the new entry to JSON.server db
export const newEntry = async entrada => {
    
    try {
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify(entrada),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = 'my-entries.html';
    } catch (error) {
        console.log(error);
    }
}

// Gets entries from the db
export const getEntries = async () => {
    try {
        const result = await fetch(url);
        const entries = await result.json();

        entries.forEach(entry => {
            const {date} = entry;

            // Changes the format of the date
            let splitDate = date.split("-");
            let formattedDate = [splitDate[1], splitDate[2], splitDate[0]].join('/');

            entry.date = formattedDate;
            
        });
        return entries;

    } catch (error) {
        console.log(error)
    }
}

// Deletes an entry from the db
export const deleteEntry = async (id) => {
    
    try {
        await fetch(`${url}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.log(error);
    }
}

// Gets the entry the user wants to edit from the db
export const getEntryEdit = async id => {
    try {
        const result = await fetch(`${url}/${id}`);
        const entry = await result.json();

        // Changes the format of the date
        let splitDate = entry.date.split("/");
        let formattedDate = [splitDate[2], splitDate[0], splitDate[1]].join('-').substring(1, 11);

        entry.date = formattedDate;

        return entry;
        
    } catch (error) {
        console.log(error);
    }
}

// Edits an entry
export const editEntry = async entry => {
    try {
        await fetch(`${url}/${entry.id}`, {
            method: 'PUT',
            body: JSON.stringify(entry),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        window.location.href = 'my-entries.html';
    } catch (error) {
        console.log(error);
    }
}