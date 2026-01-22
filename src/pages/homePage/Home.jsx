import './Home.css';
import Button from "../../components/button/Button.jsx";
import InputField
    from "../../components/inputField/InputField.jsx";
import ProductCard
    from "../../components/productCard/ProductCard.jsx";

function Home() {
    return (
        <>
            <form className="search-field">
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

            <section className="outer-container-articles">
                <ProductCard/>
            </section>
            <span className="loader"></span>
        </>
    );
}

export default Home;