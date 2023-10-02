import React, { useState } from "react";

import "./styles.scss";
import { Player } from "../Home/data";

const CardName = ({
    playerName,
    color,
    suit,
}: {
    playerName: string;
    color?: string;
    suit?: string;
}) => {
    const firstLetter = playerName[0];
    const restOfName = playerName.substring(1, playerName.length);

    return (
        <>
            <div className="card-name-inner">
                <span className={`card-first-letter ${color}`}>
                    {firstLetter}
                </span>
                <span className={`card-rest ${color}`}>{restOfName}</span>
            </div>
            <div className="card-suit">
                <img src={`/assets/${suit}.svg`} alt={suit} />
            </div>
        </>
    );
};

const Cards = ({ allPlayers }: { allPlayers: Player[] }) => {
    const [activeCard, setActiveCard] = useState("");

    const showScores = (name: string) => {
        activeCard === name ? setActiveCard("") : setActiveCard(name);
    };

    return (
        <div className="cards section typeset">
            {allPlayers.map((player, i) => (
                <div
                    id={`${player.name}`}
                    className={`card column column--trio ${activeCard === player.name ? "active" : ""
                        }`}
                    key={`${player.name}`}
                    onClick={() => showScores(player.name)}
                >
                    <div className="card-inner">
                        <div className="card-front">
                            <div className="card-name">
                                <CardName
                                    playerName={player.name}
                                    color={player.color}
                                    suit={player.suit}
                                />
                            </div>
                            <div className="card-name card-name-upsidedown">
                                <CardName
                                    playerName={player.name}
                                    color={player.color}
                                    suit={player.suit}
                                />
                            </div>
                            <div className="card-image-wrapper">
                                <div
                                    className="card-image"
                                    style={{
                                        backgroundImage: `url(${player.image})`,
                                    }}
                                ></div>
                            </div>
                        </div>
                        <div className="card-back">SCORES</div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
