import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";

export default function GoogleCallbackPage() {
    const navigate = useNavigate();
    const { handleGoogleLogin } = useAuth();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("access_token");

        if (token) {
            const success = handleGoogleLogin(token);
            if (success) {
                navigate("/dashboard");
            } else {
                // Handle error case
                console.error("Google login failed");
                navigate("/login");
            }
        } else {
            // Handle error case
            console.error("No token found in the URL");
            navigate("/login");
        }
    }, [navigate]);

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl">Logging in...</h1>
            </div>
        </div>
    );
}
