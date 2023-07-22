import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="text-center mt-4 mb-4">
      <Link
        className="text-secondary link-underline link-underline-opacity-0"
        to="https://prometheus.org.ua/"
        target="_blank"
      >
        Виконано в Prometheus © 2023
      </Link>
    </footer>
  );
}
