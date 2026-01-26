import './BookDetails.css';
import axios from "axios";
import {useState, useEffect} from "react";
import {useParams, useLocation} from "react-router-dom";

function BookDetails() {
    const [bookInfo, setBookInfo] = useState(null);
    const {bookId} = useParams();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const {state} = useLocation();
    const fallbackCoverId = state?.coverId;

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBookDetails() {
            setLoading(true);
            setError(false);
            try {
                const response = await axios.get(`https://openlibrary.org/works/${bookId}.json`, {
                    signal: controller.signal,
                });
                setBookInfo(response.data);
                console.log(response.data);
            } catch (error) {
                if (axios.isCancel(error)) return;
                setError(true);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }
        }

        void fetchBookDetails();
        return () => controller.abort();
    }, [bookId]);

    const workCoverId = bookInfo?.covers?.[0];
    const coverUrl = workCoverId
        ? `https://covers.openlibrary.org/b/id/${workCoverId}-L.jpg`
        : fallbackCoverId
            ? `https://covers.openlibrary.org/b/id/${fallbackCoverId}-L.jpg`
            : "/fallback-cover.jpg";

    return (
        <>
            {loading && <span className="loader"></span>}
            {error && (
                <p className="error-message">
                    Something went wrong, try
                    again: <strong>{errorMessage}</strong>
                </p>
            )}

                {bookInfo && (
                    <article className="book-details">
                        {coverUrl ? (
                            <img
                                src={coverUrl}
                                alt={bookInfo?.title || "Book cover"}
                            /> ) : ( <p>No image available</p> )}
                        <div className="wrapper-summary">
                            <h2>{bookInfo.title}</h2>
                        <h3>About this book:&nbsp;</h3>
                        <p>{bookInfo?.description
                                ? (typeof bookInfo.description === "string"
                                    ? bookInfo.description
                                    : bookInfo.description?.value)
                                : "No summary available."} </p>
                        </div>
                    </article>)}

        </>
    );
}

export default BookDetails;