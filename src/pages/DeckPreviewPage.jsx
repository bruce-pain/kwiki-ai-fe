import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import DeckDeleteDialogButton from "@/components/DeckDeleteDialogButton";

import api from "@/services/api";

import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DeckPreviewPage() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch deck details from the server
    useEffect(() => {
        const fetchDeck = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get(`/decks/${deckId}`);
                const deck = response.data.data;

                setDeck(deck);
            } catch (error) {
                setError(error);
                throw new Error(
                    "Failed to fetch deck: " + error.response.data.message
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDeck();
    }, [deckId]);

    // Function to handle deck deletion
    const handleDeleteDeck = async (deckId) => {
        try {
            await api.delete(`/decks/${deckId}`);
            navigate("/dashboard");
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
            {/* Main content */}
            <div className="flex flex-col items-center justify-center w-full p-6 md:p-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col gap-4 p-6 text-center">
                        <Button
                            variant="outline"
                            onClick={() => navigate("/dashboard")}
                            className="mb-4"
                        >
                            Back to Dashboard
                        </Button>
                        <h1 className="text-2xl font-bold">
                            Previewing {deck?.name}
                        </h1>
                        <p className="text-gray-500">{deck?.description}</p>
                        <div className="flex gap-4 mt-4 justify-center">
                            <Button
                                variant="outline"
                                onClick={() => navigate(`/deck/${deckId}/study`)}
                            >
                                Start Studying
                            </Button>
                            <DeckDeleteDialogButton
                                id={deck?.id}
                                name={deck?.name}
                                onDelete={handleDeleteDeck}
                            />
                        </div>  
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {error && (
                            <div className="text-red-500 p-4 text-center">
                                {error.response?.data?.message ||
                                    "An error occurred"}
                            </div>
                        )}
                        {deck?.cards?.length > 0 ? (
                            deck.cards.map((card, id) => (
                                <Card key={id} className="mb-4 p-4 shadow-md text-center">
                                    <h2 className="text-lg font-semibold">
                                        {card.question}
                                    </h2>
                                </Card>
                            ))
                        ) : (
                            <p className="text-center">No cards available in this deck.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
