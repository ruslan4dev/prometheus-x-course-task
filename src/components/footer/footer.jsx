import { Link } from "react-router-dom"

export function Footer() {
    return (
        <div className="fixed-bottom text-center mt-5 mb-4">
            <Link className="text-secondary link-underline link-underline-opacity-0" to="https://prometheus.org.ua/" target="_blank">
                Виконано в Prometheus © 2022
            </Link>
        </div>
    );
}