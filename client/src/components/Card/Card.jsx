import React, { useEffect, useState } from 'react';
import hash from "../../assets/hash.png";
import ip from "../../assets/ip.png";
import domain from "../../assets/domain.svg";
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
                            <h1>File Hash Analysis </h1>

                            <p>Checkout Corresponding File hash and Their Reputation i.e. MD5, SHA1 & SHA256</p>
                        </div>
                    </div>

                    <Link to={"/multiple-hash-reputation-checker"} style={{ textDecoration: "none", color: "inherit" }}>
                        <button className='btn btn1' style={{ background: "rgb(98, 0, 234)" }} to="/HashDetail">
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

                            <p>Checkout Reputation of Multiple IPv4 Address.</p>
                        </div>
                    </div>
                    <Link to={"/multiple-ip-reputation-checker"} style={{ textDecoration: "none", color: "inherit" }}>
                        <button className='btn btn1' style={{ background: "rgb(98, 0, 234)" }} to="/ipdetail">
                            Analyze
                        </button>
                    </Link>
                </div>

                <div className='box'>
                    <div className='card'>
                        <div className='image'>
                            <img src={domain} alt="" />
                        </div>
                        <div className='desc'>
                            <h1>Domain-URLs Analysis</h1>

                            <p>Checkout Reputation of Multiple Domains & URLs.</p>
                        </div>
                    </div>
                    <Link to={"/multiple-url-reputation-checker"} style={{ textDecoration: "none", color: "inherit" }}>
                        <button className='btn btn1' style={{ background: "rgb(98, 0, 234)" }} to="/Domaindetail">
                            Analyze
                        </button>
                    </Link>
                </div>
            
            </div>
        </>

    )
}

export default Card
