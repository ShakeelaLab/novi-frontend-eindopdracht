import './Footer.css';
import {InstagramLogo, FacebookLogo, EnvelopeSimple,} from "phosphor-react";

function Footer() {
    return (
        <>
            <div className="footer-icons">
                <a href="https://www.facebook.com/" target="_blank">
                    <FacebookLogo size={32} color="var(--icon-footer)" alt="logo of facebook"/>
                </a>
                <a href="https://www.instagram.com/" target="_blank">
                    <InstagramLogo size={32} color="var(--icon-footer)" alt="logo of instagram"/>
                </a>
                <a href="mailto:info@jouwdomein.nl" target="_blank">
                    <EnvelopeSimple size={32} color="var(--icon-footer)" alt="logo of envelope"/>
                </a>
            </div>
            <footer>&copy; Shakeela Jhagroe 2026 for Novi Hogeschool</footer>
        </>
    );
}

export default Footer;