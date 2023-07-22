import { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
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
import { LocalStorageService, LS_KEYS } from 'services/localStorage';
import './app.scss';

export function App() {
  const books = getBooks();
  const [cart, setCart] = useState(
    LocalStorageService.get(LS_KEYS.CART) || { books: [] }
  );

  return (
    <ErrorBoundary
      fallback={
        <div className="block__text-error-message">
          Something went wrong. Try to get help from support service
          support@mysite.com
        </div>
      }
    >
      <BooksProvider value={books}>
        <CartProvider value={{ cart, setCart }}>
          <HashRouter>
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
          </HashRouter>
        </CartProvider>
      </BooksProvider>
    </ErrorBoundary>
  );
}
