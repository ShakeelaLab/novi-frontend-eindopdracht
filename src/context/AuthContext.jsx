import {createContext, useState, useEffect} from "react";
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import isTokenValid from '../helpers/isTokenValid';

export const AuthContext = createContext({});

function AuthContextProvider({ children }) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    });

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        if (jwtToken) {
            const decoded = jwtDecode(jwtToken);
            if (isTokenValid(decoded)) {
                toggleAuth({
                    isAuth: true,
                    status: 'done',
                    user: {
                        email: decoded.email,
                        roles: decoded.role,
                    },
                })
            } else {
                toggleAuth({
                    ...auth,
                    status: 'done',
                })
            }
        } else {
            toggleAuth({
                ...auth,
                status: 'done',
            })
        }
    }, [])

    const navigate = useNavigate();

    function login(userDetails) {
        localStorage.setItem('token', userDetails.token);
        console.log('Gebruiker is ingelogd!');
        toggleAuth({
            isAuth: true,
            status: 'done',
            user: {
                email: userDetails.user.email,
                roles: userDetails.user.roles,
            },
        });
        navigate('/profile');
    }

    function logout() {
        console.log('Gebruiker is uitgelogd!');
        localStorage.removeItem('token');
        toggleAuth({
            isAuth: false,
            user: null,
            status: 'done',
        })
        navigate('/');
    }

    const data = {
        isAuth: auth.isAuth,
        login: login,
        logout: logout,
        user: auth.user,
    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status === 'done' ? children : <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;