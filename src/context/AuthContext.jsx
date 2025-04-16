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
    const [loading, setLoading] = useState(true); // Add initial loading state
    const [error, setError] = useState(null);

    // Add initialization effect
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const token = getToken();
                if (token && !isTokenExpired()) {
                    // Token exists and is valid
                    const response = await getUserProfile();
                    setUser(response.data);
                    setIsAuthenticated(true);
                } else {
                    // Token doesn't exist or is expired
                    removeToken();
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } catch (err) {
                setError(err.message);
                setIsAuthenticated(false);
                removeToken();
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    // Function to handle login
    const handleLogin = async (username, password) => {
        try {
            setLoading(true);
            const response = await login(username, password);
            const { access_token: token, data: userData } = response;

            setToken(token);
            setUser(userData);
            setIsAuthenticated(true);

            return true;
        } catch (err) {
            setError(err.message);

            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async (token) => {
        try {
            setToken(token);
            setLoading(true);
            const response = await getUserProfile();
            const { data: userData } = response;
            setUser(userData);
            setIsAuthenticated(true);
            return true;
        } catch (err) {
            setError(err.message);

            return false;
        } finally {
            setLoading(false);
        }
    };

    // Function to handle registration
    const handleRegister = async (username, password) => {
        try {
            setLoading(true);
            const response = await register(username, password);
            const { access_token: token, data: userData } = response;

            setToken(token);
            setUser(userData);
            setIsAuthenticated(true);

            return true;
        } catch (err) {
            setError(err.message);

            return false;
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
        handleGoogleLogin,
    };

    // Don't render children until initial auth check is complete
    if (loading) {
        return null; // Or return a loading spinner
    }

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
