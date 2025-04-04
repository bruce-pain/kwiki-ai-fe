import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import api from "@/services/api";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import FlashCard from "@/components/FlashCard";

export default function StudyPage() {
    const { deckId } = useParams();
    const navigate = useNavigate();
    const [deck, setDeck] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [flashcards, setFlashcards] = useState([]);
    const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);

    useEffect(() => {
        const fetchDeck = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await api.get(`/decks/${deckId}`);
                const deck = response.data.data;
                setDeck(deck);
                setFlashcards(deck.cards);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchDeck();
    }, [deckId]);

    const handleNextCard = () => {
        if (currentFlashcardIndex < flashcards.length - 1) {
            setCurrentFlashcardIndex(prev => prev + 1);
        } else {
            navigate("/dashboard");
        }
    };

    if (loading) return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
    if (error) return <div className="flex justify-center items-center min-h-screen">Error: {error.message}</div>;
    if (!deck || flashcards.length === 0) return <div className="flex justify-center items-center min-h-screen">No flashcards available</div>;

    return (
        <div className="min-h-svh flex flex-col w-full">
            <Navbar />
            <div className="flex-1 container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold">{deck.name}</h1>
                        <Button variant="outline" onClick={() => navigate("/dashboard")}>
                            Back to Dashboard
                        </Button>
                    </div>
                    
                    <div className="space-y-2">
                        <div className="text-sm text-muted-foreground">
                            Card {currentFlashcardIndex + 1} of {flashcards.length}
                        </div>
                        <Progress 
                            value={(currentFlashcardIndex + 1) / flashcards.length * 100} 
                            className="w-full"
                        />
                    </div>

                    <FlashCard 
                        title={`Question ${currentFlashcardIndex + 1}`}
                        question={flashcards[currentFlashcardIndex].question}
                        answer={flashcards[currentFlashcardIndex].answer}
                        explanation={flashcards[currentFlashcardIndex].explanation}
                        onNext={handleNextCard}
                        isLastCard={currentFlashcardIndex === flashcards.length - 1}
                    />
                </div>
            </div>
        </div>
    );
}
