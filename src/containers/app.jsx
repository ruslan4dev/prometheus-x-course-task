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
import './app.scss';

export function App() {
  const books = getBooks();

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
      </BooksProvider>
    </ErrorBoundary>
  );
}
