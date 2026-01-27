import {createContext, useState} from "react";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [isAuth, toggleIsAuth] = useState({
        isAuth: false,
        user: '',
    });
    const navigate = useNavigate();

    function isLoggedIn(email) {
        toggleIsAuth({
            isAuth: true,
            user: email,
        });
        console.log('Gebruiker is ingelogd!');
        navigate('/profile');
    }

    function isLoggedOut() {
        toggleIsAuth({
            isAuth: false,
            user: '',
        });
        console.log('Gebruiker is uitgelogd!');
        navigate('/');
    }

    const data = {
        isAuthenticated: isAuth.isAuth,
        user: isAuth.user,
        login: isLoggedIn,
        logout: isLoggedOut,
    };

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;