import './Footer.css';
import envelope from "../../assets/svg/envelope-simple.svg";
import facebooklogo from "../../assets/svg/facebook-logo.svg";
import instagramlogo from "../../assets/svg/instagram-logo.svg";

function Footer() {
    return (
        <>
            <div className="footer-icons">
                <a href="https://www.facebook.com/"><img src={facebooklogo} alt="logo of facebook" /></a>
                <a href="https://www.instagram.com/"><img src={instagramlogo} alt="logo of instagram" /></a>
                <a href="mailto:info@jouwdomein.nl"> <img src={envelope} alt="image of an envelope" /></a>
            </div>
            <footer>&copy; Shakeela Jhagroe 2026 for Novi Hogeschool</footer>
        </>
    );
}

export default Footer;