import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

export default function FlashCard({ title, question, answer, explanation, onNext, isLastCard }) {
    const [showAnswer, setShowAnswer] = useState(false);
    const [showExplanation, setShowExplanation] = useState(false);

    const handleNext = () => {
        setShowAnswer(false);
        setShowExplanation(false);
        onNext();
    };

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle className="text-xl font-semibold">{title}</CardTitle>
            </CardHeader>
            <CardContent className="max-h-[400px] overflow-y-auto space-y-4">
                <div className="space-y-2">
                    <h3 className="font-medium">Question:</h3>
                    <p className="text-muted-foreground">{question}</p>
                </div>
                
                {showAnswer && (
                    <div className="space-y-2">
                        <h3 className="font-medium">Answer:</h3>
                        <p className="text-muted-foreground">{answer}</p>
                    </div>
                )}

                {showExplanation && (
                    <div className="space-y-2">
                        <h3 className="font-medium">Explanation:</h3>
                        <p className="text-muted-foreground">{explanation}</p>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-between border-t bg-card sticky bottom-0 p-4">
                {!showAnswer ? (
                    <Button onClick={() => setShowAnswer(true)}>
                        Show Answer
                    </Button>
                ) : !showExplanation ? (
                    <Button onClick={() => setShowExplanation(true)}>
                        Show Explanation
                    </Button>
                ) : (
                    <Button onClick={() => setShowExplanation(false)}>
                        Hide Explanation
                    </Button>
                )}
                
                {showAnswer && (
                    <Button onClick={handleNext} variant="outline">
                        {isLastCard ? "Finish" : "Next Card"}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
