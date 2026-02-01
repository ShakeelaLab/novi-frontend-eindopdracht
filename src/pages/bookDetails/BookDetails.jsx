import './BookDetails.css';
import axios from "axios";
import {useState, useEffect} from "react";
import {useParams, useLocation, useNavigate} from "react-router-dom";
import Button from "../../components/button/Button.jsx";
import {CaretLeft} from "phosphor-react";

function BookDetails() {
    const [bookInfo, setBookInfo] = useState(null);
    const {bookId} = useParams();
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [imgError, setImgError] = useState(false);
    const {state} = useLocation();
    const fallbackCoverId = state?.coverId;
    const navigate = useNavigate();

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
                    <div
                        className="media-column"> {imgError ? (
                        <div className="no-image">No
                            image</div>) : (
                        <img src={coverUrl}
                             alt={bookInfo?.title || "Book cover"}
                             onError={() => setImgError(true)}/>)}
                    </div>
                    <div className="wrapper-summary">
                        <h2>{bookInfo.title}</h2> <h3>About
                        this book:</h3>
                        <p>{bookInfo?.description
                            ? (typeof bookInfo.description === "string"
                                ? bookInfo.description
                                : bookInfo.description?.value)
                            : "No summary available."} </p>
                        <Button
                            type="button"
                            className="button-overview button-mobile"
                            onClick={() => navigate(-1)}
                        >
                            <CaretLeft size={28}/>
                            Back to overview
                        </Button>
                    </div>
                </article>)}


        </>
    );
}

export default BookDetails;