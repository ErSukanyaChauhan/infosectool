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

    const [ipAddress, setIPAddress] = useState('');
    const [ipAddressDetail, setIPAddressDetail] = useState();

    async function getIpAddressDetail() {
        let API_KEY = 'at_ee0DbtYNoQyRDUn0Fipqwfau5tWzE';
        const response = await fetch(
            `https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=${API_KEY}&ipAddress=${ipAddress}`,
            {
                method: 'GET',

            }
        );
        const result = await response.json();
        setIPAddressDetail(result);
        console.log(result);
    }

    useEffect(() => {
        getIpAddressDetail(); // Get IP and Location data whenever the page (component) loads.
    }, [ipAddress]);
    console.log("ipaddress", ipAddress);

    const typedString = `Hey there <b>${ipAddressDetail ? ipAddressDetail.ip : "Not found"}</b>,<br/> <br/> Welcome to InfoSecTools! We're excited to have you here. Here’s some cool info about your connection:<br/><br/>
    <b>ISP: ${ipAddressDetail?.isp || "N/A"}</b> | 
    <b>Location: ${ipAddressDetail?.location?.country || "N/A"}</b> | 
    <b>City: ${ipAddressDetail?.location?.city || "N/A"}</b> |
    <b>Region: ${ipAddressDetail?.location?.region || "N/A"}</b> |
    <b>Time Zone: ${ipAddressDetail?.location?.timezone || "N/A"}</b><br/><br/>
    Feel free to explore our site and discover how we can help you stay secure online. If you need anything, just give us a shout!
    <br/> Cheers!`;

    return (
        <>
            <div className={`ip-header ${theme}`}>

                <ReactTyped
                    strings={[typedString]}
                    typeSpeed={5}
                />
            </div>
            <div className={`tool-heading ${theme}`}>
                <h2>SEC TOOL</h2>
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

                    <Link to={"/correspondinghash"} style={{ textDecoration: "none", color: "inherit" }}>
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
                    <Link to={"/ip-reputation"} style={{ textDecoration: "none", color: "inherit" }}>
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
