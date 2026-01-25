import './Navigation.css';
import logo from "../../assets/svg/logo.svg"
import ThemeToggle
    from "/src/components/themeToggle/ThemeToggle.jsx";
import React from "react";
import MenuBar from "../menuBar/MenuBar.jsx";
import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";

function Navigation() {
    const [isDark, setIsDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const isActive = ({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        if (!menuOpen) {
            document.activeElement.blur();
        }
    }, [menuOpen]);

    return (
        <>
            <header>
                <nav>
                    <div className="nav-outercontainer">
                        <NavLink
                            to="/">
                            <img
                                className="company-logo"
                                src={logo}
                                alt="Brand logo"/>
                        </NavLink>
                        <ul className="nav-links-desktop">
                            <li><NavLink
                                className={isActive}
                                to="/">Home</NavLink></li>
                            <li><NavLink
                                className={isActive}
                                to="favorites">Favorites</NavLink>
                            </li>
                            <li><NavLink
                                className={isActive}
                                to="login">Login</NavLink>
                            </li>
                        </ul>
                        <div className="nav-toggle-wrapper">
                            <ThemeToggle/></div>
                        <MenuBar
                            className={`menu-bar ${menuOpen ? "open" : ""}`}
                            onClick={() => setMenuOpen(prev => !prev)}/>
                    </div>
                </nav>
                <ul className={`nav-links-mobile ${menuOpen ? "open" : ""}`}>
                    <li><NavLink className={isActive}
                                 to="/">Home</NavLink></li>
                    <li><NavLink className={isActive}
                                 to="favorites">Favorites</NavLink>
                    </li>
                    <li><NavLink className={isActive}
                                 to="login">Login</NavLink>
                    </li>
                    <li className="mobile-toggle">
                        <ThemeToggle/></li>
                </ul>
            </header>
        </>
    );
}

export default Navigation;