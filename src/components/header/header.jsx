import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from 'hooks/use-cart';
import { useUser } from 'hooks/use-user';
import imageCart from 'images/cart.svg';
import imageAvatar from 'images/avatar.png';

export function Header() {
  const { user, setUser } = useUser();
  const { cart } = useCart();
  const [booksInCart, setBooksInCart] = useState();

  const handleLogOutClick = () => setUser();

  useEffect(() => {
    setBooksInCart(
      cart?.books?.reduce((accu, curr) => accu + Number(curr.count), 0) || ''
    );
  }, [cart]);

  return (
    <header>
      <section className="title">
        <nav className="navbar navbar-expand-sm mb-4 border-bottom">
          <div className="container">
            <Link className="navbar-brand" to="/book-list">
              X-course task / Ruslan Bezuhlyi
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mb-lg-0 d-flex align-items-center">
                <li className="nav-item pb-2 pb-sm-0">
                  <Link className="nav-link p-0" to="/cart">
                    <img src={imageCart} width="38px" height="38px" alt="" />
                    <span className="badge rounded-pill bg-primary">
                      {booksInCart}
                    </span>
                  </Link>
                </li>
                <li className="nav-item pb-2 pb-sm-0">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleLogOutClick}
                  >
                    Sign-Out
                  </button>
                </li>
                <li className="nav-item pb-2 pb-sm-0">
                  <Link className="user-avatar" to="/signin">
                    <span className="user-avatar-img">
                      <img className="img-fluid" src={imageAvatar} alt="" />
                    </span>
                    <span className="user-avatar-text">
                      {user || 'Username'}
                    </span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </header>
  );
}
