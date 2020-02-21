import React from 'react';
import PropTypes from 'prop-types';

class Book extends React.Component {

    handleChange = (event) => {
        event.preventDefault();
        this.props.onUpdateShelf(this.props.book, event.target.value);
    }
    render() {
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url('${this.props.book.imageLinks && this.props.book.imageLinks.thumbnail}')` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={this.handleChange} value={this.props.book.shelf ? this.props.book.shelf : 'none' }>
                            <option value="move" disabled>Move to...</option>
                            {Object.keys(this.props.shelves).map((shelf) => (
                                <option 
                                    key={shelf} 
                                    value={shelf}
                                >
                                    {this.props.shelves[shelf]}
                                </option>
                            ))}
                            <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{this.props.book.title}</div>
                    <div className="book-authors">{this.props.book.authors && this.props.book.authors.toString()}</div>
                </div>
            </li>
        );
    };
}

Book.propTypes = {
    book: PropTypes.object.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    shelves: PropTypes.object.isRequired
}

export default Book;