import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LocalStorageService, LS_KEYS } from 'services/localStorage';
import cart from 'images/cart.svg';
import avatar from 'images/avatar.png';

export function Header() {
  const navigate = useNavigate();
  const username = LocalStorageService.get(LS_KEYS.USERNAME);

  useEffect(() => {
    if (!username) navigate('/signin');
  }, [username, navigate]);

  const handleLogOutClick = () => {
    LocalStorageService.remove(LS_KEYS.USERNAME);
    navigate('/signin');
  };

  return (
    <header>
      <section className="title">
        <nav className="navbar navbar-expand-sm mb-4 border-bottom">
          <div className="container">
            <Link className="navbar-brand" to="/">
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
                <li className="nav-item">
                  <Link className="nav-link p-0" to="/cart">
                    <img src={cart} width="38px" height="38px" alt="" />
                  </Link>
                </li>
                <li className="nav-item">
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleLogOutClick}
                  >
                    Sign-Out
                  </button>
                </li>
                <li className="nav-item ">
                  <Link className="user-avatar" to="/signin">
                    <span className="user-avatar-img">
                      <img className="img-fluid" src={avatar} alt="" />
                    </span>
                    <span className="user-avatar-text">
                      {username || 'Username'}
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
