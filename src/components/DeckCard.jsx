import {
    Card,
    CardTitle,
    CardDescription,
    CardHeader,
    // CardFooter,
} from "./ui/card";

import { useNavigate } from "react-router-dom";

export default function DeckCard({ id, name, description }) {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/deck/${id}`);
    }

    return (
        <Card className="w-full max-w-sm cursor-pointer hover:shadow-md transition-shadow" onClick={handleClick}>
            <CardHeader>
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle>{name}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            {/* <CardFooter>
                <p className="text-sm text-muted-foreground">Created: {new Date().toLocaleDateString()}</p>
            </CardFooter> */}
        </Card>
    );
}
