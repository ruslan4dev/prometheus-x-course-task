import { Link } from 'react-router-dom';
import imageNotFound from 'images/imageNotFound.png';

export function Book({ book }) {
  return (
    <div className="col">
      <div className="card border-0">
        <div className="card__picture-block">
          <Link to={`/specific-book/${book.id}`}>
            <img
              className="card__picture-block-img"
              src={book.image}
              onError={(e) => {
                e.target.src = imageNotFound;
                e.onerror = null;
              }}
              alt={book.title}
              loading="lazy"
            />
          </Link>
        </div>
        <div className="card-body pt-1">
          <h5 className="card-title">{book.title}</h5>
          <p className="card-text mb-2">{book.author}</p>
          <div className="d-flex justify-content-between">
            <span className="fs-4">${book.price}</span>
            <Link
              to={`/specific-book/${book.id}`}
              className="btn btn-outline-primary"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
