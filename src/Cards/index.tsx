import React, { useEffect, useState } from "react";

import "./styles.scss";
import { Player } from "../Home/data";
import { Record } from "../Home";

const mergeArrays = (arr1: Player[], arr2: Record[] | []) => {
    let merged = [];

    for (let i = 0; i < arr1.length; i++) {
        merged.push({
            ...arr1[i],
            ...arr2.find((itmInner) => itmInner.name === arr1[i].name),
        });
    }

    return merged;
};

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

const Cards = ({
    allPlayers,
    results,
    updateScore,
    activeCard,
    setActiveCard,
    recordUpdated,
    unsetRecordUpdated,
    getSurprise,
}: {
    allPlayers: Player[];
    results: Record[] | null;
    updateScore: (id: string, name: string, newScore: number) => void;
    activeCard: string;
    setActiveCard: (card: string) => void;
    recordUpdated: boolean;
    unsetRecordUpdated: () => void;
    getSurprise: () => void;
}) => {
    const [players, setPlayers] = useState(
        mergeArrays(allPlayers, results || [])
    );

    useEffect(() => {
        if (results) {
            setPlayers(mergeArrays(allPlayers, results));
        }
    }, [results]);

    const showScores = (name: string) => {
        if (recordUpdated) return;
        activeCard === name ? setActiveCard("") : setActiveCard(name);
    };

    const handleUpdateScore = (
        e: React.MouseEvent<HTMLDivElement>,
        index: number
    ) => {
        e.stopPropagation();
        const { id, name, wins } = players[index];
        updateScore(id || "", name, (wins || 0) + 1);
    };

    const noTwins = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        unsetRecordUpdated();
        setActiveCard("");
    };

    const yesTwins = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        getSurprise();
    };

    return (
        <div className="cards section typeset">
            {players.map((player, i) => (
                <div
                    id={`${player.name}`}
                    className={`card column column--trio ${
                        activeCard === player.name ? "active" : ""
                    } ${recordUpdated ? "allActive" : ""}`}
                    key={`card-${player.name}-${i}`}
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
                        <div className="card-back">
                            <div className="card-back-inner">
                                <div
                                    className="card-back-background"
                                    style={{
                                        backgroundImage: `url('/assets/card-background.svg')`,
                                    }}
                                />
                                <div
                                    className="card-score"
                                    onClick={(e) => handleUpdateScore(e, i)}
                                >
                                    <span>{player.wins}</span>
                                </div>
                                {recordUpdated && activeCard === player.name ? (
                                    <div className="card-twins">
                                        <div className="card-twins-label">
                                            The Twins ?
                                        </div>
                                        <div className="card-twins-actions">
                                            <div
                                                className="card-twins-no"
                                                onClick={(e) => noTwins(e)}
                                            >
                                                <img src="/assets/cross.svg" />
                                            </div>
                                            <div
                                                className="card-twins-yes"
                                                onClick={(e) => yesTwins(e)}
                                            >
                                                <img src="/assets/tick.svg" />
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Cards;
