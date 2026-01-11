import './Navigation.css';
import logo from "../../assets/svg/logo.svg"
import ThemeToggle
    from "/src/components/themeToggle/ThemeToggle.jsx";
import React from "react";
import MenuBar from "../menuBar/MenuBar.jsx";
import {NavLink} from "react-router-dom";

function Navigation() {
    const [isDark, setIsDark] = React.useState(false);
    const [menuOpen, setMenuOpen] = React.useState(false);
    const isActive = ({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'

    return (
        <>
            <nav>
                <div className="nav-outercontainer">
                    <img className="company-logo" src={logo}
                         alt="Brand logo"/>
                    <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
                        <li>
                            <NavLink
                                className={isActive}
                                to="/">Home</NavLink></li>
                        <li><NavLink
                            className={isActive}
                            to="favorites">Favorites</NavLink>
                        </li>
                        <li><NavLink
                            className={isActive}
                            to="login">Login</NavLink></li>
                        <li className="mobile-toggle"> <ThemeToggle/> </li>
                    </ul>
                    <div className="nav-toggle-wrapper">
                    <ThemeToggle/>
                    </div>
                    <MenuBar
                        className={`menu-bar ${menuOpen ? "open" : ""}`}
                        onClick={() => setMenuOpen(prev => !prev)}
                    />
                </div>
            </nav>
        </>
    );
}

export default Navigation;