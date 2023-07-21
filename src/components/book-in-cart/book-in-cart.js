import { Link } from 'react-router-dom';

export function BookInCart({ book }) {
  return (
    <div className="row mt-3">
      <div className="col-5 p-1">
        <Link className="link-underline link-underline-opacity-0" to={`/specific-book/${book.id}`}>
            {book.title}
        </Link>
        </div>
        <div className="col-2 p-1">
            Items: {book.count}
        </div>
        <div className="col-5 p-1 pe-3 text-end">
            ${book.count * book.price}
        </div>
    </div>
  );
}
