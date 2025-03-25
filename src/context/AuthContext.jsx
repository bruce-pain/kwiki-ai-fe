import { createContext, useContext, useEffect, useState } from "react";
import {
    getToken,
    setToken,
    isTokenExpired,
    removeToken,
} from "@/utils/tokenUtils";
import { login, register, getUserProfile } from "@/services/authService";

// Create a context for authentication
const AuthContext = createContext();

// Create an AuthProvider component
// This component will wrap around the parts of the app that need access to authentication state

export const AuthProvider = ({ children }) => {
    // define states
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to handle login
    const handleLogin = async (username, password) => {
        try {
            const response = await login(username, password);
            const { access_token: token, data: userData } = response;

            setToken(token);
            setUser(userData);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle registration
    const handleRegister = async (username, password) => {
        try {
            const response = await register(username, password);
            const { access_token: token, data: userData } = response;

            setToken(token);
            setUser(userData);
            setIsAuthenticated(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Function to handle logout
    const handleLogout = () => {
        removeToken();
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        isAuthenticated,
        loading,
        error,
        handleLogin,
        handleRegister,
        handleLogout,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);