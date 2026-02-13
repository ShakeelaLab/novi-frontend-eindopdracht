import './Favorites.css';
import Button from "../../components/button/Button.jsx";
import ProductCard
    from "../../components/productCard/ProductCard.jsx";
import {AuthContext} from "../../context/AuthContext";
import React, {
    useContext,
    useEffect,
    useState
} from 'react';
import axios from "axios";
import {jwtDecode} from "jwt-decode";

function Favorites() {
    const {token, user} = useContext(AuthContext);
    const [favoriteIds, setFavoriteIds] = useState([]);
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (!token) return;

        async function fetchFavorites() {
            setLoading(true);
            setError(false);
            setErrorMessage("");
            try {
                const response = await axios.get("https://novi-backend-api-wgsgz.ondigitalocean.app/api/favorites", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "novi-education-project-id": "fc3b1d4e-24cf-4767-8ccb-fce51b54f7f8",
                    }
                });
                const {userId} = jwtDecode(token);
                const favorites = response.data
                    .filter(fav => fav.userId === userId)
                    .map(fav => ({
                        id: fav.id,
                        itemId: fav.itemId
                    }))
                setFavoriteIds(favorites);
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

        const controller = new AbortController();

        async function fetchBooks() {
            try {
                setLoading(true);
                setError(false);
                setErrorMessage("");
                const requests = favoriteIds.map(fav => axios.get("https://openlibrary.org/search.json", {
                    params: {
                        q: `work:${fav.itemId}`,
                        limit: 1
                    }
                }));
                const responses = await Promise.all(requests);
                const booksData = responses.map((res, index) => {
                    const doc = res.data.docs?.[0];
                    return {
                        favoriteId: favoriteIds[index].id,
                        key: doc.key,
                        title: doc.title,
                        author: doc.author_name?.[0] || "Unknown author",
                        coverId: doc.cover_i,
                        year: doc.first_publish_year
                    };
                });
                setBooks(booksData);
                setError(false);
                setErrorMessage("");
            } catch (error) {
                if (axios.isCancel(error)) return;
                console.error(error);
                setError(true);
                setErrorMessage(`${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        void fetchBooks();
        return () => controller.abort();
    }, [favoriteIds]);

    if (!user) return <p className="message-login">You need to be logged in to see your favorites.</p>;

    async function handleRemoveFavorite(favoriteId) {
        setLoading(true);
        try {
            const response = await axios.delete(
                `https://novi-backend-api-wgsgz.ondigitalocean.app/api/favorites/${favoriteId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "novi-education-project-id": "fc3b1d4e-24cf-4767-8ccb-fce51b54f7f8",
                    },
                }
            );
            console.log("Removed:", response.data);
            setBooks(prev => prev.filter(book => book.favoriteId !== favoriteId));
        } catch (error) {
            console.error("Error removing favorite:", error);
        }
        finally {
            setLoading(false);
        }

    }

    return (
        <>
            {loading &&
                <span className="loader"></span>}

            {error && (
                <p className="error-message">
                    Please wait a moment or try again later.
                    <br/>
                    <strong>{errorMessage}</strong>
                </p>
            )}
            <h1>Your favorites</h1>

            <section className="favorites-container">

                {loading && books.length === 0 &&
                    <p>Loading favorites...</p>}

                {!loading && books.length === 0 && (
                    <p>You have no favorites yet</p>
                )}

                {books.map((book) => (
                    <ProductCard
                        key={book.key}
                        img={
                            book.coverId
                                ? `https://covers.openlibrary.org/b/id/${book.coverId}-L.jpg`
                                : null
                        }
                        alt={book.title}
                        title={
                            book.title.length > 20
                                ? book.title.slice(0, 20) + "..."
                                : book.title
                        }
                        author={
                            book.author.length > 30
                                ? book.author.slice(0, 30) + "..."
                                : book.author
                        }
                        viewDetails={book.year}
                    >
                        <Button
                            className="button-favorites button-remove-favorite"
                            onClick={() => handleRemoveFavorite(book.favoriteId)}
                        >
                            Remove
                        </Button>
                    </ProductCard>
                ))}
            </section>
        </>
    );
}

export default Favorites;