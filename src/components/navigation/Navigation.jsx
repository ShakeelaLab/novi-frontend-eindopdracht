import './Navigation.css';
import logo from "../../assets/svg/logo.svg"
import ThemeToggle
    from "/src/components/themeToggle/ThemeToggle.jsx";
import React, {useContext, useEffect, useState} from "react";
import MenuBar from "../menuBar/MenuBar.jsx";
import {NavLink, useNavigate} from "react-router-dom";
import {AuthContext} from "../../context/AuthContext.jsx";
import { SearchContext } from "../../context/SearchContext.jsx";

function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);
    const isActive = ({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'
    const { setQuery } = useContext(SearchContext);

    const {isAuth, logout} = useContext(AuthContext);

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
                            to="/"
                            onClick={() => setQuery("")}
                        >
                            <div className="company-logo">
                                <svg width="280" height="60" viewBox="0 0 280 60">
                                    <rect x="8" y="12" width="8" height="36" rx="1" fill="#b0cae6"/>
                                    <rect x="18" y="15" width="8" height="33" rx="1" fill="#CFDBD5"/>
                                    <rect x="28" y="10" width="8" height="38" rx="1" fill="#F5CB5C"/>
                                    <rect x="38" y="14" width="8" height="34" rx="1" fill="#555B6E"/>
                                    <text
                                        x="55"
                                        y="40"
                                        fontSize="28"
                                        fontWeight="bold"
                                        fill="currentColor"
                                    >
                                        bookstore
                                    </text>
                                </svg>
                            </div>
                        </NavLink>
                        <ul className="nav-links-desktop">
                            <div className="link-background">
                            <li><NavLink
                                className={isActive}
                                to="/"
                                onClick={() => setQuery("")}
                            >Home</NavLink></li>
                                </div>
                            <div className="link-background">
                            <li><NavLink
                                className={isActive}
                                to="/favorites">Favorites</NavLink>
                            </li>
                            </div>
                            {isAuth ?
                                <>
                                <div className="link-background">
                                    <li><NavLink
                                        className={isActive}
                                        to="/profile">Profile</NavLink>
                                    </li>
                                </div>
                                <div className="link-background">
                                    <li><NavLink
                                        onClick={logout}
                                        to="/"
                                    >Logout</NavLink>
                                    </li>
                                </div>
                                </>
                                :
                                <div className="link-background">
                                <li><NavLink
                                    className={isActive}
                                    to="/signin">Login</NavLink>
                                </li>
                                </div>
                            }
                        </ul>
                        <div className="nav-toggle-wrapper">
                            <ThemeToggle/></div>
                        <MenuBar
                            className={`menu-bar ${menuOpen ? "open" : ""}`}
                            onClick={() => setMenuOpen(prev => !prev)}/>
                    </div>
                </nav>
                <ul className={`nav-links-mobile ${menuOpen ? "open" : ""}`}>
                    <div className="link-background">
                    <li><NavLink className={isActive}
                                 to="/"
                                 onClick={() => setQuery("")}
                    >Home</NavLink></li>
                    </div>
                    <div className="link-background">
                    <li><NavLink className={isActive}
                                 to="/favorites">Favorites</NavLink>
                    </li>
                    </div>
                    {isAuth ?
                        <>
                        <div className="link-background">
                            <li><NavLink
                                className={isActive}
                                to="/profile">Profile</NavLink>
                            </li>
                        </div>
                            <div className="link-background">
                            <li><NavLink
                                onClick={logout}
                                to="/">Logout</NavLink>
                            </li>
                        </div>
                        </>
                        :
                        <div className="link-background">
                        <li><NavLink
                            className={isActive}
                            to="/signin">Login</NavLink>
                        </li>
                        </div>
                    }
                    <li className="mobile-toggle">
                        <ThemeToggle/></li>
                </ul>
            </header>
        </>
    );
}

export default Navigation;