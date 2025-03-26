import {
    Card,
    CardTitle,
    CardDescription,
    CardHeader,
    CardFooter,
} from "./ui/card";

export default function DeckCard() {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Deck Name</CardTitle>
                <CardDescription>Deck Description</CardDescription>
            </CardHeader>
            <CardFooter>
                <p className="text-sm text-muted-foreground">Created: {new Date().toLocaleDateString()}</p>
            </CardFooter>
        </Card>
    );
}
