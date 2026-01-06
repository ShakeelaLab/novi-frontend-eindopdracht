import './Navigation.css';
import brandLogo from "../../assets/svg/brand-logo.svg";
import ThemeToggle from "/src/components/themeToggle/ThemeToggle.jsx";
import React from "react";
import MenuBar from "../menuBar/MenuBar.jsx";

function Navigation() {
    const [isDark, setIsDark] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);

    return (
        <>
            <nav>
                <div className="nav-outercontainer">
                    <div className="container-logo">
                        <p className="brand-name">Bookstore</p>
                        <img className="brand-logo" src={brandLogo} alt="Brand logo" />
                    </div>

                    <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                        <li>Home</li>
                        <li>Favorites</li>
                        <li>Login</li>
                    </ul>
                    <ThemeToggle onThemeChange={setIsDark} />
                    <MenuBar
                        className="menu-bar"
                        onClick={() => setMenuOpen(prev => !prev)}
                    />
                </div>
            </nav>

        </>
    );
}

export default Navigation;