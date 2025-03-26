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
    CardFooter,
} from "./ui/card";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";

export default function DeckCard({ id, name, description, onDelete }) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon">
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
                                    onClick={() => onDelete(id)}
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
