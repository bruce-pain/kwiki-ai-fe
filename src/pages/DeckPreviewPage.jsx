import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

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

    return (
        <div className="min-h-svh flex flex-col w-full">
            {/* Navbar */}
            <Navbar />
            {/* Main content */}
            <div className="flex flex-col items-center justify-center w-full p-6 md:p-10">
                <div className="max-w-4xl mx-auto">
                    <div className="flex flex-col gap-4 p-6">
                        <Button
                            variant="outline"
                            onClick={() => navigate("/dashboard")}
                            className="mb-4"
                        >
                            Back to Dashboard
                        </Button>
                        <h1 className="text-2xl font-bold">Previewing {deck?.name}</h1>
                        <p className="text-gray-500">{deck?.description}</p>
                    </div>
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {deck?.cards?.length > 0 ? (
                            deck.cards.map((card) => (
                                <Card
                                    key={card.id}
                                    className="mb-4 p-4 shadow-md"
                                >
                                    <h2 className="text-lg font-semibold">
                                        {card.question}
                                    </h2>
                                </Card>
                            ))
                        ) : (
                            <p>No cards available in this deck.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
