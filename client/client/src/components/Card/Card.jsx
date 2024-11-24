import React, { useEffect, useState } from 'react';
import hash from "../../assets/hash.png";
import ip from "../../assets/ip.png";
import './Card.css';
import { Link } from 'react-router-dom';
import { ReactTyped } from "react-typed";

const Card = ({ theme, setTheme }) => {
    const toggle_mode = () => {
        theme == 'light' ? setTheme('dark') : setTheme('light');
    }
    return (
        <>
           
            <div className={`tool-heading ${theme}`}>
                <h2>SOC TOOL</h2>
            </div>
            <div className='mainContainer'>
                <div className='box'>
                    <div className='card'>
                        <div className='image'>
                            <img src={hash} alt="" />
                        </div>
                        <div className='desc'>
                            <h1>Coresponding File hash </h1>

                            <p>Checkout corresponding file hash of MD5, SHA1 And SHA256</p>
                        </div>
                    </div>

                    <Link to={"/corresponding-file-hash-checker"} style={{ textDecoration: "none", color: "inherit" }}>
                        <button className='btn btn1' style={{ background: "rgba(154,101,198,1)" }} to="/HashDetail">
                            Analyze
                        </button>
                    </Link>

                </div>
                <div className='box'>
                    <div className='card'>
                        <div className='image'>
                            <img src={ip} alt="" />
                        </div>
                        <div className='desc'>
                            <h1>IP Address Analysis</h1>

                            <p>One stop IPv4 Insights: from multiple threats intel feeds.</p>
                        </div>
                    </div>
                    <Link to={"/ip-reputation-checker-on-multiple-TI"} style={{ textDecoration: "none", color: "inherit" }}>
                        <button className='btn btn1' style={{ background: "rgba(154,101,198,1)" }} to="/ipdetail">
                            Analyze
                        </button>
                    </Link>
                </div>
            
            </div>
        </>

    )
}

export default Card
