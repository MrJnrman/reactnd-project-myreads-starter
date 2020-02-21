import React from 'react';
import PropTypes from 'prop-types';

import Book from './Book';

class Shelf extends React.Component {

    onUpdateShelf = (book, shelf) => {
        this.props.onUpdateShelf(book, shelf);
    }


    render() {
        console.log(this.props.books.map);
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.shelfName}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                            <Book 
                                key={book.id} 
                                onUpdateShelf={this.onUpdateShelf}
                                shelves={this.props.shelves}
                                book={book}
                            />
                        ))}
                    </ol>
                </div>
            </div>
        );
    };

}

Shelf.propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    shelfName: PropTypes.string.isRequired,
    shelves: PropTypes.object.isRequired,
}

export default Shelf;