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
    const [query, setQuery] = useState("harry potter");
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBooks() {
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(`https://openlibrary.org/search.json`, {
                    signal: controller.signal,
                    params: {
                        q: query,
                        limit: 10,
                        offset: page * 10,
                    }
                });
                console.log(response.data);
                setBooks(response.data.docs);
            } catch (error) {
                console.error(error)
                setError(true);
            } finally {
                setLoading(false);
            }
        }

        fetchBooks();
        return function cleanup() {
            controller.abort();
        }
    }, [page, query]);


    return (
        <>
            <form className="search-field"
                  onSubmit={(e) => {
                      e.preventDefault();
                      setPage(0);
                      setQuery(e.target["search-field"].value);
                  }}>
                <label className="search-wrapper">
                    <InputField
                        type="text"
                        name="search-field"
                        placeholder="Search by title or author"
                        className="search-input"
                    />
                    <Button
                        text="search"
                        type="submit"
                        className="home-button-input"
                    />
                </label>
            </form>
            <section className="main-text">
                <p><strong>Discover Your Next Great
                    Read</strong></p>
                <p>Explore thousands of books across all
                    genres. From bestsellers to hidden gems,
                    find the perfect book for every
                    moment.</p>
            </section>

            {loading && <span className="loader"></span>}

            <section className="outer-container-articles">
                {books.map((book) =>
                    <ProductCard
                        key={book.key}
                        img={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                        alt={book.title}
                        title={book.title}
                        author={book.author_name ? book.author_name[0] : "Unknown author"}
                        view_details={book.first_publish_year}
                    />
                )}

            </section>
        </>
    );
}

export default Home;