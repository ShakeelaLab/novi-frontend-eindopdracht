import './Home.css';
import Button from "../../components/button/Button.jsx";
import InputField
    from "../../components/inputField/InputField.jsx";
import ProductCard
    from "../../components/productCard/ProductCard.jsx";
import axios from "axios";
import {useState, useEffect} from "react";

function Home() {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [query, setQuery] = useState(null);
    const [books, setBooks] = useState([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBooks() {
            setLoading(true);
            setError(false);
            setErrorMessage("");
            try {
                let url = "";
                let params = {};
                if (query === null) {
                    url = "https://openlibrary.org/subjects/popular.json";
                    params = {limit: 12,};
                } else {
                    url = "https://openlibrary.org/search.json";
                    params = {
                        q: query,
                        limit: 12,
                        offset: page * 12,
                    };
                }
                const response = await axios.get(url, {
                    signal: controller.signal,
                    params,
                });
                const docs = query === null
                    ? response.data.works

                    : response.data.docs;

                setBooks(docs || []);
            } catch (error) {
                if (axios.isCancel(error)) return;
                setError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
        return () => controller.abort();
    }, [page, query]);

    return (
        <>
            <form
                className="search-field"
                onSubmit={(e) => {
                    e.preventDefault();
                    if (!searchInput.trim()) return;
                    setPage(0);
                    setQuery(searchInput.trim());
                    setSearchInput("");
                }}
            >
                <label className="search-wrapper">
                    <InputField
                        type="text"
                        name="search-field"
                        placeholder="Search by title or author"
                        className="search-input"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <Button
                        text="search"
                        type="submit"
                        className="home-button-input"
                    />
                </label>
            </form>

            {loading && <span className="loader"></span>}

            {error && (
                <p className="error-message">
                    Something went wrong, try
                    again: <strong>{errorMessage}</strong>
                </p>
            )}

            <section className="main-text">
                <p><strong>Discover Your Next Great
                    Read</strong></p>
                <p>
                    Explore thousands of books across all
                    genres. From bestsellers to hidden gems,
                    find the perfect book for every moment.
                </p>
            </section>

            <section className="outer-container-articles">
                {books.map((book) => {
                    const coverId = book.cover_i || book.cover_id;
                    const title = book.title;
                    const author =
                        book.author_name?.[0] ||
                        book.authors?.[0]?.name ||
                        "Unknown author";
                    const year =
                        book.first_publish_year ||
                        book.first_publish_date ||
                        "Unknown year";

                    return (
                        <ProductCard
                            key={book.key}
                            img={coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : null}
                            alt={title}
                            title={title}
                            author={author}
                            view_details={year}
                        />
                    );
                })}
            </section>
        </>
    );
}

export default Home;
