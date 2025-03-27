import DeckCard from "@/components/DeckCard";
import Navbar from "@/components/Navbar";
import CreateDeck from "@/components/CreateDeck";

import api from "@/services/api";
import { useEffect, useState } from "react";

export default function DashboardPage() {
    // State to hold decks
    const [decks, setDecks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // fetch decks from the server
    useEffect(() => {
        const fetchDecks = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get("/decks");
                const decks = response.data.data;

                setDecks(decks);
            } catch (error) {
                setError(error);
                throw new Error(
                    "Failed to fetch decks: " + error.response.data.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDecks();
    }, []);

    // Function to handle deck deletion
    const handleDeleteDeck = async (deckId) => {
        try {
            await api.delete(`/decks/${deckId}`);
            setDecks((prevDecks) =>
                prevDecks.filter((deck) => deck.id !== deckId)
            );
        } catch (error) {
            setError(error);
            throw new Error(
                "Failed to delete deck: " + error.response.data.message
            );
        }
    };

    return (
        <div className="min-h-svh flex flex-col w-full">
            {/* Navbar */}
            <Navbar />
            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-6">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">Your Decks</h1>
                        <CreateDeck />
                    </div>
                    <div className="mt-6">
                        {/* <h2 className="text-xl font-semibold">Your Decks</h2> */}
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {decks &&
                                decks.map((deck) => (
                                    <DeckCard
                                        key={deck.id}
                                        id={deck.id}
                                        name={deck.name}
                                        description={deck.description}
                                        onDelete={handleDeleteDeck}
                                    />
                                ))}
                            {loading && (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">
                                        Loading decks...
                                    </p>
                                </div>
                            )}
                            {error && (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-red-500">
                                        Failed to load decks. Please try again.
                                    </p>
                                </div>
                            )}
                            {!loading && decks.length === 0 && (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">
                                        No decks available.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
