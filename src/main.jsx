import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import SearchProvider from "./context/SearchContext.jsx";

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Router>
            <AuthContextProvider>
                <SearchProvider>
                    <App/>
                </SearchProvider>
            </AuthContextProvider>
        </Router>
    </StrictMode>,
)
