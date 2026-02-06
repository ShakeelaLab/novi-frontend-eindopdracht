import './Favorites.css';
import Button from "../../components/button/Button.jsx";
import ProductCard
    from "../../components/productCard/ProductCard.jsx";
import {AuthContext} from "../../context/AuthContext";
import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";

function Favorites() {
    const { token } = useContext(AuthContext);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const {user} = useContext(AuthContext);

    useEffect(() => {
        if(!token) return;

        async function fetchFavorites() {
            setLoading(true);
            setError(false);
            setErrorMessage("");
            try {
                const response = await axios.get("",  { //"https://novi-backend-api-wgsgz.ondigitalocean.app/api/favorites"
                    headers: { Authorization: `Bearer ${token}`},
                });

                const ids = response.data.map(fav => fav.itemId);
                setFavoriteIds(ids);
            } catch (error) {
                console.error("Error fetching favorites:", error)
                setError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }

        void fetchFavorites();
    }, [token]);

    useEffect(() => {
        if (favoriteIds.length === 0) return;

        async function fetchBooks(){
            try {
                setLoading(true);
                setError(false);
                setErrorMessage("");
                const requests = favoriteIds.map((id) =>
                    axios.get("")    //"https://novi-backend-api-wgsgz.ondigitalocean.app/api/favorites"
                );

                const responses = await Promise.all(requests);
                const booksData = responses.map((res) => res.data )
            } catch (error) {
                console.error("Error fetching book details:", error);
            } finally {
                setLoading(false);
            }
        }

        void fetchBooks();

    }, [favoriteIds]);

    if (!token) return <p className="message-login">You have to be logged in to see the favorites</p>;

    return (
        <>
            {loading &&
                <span className="loader"></span>}

            {error && (
                <p className="error-message">
                    Something went wrong, try
                    again: <strong>{errorMessage}</strong>
                </p>
            )}

            <section className="favorites-container">
                <h1>Your favorites</h1>

                {books.length === 0 && <p>Loading favorites...</p>}

                {books.map((book) => {
                    const coverId = book.covers?.[0];

                    return(
                        <ProductCard
                            key={book.key}
                            img={coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : null}
                            alt={book.title}
                            title={book.title}
                            author={book.authors?.[0]?.name || "Unknown author"}
                            viewDetails=""
                        />
                    )

                    })}
            </section>
        </>
    );
}

export default Favorites;