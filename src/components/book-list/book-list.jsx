import React, { useState } from 'react';
import searchIcon from 'images/searchIcon.svg';
import { Book } from 'components/book';
import { useBooks } from 'hooks/use-books';

export function BookList() {
  const books = useBooks();
  const [searchString, setSearchString] = useState('');
  const [price, setPrice] = useState({ min: 0 });

  const handleSearchInputChange = (e) => {
    setSearchString(e.target.value);
  };

  const handlePriceSelectChange = (e) => {
    setPrice(JSON.parse(e.target.value));
  };

  return (
    <div className="container">
      <div className="row mb-4">
        <div className="col-sm-6 col-lg-4 d-flex justify-content-between mb-2">
          <input
            id="search_book"
            className="form-control d-inline-block pe-5"
            type="text"
            placeholder="Search book by book name"
            value={searchString}
            onChange={handleSearchInputChange}
          />
          <button id="submit_search" className="btn btn-link" type="submit">
            <img src={searchIcon} alt="" />
          </button>
        </div>
        <div className="col-sm-4 col-lg-2 text-right">
          <select
            className="form-select"
            value={JSON.stringify(price)}
            onChange={handlePriceSelectChange}
          >
            <option value={JSON.stringify({ min: 0 })}>Any Price</option>
            <option value={JSON.stringify({ min: 0, max: 15 })}>
              up to $15
            </option>
            <option value={JSON.stringify({ min: 15, max: 30 })}>
              $15 - $30
            </option>
            <option value={JSON.stringify({ min: 30 })}>$30+</option>
          </select>
        </div>
      </div>
      <div
        id="books_list_wrapper"
        className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4"
      >
        {books
          ?.filter(
            (book) =>
              book.title.indexOf(searchString) >= 0 &&
              book.price >= price.min &&
              book.price <= (price.max || 1000000)
          )
          .map((book, i) => (
            <Book key={i} book={book} />
          ))}
      </div>
    </div>
  );
}
