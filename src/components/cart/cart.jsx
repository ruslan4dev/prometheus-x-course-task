import { useState } from 'react';
import { LocalStorageService, LS_KEYS } from 'services/localStorage';
import { BookInCart } from 'components/book-in-cart';
import cartImage from 'images/cart.svg';

export function Cart() {
  const [cart, setCart] = useState(LocalStorageService.get(LS_KEYS.CART));

  const handleClickPurchaseButton = () => {
    LocalStorageService.remove(LS_KEYS.CART);
    setCart();
  };

  const BlockCartList = () => {
    return (
      <div className="container">
        <div className="text-end pe-1">
          <button
            type="button"
            className="btn btn-success"
            onClick={handleClickPurchaseButton}
          >
            Purchase
          </button>
        </div>
        <div className="border-bottom p-3 mb-3">
          {cart.books.map((book, i) => (
            <BookInCart key={i} book={book} />
          ))}
        </div>
        <div className="text-end pe-3">
          Total price: $
          {cart.books
            .reduce((accu, curr) => accu + curr.price * curr.count, 0)
            .toFixed(2)}
        </div>
      </div>
    );
  };

  const BlockEmptyCart = () => {
    return (
      <div className="cart__purchase-page">
        <img src={cartImage} alt="cart" />
      </div>
    );
  };

  return <>{cart ? <BlockCartList /> : <BlockEmptyCart />}</>;
}
