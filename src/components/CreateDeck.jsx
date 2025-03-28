import api from "@/services/api";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./ui/dialog";

import { LucidePlus } from "lucide-react";

export default function CreateDeck({ onAddDeck }) {
    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [open, setOpen] = useState(false);

    const onSubmit = async (data) => {
        // Handle the form submission here
        console.log("Form submitted with data:", topic);

        try {
            setLoading(true);
            setError(null);
            const response = await api.post("/decks/generate", { topic: data.topic });
            const deck = response.data.data;

            onAddDeck(deck);
        } catch (error) {
            setError(error);
            throw new Error(
                "Failed to create deck: " + error.response.data.message
            );
        } finally {
            setLoading(false);
            setOpen(false);
            reset({ topic: '' });
        }
    };

    const handleOpenChange = (open) => {
        setOpen(open);
        if (!open) {
            reset({ topic: '' });
            setError(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <LucidePlus className="mr-2 h-4 w-4" />
                    Create Deck
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Deck</DialogTitle>
                    <DialogDescription>
                        Generate a new deck of flashcards based on any topic
                        using AI.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="topic" className="text-right">
                                Topic
                            </Label>
                            <Input
                                {...register("topic")}
                                id="topic"
                                placeholder="Enter a topic"
                                className="col-span-3"
                                required
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" disabled={loading}>
                            {loading ? (
                                <>
                                    Creating...
                                    <svg className="animate-spin ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </>
                            ) : "Create Deck"}
                        </Button>
                        {/* error */}
                        {error && (
                            <p className="text-sm text-red-500 text-center">
                                {error}
                            </p>
                        )}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
