import { useAuth } from "@/context/AuthContext";

export default function DashboardPage() {
    const { user, handleLogout } = useAuth();

    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="mt-4">Welcome, {user?.username}!</p>
                <p className="mt-2">You are logged in.</p>

                <button
                    className="mt-4 w-full rounded bg-red-500 px-4 py-2 text-white"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
}