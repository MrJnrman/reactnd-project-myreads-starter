import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Book from './Book';
import * as BooksAPI from '../util/BooksAPI';
import * as helper from '../util/helper';

class Search extends React.Component {
    state = {
        books: []
    }

    search = (event) => {
        if(event.target.value.length === 0) {
            this.setState((currentState) => ({
                books: []
            })); 
        } else {
            BooksAPI.search(event.target.value).then((books) => {
                if(!books.error) {
                    books = helper.mergeBooks(this.props.books, books);
                    this.setState((currentState) => ({
                        books: books
                    }));
                } else {
                    this.setState((currentState) => ({
                        books: []
                    }));
                }
            })
        }
    }

    onUpdateSearchShelf = (book, shelf) => {
        this.props.onUpdateSearchShelf(book, shelf);
    }

    render() {
        return (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to='/' className="close-search">
                  Close
                </Link>
                <div className="search-books-input-wrapper">
                  {/*
                    NOTES: The search from BooksAPI is limited to a particular set of search terms.
                    You can find these search terms here:
                    https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                    However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                    you don't find a specific author or title. Every search is limited by search terms.
                  */}
                  <input type="text" placeholder="Search by title or author" onChange={this.search}/>

                </div>
              </div>
              <div className="search-books-results">
                <ol className="books-grid">
                    {this.state.books && this.state.books.map((book) => (
                        <Book 
                            key={book.id} 
                            book={book} 
                            onUpdateShelf={this.onUpdateSearchShelf}
                            shelves={this.props.shelves}
                        />
                    ))}
                </ol>
              </div>
            </div>
        );
    };
}

Search.propTypes = {
    shelves: PropTypes.object.isRequired,
    onUpdateSearchShelf: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
}


export default Search;