import React, { useEffect, useState } from "react";

import "./styles.scss";

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            setTimeout(() => {
                setLoading(false);
            }, 2800);
        }
    }, [loading])

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
        )
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
                {/* <div>wlecome</div> */}
            </div>
            
        </div>
    );
};

export default Home;
