import api from "./api";

export const login = async (username, password) => {
    try {
        const response = await api.post("/auth/login", { username, password });
        return response.data;
    } catch (error) {
        throw new Error("Login failed: " + error.response.data.message);
    }
};

export const register = async (username, password) => {
    try {
        const response = await api.post("/auth/register", {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        throw new Error("Registration failed: " + error.response.data.message);
    }
};

export const getUserProfile = async () => {
    try {
        const response = await api.get("/auth/user");
        return response.data;
    } catch (error) {
        throw new Error(
            "Failed to fetch user profile: " + error.response.data.message
        );
    }
};

export const initiateGoogleLogin = async () => {
    window.location.href = `${process.env.VITE_API_URL}/auth/google`;
}