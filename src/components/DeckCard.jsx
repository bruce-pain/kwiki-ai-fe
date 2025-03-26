import {
    Card,
    CardTitle,
    CardDescription,
    CardHeader,
    CardFooter,
} from "./ui/card";

export default function DeckCard({name, description}) {
    return (
        <Card className="w-full max-w-sm">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            {/* <CardFooter>
                <p className="text-sm text-muted-foreground">Created: {new Date().toLocaleDateString()}</p>
            </CardFooter> */}
        </Card>
    );
}
