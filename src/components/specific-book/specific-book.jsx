import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useBooks } from 'hooks/use-books';
import { LocalStorageService, LS_KEYS } from 'services/localStorage';
import imageNotFound from 'images/imageNotFound.png';

export function SpecificBook() {
  const { bookID } = useParams();
  const books = useBooks();
  const book = books?.find((book) => book.id === Number(bookID));

  const [count, setCount] = useState(1);
  const [totalPrice, setTotalPrice] = useState(book?.price || 0);

  const handleInputChange = (e) => {
    const currentCount = validateCount(e.target.value);
    setCount(currentCount);
  };

  const handleInputBlur = (e) => {
    const currentCount = e.target.value;
    if (currentCount === '') setCount(1);
  };

  const handleClickAddToCart = () => {
    const cart = LocalStorageService.get(LS_KEYS.CART) || { books: [] };
    cart.books = cart.books.filter((item) => item.id !== book.id);
    cart.books.push(
      ...[
        {
          id: book?.id,
          price: book?.price,
          title: book?.title,
          count: count,
        },
      ]
    );
    LocalStorageService.set(LS_KEYS.CART, cart);
  };

  const validateCount = (value) => {
    if (value === '') return '';
    else if (isNaN(value) || value < 1) return 1;
    else if (value > 42) return 42;
    else return value;
  };

  useEffect(() => {
    setTotalPrice((book?.price * (count || 1)).toFixed(2));
  }, [count, book?.price]);

  return (
    <div className="container">
      <div className="row mb-2">
        <div className="col-sm-8">
          <div className="row">
            <div className="col-sm-6">
              <div className="text-center pb-4">
                <img
                  className="img-fluid rounded"
                  src={book?.image}
                  onError={(e) => {
                    e.target.src = imageNotFound;
                    e.onerror = null;
                  }}
                  alt={book?.title}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <h1 className="fs-2 mb-3">{book?.title}</h1>
              <ul className="list-unstyled">
                <li className="mb-2">Author(s): {book?.author}</li>
                <li className="mb-2">Book level: {book?.level}</li>
                <li className="mb-2">Book tags: {book?.tags.join(', ')}</li>
              </ul>
            </div>
            <div className="col-sm-12">{book?.description}</div>
          </div>
        </div>
        <div className="col-sm-4">
          <div className="border rounded-2 pt-2">
            <ul className="list-group list-unstyled border-none mb-4 fw-bold">
              <li
                className="list-group-item d-flex justify-content-between align-items-center border-0"
                id="price"
                value="17"
              >
                Price, $<span>{book?.price}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                Count
                <input
                  id="booknumber"
                  type="number"
                  className="form-control"
                  value={count}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  min="1"
                  max="42"
                />
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                Total price, $
                <span data-testid="total-price">{totalPrice}</span>
              </li>
            </ul>
            <div className="d-flex justify-content-end m-3">
              <button
                id="orderButton"
                className="btn btn-success"
                onClick={handleClickAddToCart}
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
