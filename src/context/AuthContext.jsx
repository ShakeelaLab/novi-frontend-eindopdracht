import {createContext, useState, useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import isTokenValid from '../helpers/isTokenValid';
import user from "phosphor-react/src/icons/User.js";
import axios from "axios";

export const AuthContext = createContext({});

function AuthContextProvider({children}) {
    const [auth, toggleAuth] = useState({
        isAuth: false,
        user: null,
        token: null,
        status: 'pending',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const jwtToken = localStorage.getItem('token');
        console.log(jwtToken);
        if (jwtToken) {
            const decoded = jwtDecode(jwtToken);
            console.log(decoded);
            if (isTokenValid(decoded)) {
                // use {userId} in url instead of {id}
                const userId = decoded.userId;
                async function getData() {
                    try {
                        const response = await axios.get(`https://novi-backend-api-wgsgz.ondigitalocean.app/api/users/${userId}`, {
                            headers: {
                                Authorization: `Bearer ${jwtToken}`,
                                "novi-education-project-id": "fc3b1d4e-24cf-4767-8ccb-fce51b54f7f8",
                            }
                        });
                        // log id from backend
                        console.log(response.data.id);
                        // log userId from token
                        console.log("UserId:", decoded.userId);
                        toggleAuth({
                            isAuth: true,
                            status: 'done',
                            token: jwtToken,
                            user: {
                                email: response.data.email,
                                roles: response.data.roles,
                                userId: response.data.id,
                            },
                        })
                    } catch (error) {
                        toggleAuth({
                            ...auth,
                            status: 'error',
                        })
                        console.error(error);
                        localStorage.clear();
                    }
                }

                void getData();
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

    function login(userDetails) {
        localStorage.setItem('token', userDetails.token);
        console.log(userDetails);
        console.log('Gebruiker is ingelogd!');
        toggleAuth({
            isAuth: true,
            status: 'done',
            token: userDetails.token,
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
        token: auth.token,
    };

    return (
        <AuthContext.Provider value={data}>
            {auth.status === 'done' ? children :
                <p>Loading...</p>}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;