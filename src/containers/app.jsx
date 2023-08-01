import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import {
  Layout,
  SignInPage,
  BookListPage,
  SpecificBookPage,
  CartPage,
  NotFoundPage,
} from 'routes';
import { getBooks } from 'services/booksAPI';
import { BooksProvider } from 'hooks/use-books';
import { CartProvider } from 'hooks/use-cart';
import { UserProvider } from 'hooks/use-user';
import { LocalStorageService, LS_KEYS } from 'services/localStorage';
import './app.scss';

export function App() {
  const [user, setUser] = useState(LocalStorageService.get(LS_KEYS.USERNAME));
  const navigate = useNavigate();

  const books = getBooks();
  const [cart, setCart] = useState(
    LocalStorageService.get(LS_KEYS.CART) || { books: [] }
  );

  useEffect(() => {
    if (!user) navigate('/signin');
  }, [user, navigate]);

  useEffect(() => {
    if (user) LocalStorageService.set(LS_KEYS.USERNAME, user);
    else LocalStorageService.remove(LS_KEYS.USERNAME);
  }, [user]);

  useEffect(() => {
    LocalStorageService.set(LS_KEYS.CART, cart);
  }, [cart]);

  return (
    <UserProvider value={{ user, setUser }}>
      <BooksProvider value={books}>
        <CartProvider value={{ cart, setCart }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/book-list" element={<BookListPage />} />
              <Route
                path="/specific-book/:bookID"
                element={<SpecificBookPage />}
              />
              <Route path="/cart" element={<CartPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </CartProvider>
      </BooksProvider>
    </UserProvider>
  );
}
