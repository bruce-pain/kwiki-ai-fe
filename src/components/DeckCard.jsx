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
import {
    Card,
    CardTitle,
    CardDescription,
    CardHeader,
    // CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function DeckCard({ id, name, description, onDelete }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/deck/${id}`);
    }

    const handleDeleteClick = (e) => {
        // Prevent the click event from bubbling up to the Card
        e.stopPropagation();
    }

    const handleConfirmDelete = (e) => {
        e.stopPropagation();
        onDelete(id);
    }

    return (
        <Card className="w-full max-w-sm" onClick={handleClick}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={handleDeleteClick}
                            >
                                <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Delete Deck</AlertDialogTitle>
                                <AlertDialogDescription>
                                    Are you sure you want to delete "{name}"? This action cannot be undone.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                    onClick={handleConfirmDelete}
                                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </CardHeader>
            {/* <CardFooter>
                <p className="text-sm text-muted-foreground">Created: {new Date().toLocaleDateString()}</p>
            </CardFooter> */}
        </Card>
    );
}
