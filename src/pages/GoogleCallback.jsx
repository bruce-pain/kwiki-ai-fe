import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function GoogleCallbackPage() {
    const navigate = useNavigate();
    const { handleGoogleLogin } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get("access_token");

                if (!token) {
                    console.error("No token found in the URL");
                    navigate("/login");
                    return;
                }

                const success = await handleGoogleLogin(token);
                if (success) {
                    navigate("/dashboard");
                } else {
                    console.error("Google login failed");
                    navigate("/login");
                }
            } catch (error) {
                console.error("Error during Google login:", error);
                navigate("/login");
            }
        };

        handleCallback();
    }, [navigate, handleGoogleLogin]);

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl">Logging in...</h1>
            </div>
        </div>
    );
}
