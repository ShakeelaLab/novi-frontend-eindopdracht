import './Home.css';
import Button from "../../components/button/Button.jsx";
import InputField from "../../components/inputField/InputField.jsx";
import ProductCard from "../../components/productCard/ProductCard.jsx";
import axios from "axios";
import React, {useState, useEffect, useContext, useRef} from "react";
import {Link} from "react-router-dom";
import {CaretLeft, CaretRight, Heart} from "phosphor-react";
import { sortByOldest, sortByNewest} from "../../helpers/sortyByYear.js";
import { extractWorkId } from "../../helpers/extractWorkId.js";
import {SearchContext} from "../../context/SearchContext.jsx";
import {AuthContext} from "../../context/AuthContext.jsx";
import {jwtDecode} from "jwt-decode";

function Home() {
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [totalResults, setTotalResults] = useState(0);
    const {query,setQuery,results,setResults} = useContext(SearchContext);
    const topRef = useRef(null);
    const {token, isAuth} = useContext(AuthContext);

    const hasNextPage = (page + 1) * 12 < totalResults;
    const hasPrevPage = page > 0;
    const [sortDirection, setSortDirection] = useState("oldest");
    const [favoriteItems, setFavoriteItems] = useState([]);

    function handleSubmitButton(event) {
        event.preventDefault();
        if (!searchInput.trim()) return;
        setPage(0);
        setQuery(searchInput.trim());
        setSearchInput("");
    }

    useEffect(() => {
        if (!token) return;

        async function fetchFavorites() {
            setLoading(true);
            setError(false);
            setErrorMessage("");
            try {
                const { userId } = jwtDecode(token);
                const response = await axios.get("https://novi-backend-api-wgsgz.ondigitalocean.app/api/favorites", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "novi-education-project-id": "fc3b1d4e-24cf-4767-8ccb-fce51b54f7f8",
                    }
                });
                const userFavorites = response.data
                    .filter(fav => fav.userId === userId)
                    .map(fav => fav.itemId);
                    setFavoriteItems(userFavorites);
            } catch (error) {
                console.error("Error fetching favorites:", error);
                setError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }
        void fetchFavorites();
    }, [token]);


    async function handleFavoriteClick(book) {
        if (!token) return;
        const workId = extractWorkId(book);
        const { userId } = jwtDecode(token);

        setLoading(true);
        try {
            const existing = await axios.get(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/favorites",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "novi-education-project-id": "fc3b1d4e-24cf-4767-8ccb-fce51b54f7f8",
                    },
                }
            );

            const alreadyExists = existing.data.some(
                fav => fav.itemId === String(workId)
            );

            if (alreadyExists) {
                console.log("Book already in favorites:", workId);
                return;
            }
            setFavoriteItems(prev => [...prev, workId]);
            const newId = Date.now();
            console.log("Sending favorite:", { id: newId, userId: userId, itemId: String(workId), });

            await axios.post(
                "https://novi-backend-api-wgsgz.ondigitalocean.app/api/favorites",
                {
                    id: newId,
                    userId: userId,
                    itemId: String(workId),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "novi-education-project-id": "fc3b1d4e-24cf-4767-8ccb-fce51b54f7f8",
                    },
                }
            );
            console.log("Toegevoegd aan favorieten:", workId);
        } catch (error) {
            console.error("Error adding favorite:", error);
            setError(true);
            setErrorMessage(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBooks() {
            setLoading(true);
            setError(false);
            setErrorMessage("");
            try {
                let url = "";
                let params = {};
                if (!query) {
                    url = "https://openlibrary.org/search.json?q=first_publish_year:[2025 TO 2026]&sort=trending";
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
                const docs = response.data.docs;

                const filtered = docs.filter((book) => {
                    const langs = book.language || [];
                    return langs.includes("eng") || langs.includes("dut") || langs.includes("nld");
                });

                if (filtered.length === 0) {
                    setError(true);
                    setErrorMessage("No books found for this search.");
                    setResults([]);
                    setLoading(false);
                    return;
                }

                setResults(filtered);
                setTotalResults(response.data.numFound);
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

    useEffect(() => {
        if (query) {
            topRef.current?.scrollIntoView({behavior: "smooth"});
        }
    }, [query]);

    function toggleSort() {
        if (sortDirection === "oldest") {
            const sorted = sortByNewest(results);
            setResults(sorted);
            setSortDirection("newest");
        } else {
            const sorted = sortByOldest(results);
            setResults(sorted);
            setSortDirection("oldest");
        }
    }

    return (
        <>
            <form
                className="search-field"
                onSubmit={handleSubmitButton}
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

            {loading &&
                <span className="loader"></span>}

            {error && (
                <p className="error-message">
                    Please wait a moment or try again later.
                    <br/>
                    <strong>{errorMessage}</strong>
                </p>
            )}

            <section className="main-text">
                <h4><strong>Discover Your Next Great
                    Read</strong></h4>
                <p>
                    Explore thousands of books across
                    all
                    genres. From bestsellers to hidden
                    gems,
                    find the perfect book for every
                    moment.
                </p>
                <p>Add them to your favorites, so that it
                    will remind you what to read next.</p>
            </section>
            <div ref={topRef}></div>
            <div className="heading-bookresults">
                {!query && <p>New and trending</p>}
                {totalResults <= 1 ? null :
                    <div className="sort-wrapper">
                        <Button
                            className="secondary-button"
                            type="submit"
                            onClick={toggleSort}
                        >Sort
                            by: {sortDirection === "oldest" ? "oldest to newest" : "newest to oldest"}</Button>
                    </div>}
            </div>
            <section
                className="outer-container-articles">
                {results.map((book) => {
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
                    const workId = extractWorkId(book);
                    const isFavorite = favoriteItems.includes(workId);

                    return (
                        <ProductCard
                            key={book.key}
                            img={coverId ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg` : null}
                            alt={title}
                            title={title.length > 20 ? title.slice(0, 20) + "..." : title}
                            author={author.length > 30 ? author.slice(0, 30) + "..." : author}
                            viewDetails={year}
                        >
                            <Link
                                className="button-link-info"
                                to={`/works/${book.key.replace("/works/", "")}`}
                                state={{coverId}}
                            >More info</Link>
                            { isAuth &&
                            <Button
                                className="button-favorites"
                                disabled={isFavorite}
                                onClick={() => handleFavoriteClick(book, coverId)}>

                                {isFavorite ? (
                                    <>
                                    Added <Heart size={32} color="var(--icon-color)" weight="fill"/>
                                    </>
                                )
                                    : (
                                        <>
                                            Add to favorites <Heart size={32} color="var(--icon-color)" weight="regular"/>
                                        </>
                                    )}
                            </Button>
                            }
                        </ProductCard>
                    );
                })}
            </section>
            {query && totalResults > 1  && (
                <div className="pagination">
                <span
                    className={`prev ${!hasPrevPage ? "disabled" : ""}`}
                    onClick={() => {
                        if (hasPrevPage) {
                            setPage((p) => p - 1);
                            topRef.current?.scrollIntoView({behavior: "smooth"});
                        }
                    }}
                >
                <CaretLeft size={32}/>
                    previous
                </span>
                    <span
                        className={`next ${!hasNextPage ? "disabled" : ""}`}
                        onClick={() => {
                            if (hasNextPage) {
                                setPage((p) => p + 1);
                                topRef.current?.scrollIntoView({behavior: "smooth"});
                            }
                        }}
                    >
                    next
                <CaretRight size={32}/>
                </span>
                </div>
            )}
        </>
    );
}

export default Home;
