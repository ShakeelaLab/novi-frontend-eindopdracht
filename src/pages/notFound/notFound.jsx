import './NotFound.css';
import {Link} from "react-router-dom";

function NotFound() {
    return (
        <>
        <main className="page-container-not-found">
            <h2>Oops... This page doesn&apos;t exist</h2>
            <p><Link to="/">Take me back to the home page.</Link></p>
        </main>
        </>
    );
}

export default NotFound;