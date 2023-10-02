import React, { useEffect, useState } from "react";
import _ from "lodash";

import Cards from "../Cards";
import players from "./data";
import "./styles.scss";

const BASE_ID = process.env.AIRTABLE_BASE_ID;
const TABLE_ID = process.env.AIRTABLE_TABLE_ID;
const TOKEN = process.env.AIRTABLE_ACCESS_TOKEN;

const randomOddEven = () => Math.floor(Math.random() * 10) % 2 === 0;

const Home = () => {
    const [loading, setLoading] = useState(true);
    // const [results, setResults] = useState(null);

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

    // useEffect(() => {
    //     fetch(
    //         `https://api.airtable.com/v0/${BASE_ID}/${TABLE_ID}/listRecords`,
    //         {
    //             headers: {
    //                 Authentication: `Bearer ${TOKEN}`,
    //             },
    //         }
    //     )
    //         .then((response) => response.json())
    //         .then((json) => console.log("json", json))
    //         .catch((error) => console.error(error));
    // }, []);

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 3800);
        }
    }, [loading]);

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
                <Cards allPlayers={allPlayers} />
            </div>
        </div>
    );
};

export default Home;
