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
    const [isDark, setIsDark] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const isActive = ({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'
    const { setQuery } = useContext(SearchContext);

    const {isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();

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
                            <img
                                className="company-logo"
                                src={logo}
                                alt="Brand logo"/>
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