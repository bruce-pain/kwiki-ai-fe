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

export default function CreateDeck() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* <Button variant="outline">Edit Profile</Button> */}
                <Button>
                    <LucidePlus className="mr-2 h-4 w-4" />
                    Create Deck
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Deck</DialogTitle>
                    <DialogDescription>
                        {/* a simple description letting the user know that they can create a new deck based on any topic using AI */}
                        Generate a new deck of flashcards based on any topic using AI.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="topic" className="text-right">
                            Topic
                        </Label>
                        <Input
                            id="topic"
                            placeholder="Enter a topic"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit">Generate</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
