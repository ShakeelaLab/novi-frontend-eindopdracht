import React, { useEffect } from "react";
import "./ThemeToggle.css";
import SunIcon from "../../assets/svg/sun.svg?react"; import MoonIcon from "../../assets/svg/moon.svg?react";

export default function ThemeToggle({ onThemeChange }) {
    const [isEnabled, setIsEnabled] = React.useState(false);

    useEffect(() => {
        const html = document.documentElement;

        if (isEnabled) {
            html.classList.add("darkmode");
            html.classList.add("dark");
            html.classList.remove("light");
        } else {
            html.classList.remove("darkmode");
            html.classList.add("light");
            html.classList.remove("dark");
        }

        if (onThemeChange) { onThemeChange(isEnabled); }

    }, [isEnabled]);



    return (
        <label className="toggle-wrapper" htmlFor="toggle">
            <div className={`toggle ${isEnabled ? "dark" : "light"}`}>
                <span className="hidden">
                    {isEnabled ? "Enable Light Mode" : "Enable Dark Mode"}
                </span>

                <div className="icons">
                    <SunIcon className="icon" />
                    <MoonIcon className="icon" />
                </div>

                <input
                    id="toggle"
                    name="toggle"
                    type="checkbox"
                    checked={isEnabled}
                    onChange={() => setIsEnabled(!isEnabled)}
                />
            </div>
        </label>
    );
}
