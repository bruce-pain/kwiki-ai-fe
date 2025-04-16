import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeProvider";

import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import GoogleCallbackPage from "./pages/GoogleCallback";
import DashboardPage from "./pages/DashboardPage";
import DeckPreviewPage from "./pages/DeckPreviewPage";
import StudyPage from "./pages/StudyPage";

export default function App() {
    return (
        <AuthProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={<Navigate to="/dashboard" />}
                        />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route
                            path="/google/callback"
                            element={<GoogleCallbackPage />}
                        />

                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            {/* Add your protected routes here */}
                            <Route
                                path="/dashboard"
                                element={<DashboardPage />}
                            />
                            <Route
                                path="/deck/:deckId"
                                element={<DeckPreviewPage />}
                            />
                            <Route
                                path="/deck/:deckId/study"
                                element={<StudyPage />}
                            />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    );
}
