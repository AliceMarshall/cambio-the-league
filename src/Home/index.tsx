import React, { useEffect, useState } from "react";
import Airtable from "airtable";
import _ from "lodash";

import Cards from "../Cards";
import players, { Player } from "./data";
import "./styles.scss";

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;
const GIPHY_KEY = process.env.GIPHY_API_KEY;

Airtable.configure({
    endpointUrl: "https://api.airtable.com",
    apiKey: TOKEN,
});

const base = Airtable.base(BASE_ID || "");

const randomOddEven = () => Math.floor(Math.random() * 10) % 2 === 0;

const setPlayersList = () => {
    const allPlayers = _.shuffle(players);
    allPlayers.forEach((player) => {
        const color = randomOddEven() ? "red" : "black";
        player.color = color;
        player.suit =
            color === "red"
                ? randomOddEven()
                    ? "hearts"
                    : "diamonds"
                : randomOddEven()
                ? "spades"
                : "clubs";
    });
    return allPlayers;
};

export interface Record {
    id: string;
    name: string;
    wins: number;
}

const Home = () => {
    const [loading, setLoading] = useState(true);
    const [results, setResults] = useState<Record[] | null>(null);
    const [players, setPlayers] = useState<Player[] | null>(null);
    const [activeCard, setActiveCard] = useState("");
    const [recordUpdated, setRecordUpdated] = useState(false);
    const [surpriseImage, setSurpriseImage] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        if (!players) {
            setPlayers(setPlayersList());
        }
    }, []);

    useEffect(() => {
        base("League Results")
            .select({
                maxRecords: 3,
                view: "Grid view",
            })
            .eachPage(
                (records) => {
                    const recordsData = records.map((record) => {
                        return {
                            id: record.id,
                            name: record.get("Name") as string,
                            wins: record.get("Wins") as number,
                        };
                    });
                    setResults(recordsData);
                },
                (err) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                }
            );
    }, []);

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 3800);
        }
    }, [loading]);

    const updateScore = (id: string, name: string, newScore: number) => {
        base("League Results").update(
            [
                {
                    id: id,
                    fields: {
                        Name: name,
                        Wins: newScore,
                    },
                },
            ],
            (err, records) => {
                if (err) {
                    console.error(err);
                    return;
                }

                if (records?.length && records?.length > 0) {
                    const recordsData = results?.map((result) => {
                        if (result.id === id) {
                            return {
                                ...result,
                                wins: records[0].get("Wins") as number,
                            };
                        }
                        return result;
                    });
                    if (recordsData) {
                        setResults(recordsData);
                        setRecordUpdated(true);
                    }
                }
            }
        );
    };

    const unsetRecordUpdated = () => {
        setRecordUpdated(false);
    };

    const getSurprise = async () => {
        const res = await fetch(
            `https://api.giphy.com/v1/gifs/random?api_key=${GIPHY_KEY}&tag=@theoffice`
        ).then((response) => {
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        });

        setSurpriseImage(res.data.images.original.url || "");
        setOpenModal(true);
    };

    const closeModal = () => {
        setOpenModal(false);
        unsetRecordUpdated();
        setActiveCard("");
    };

    if (loading) {
        return (
            <div className="home-loader">
                <div className="home-loader-wrapper">
                    <span className="letter letter-c">C</span>
                    <span className="letter letter-a">a</span>
                    <span className="letter letter-m">m</span>
                    <span className="letter letter-b">b</span>
                    <span className="letter letter-i">i</span>
                    <span className="letter letter-o">o</span>
                </div>
                <div className="home-loader-block" />
            </div>
        );
    }

    return (
        <div className="home">
            <div className="home-title">
                <span className="home-title-letter letterC">C</span>
                <span className="home-title-letter lettera">a</span>
                <span className="home-title-letter letterm">m</span>
                <span className="home-title-letter letterb">b</span>
                <span className="home-title-letter letteri">i</span>
                <span className="home-title-letter lettero">o</span>
            </div>
            <div className="home-body">
                {players && results ? (
                    <Cards
                        allPlayers={players}
                        results={results}
                        activeCard={activeCard}
                        setActiveCard={setActiveCard}
                        updateScore={updateScore}
                        recordUpdated={recordUpdated}
                        unsetRecordUpdated={unsetRecordUpdated}
                        getSurprise={getSurprise}
                    />
                ) : null}
            </div>
            {openModal && (
                <div className="modal-background">
                    <div className="modal-foreground">
                        <div className="modal-image">
                            <div className="modal-close" onClick={closeModal}>
                                <img src="/assets/cross.svg" />
                            </div>
                            <img className="modal-img" src={surpriseImage} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
