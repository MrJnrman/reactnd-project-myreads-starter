export const getShelves = (books) => {
    let shelves = {};
    
    books.forEach((book) => {
        if(!shelves[book.shelf]) {
            shelves[book.shelf] = getFullShelfName(book.shelf);
        }
    })

    return ensureBasicShelvesArePresent(shelves);
}

const getFullShelfName = (shelf) => {
    let shelfName = '';
    // change first letter to uppercase
    shelf = shelf.charAt(0).toUpperCase() + shelf.slice(1);
    let words = shelf.split(/(?=[A-Z])/);

    words.forEach((word) => {
        shelfName = shelfName + word + ' ';
    });

    return shelfName.trim();
}


/**
 * This fucntion takes the books already in our shelf and merges it with the books being search.
 * This is because I noticed that the search books don't a 'shelf' key.
 * @param {array} shelfBooks 
 * @param {array} searchBooks 
 */
export const mergeBooks = (shelfBooks, searchBooks) => {
    let mappedBooks = {};
    shelfBooks.forEach((book) => {
        mappedBooks[book.id] = book;
    })

    return searchBooks.map((book) => {
        if(mappedBooks[book.id]) {
            return mappedBooks[book.id]
        } else {
            return book;
        }
    });
}

/**
 * This function exists because based on how the app pulls the shelves, if I don't have a book 
 * as a part of a specific shelf, the app will not know anything about that specific shelf and 
 * it will not be rendered.
 * @param {object} shelves 
 */
const ensureBasicShelvesArePresent = (shelves) => {
    if(!shelves['currentlyReading']) {
        shelves['currentlyReading'] = 'Currently Reading'
    }

    if(!shelves['wantToRead']) {
        shelves['wantToRead'] = 'Want To Read'
    }

    if(!shelves['read']) {
        shelves['read'] = 'Read'
    }
    
    return shelves;
} 