import React, { useEffect } from "react";
import "./ThemeToggle.css";
import SunIcon from "../../assets/svg/sun.svg?react";
import MoonIcon from "../../assets/svg/moon.svg?react";
import useLocalStorage from "use-local-storage";

export default function ThemeToggle({ onThemeChange }) {
    const id = React.useId();
    const [isEnabled, setIsEnabled] = useLocalStorage("isEnabled", false);

    useEffect(() => {
        const html = document.documentElement;
        html.setAttribute("data-theme", isEnabled ? "dark" : "light");

        if (onThemeChange) {
            onThemeChange(isEnabled);
        }
    }, [isEnabled]);

    return (
        <label className="toggle-wrapper" htmlFor={id}>
            <div className={`toggle ${isEnabled ? "dark" : "light"}`}>
        <span className="hidden">
          {isEnabled ? "Enable Light Mode" : "Enable Dark Mode"}
        </span>

                <div className="icons">
                    <SunIcon className="icon" alt="image of a sun" />
                    <MoonIcon className="icon" alt="image of a moon"/>
                </div>

                <input
                    id={id}
                    name="toggle"
                    type="checkbox"
                    checked={isEnabled}
                    onChange={() => setIsEnabled(!isEnabled)}
                    aria-label={isEnabled ? "Switch to light mode" : "Switch to dark mode"}
                />
            </div>
        </label>
    );
}
