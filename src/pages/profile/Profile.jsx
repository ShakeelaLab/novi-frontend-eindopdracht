import './Profile.css';
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import {jwtDecode} from "jwt-decode";
import Button from "../../components/button/Button.jsx";

function Profile() {

    const {token, user} = useContext(AuthContext);
    const [favoriteIds, setFavoriteIds] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { email } = jwtDecode(token);

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
                // show total favorites
                setFavoriteIds(favorites.length);
            } catch (error) {
                console.error("Error fetching favorites:", error)
                setError(true);
                setErrorMessage(`Error fetching favorites: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }
        void fetchFavorites();
    }, [token]);

    return (
        <>
            {loading &&
                <span className="loader"></span>}
            <section className="outer-container-profile">
                <h1>Profile page</h1>
                {/*show email from token*/}
                <p><strong>Emailadres</strong>: {email}</p>
                <p><strong>Favorite books: </strong>{favoriteIds} </p>
            </section>
        </>
    );
}

export default Profile;