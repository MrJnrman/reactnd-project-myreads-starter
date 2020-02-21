import React from 'react'
import { Link, Route } from 'react-router-dom';
import * as BooksAPI from './util/BooksAPI'
import './App.css'

import Shelf from './components/Shelf'
import Search from './components/Search'
import * as Helpers from './util/helper'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: {}
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState((currentState) => ({ 
        books: books,
        shelves: Helpers.getShelves(books) 
      }));
    });
  }

  updateBookShelf = (book, shelf) => {
    let updatedBooks = this.state.books.map((b) => {
      if(b.id === book.id) {
        b.shelf = shelf;
        BooksAPI.update(b, shelf);
      }

      return b;
    })

    this.setState((currentState) => ({
      books: updatedBooks
    }));
  }

  updateBookSearchShelf = (book, shelf) => {
    book.shelf = shelf;
    BooksAPI.update(book, shelf);

    this.setState((currentState) => ({
      books: [...currentState.books, book]
    }));
  }

  render() {
    return (
      <div className="app">
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {Object.keys(this.state.shelves).map((shelf) => (
                    <Shelf 
                      key={shelf} 
                      shelfKey={shelf} 
                      shelfName={this.state.shelves[shelf]} 
                      books={this.state.books.filter((book) => book.shelf === shelf)} 
                      shelves={this.state.shelves}
                      onUpdateShelf={this.updateBookShelf}/>
                  ))}
                </div> 
              </div>
              <div className="open-search">
                <Link to='/search' className='button-search'>
                  Add a book
                </Link>
              </div>
            </div>
          )}/>

          <Route path='/search' render={({ history }) => (
            <Search 
              onUpdateSearchShelf={this.updateBookSearchShelf}
              shelves={this.state.shelves}
              books={this.state.books}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp
