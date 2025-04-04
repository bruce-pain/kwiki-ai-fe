import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";

import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export default function DeckDeleteDialogButton({ id, name, onDelete }) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="ghost">
                    <Trash2 className="h-4 w-4 text-destructive" /> Delete Deck
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Deck</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete "{name}"? This action
                        cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => {
                            onDelete(id);
                        }}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
