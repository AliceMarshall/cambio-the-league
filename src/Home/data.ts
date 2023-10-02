export interface Player {
    name: string;
    image: string;
    color?: string;
    suit?: string;
}

const data: Player[] = [
    {
        name: "Alice",
        image: "/assets/alice.png",
    },
    {
        name: "Lucy",
        image: "/assets/lucy.png",
    },
    {
        name: "Mauro",
        image: "/assets/mauro.png",
    },
];

export default data;
