import React from 'react';
import './Navbar.css';
import infosec_logo from '../../assets/infosec_logo.png';
import { Link } from 'react-router-dom';

const Navbar = ({ theme, setTheme }) => {
    // Toggle theme function
    const handleSwitchChange = (event) => {
        setTheme(event.target.checked );
    };
    return (
        <div className="navbar">
            <Link to="/">
                <div className="sub-navbar">
                    <img src={infosec_logo} alt="Logo" className="logo" />
                </div>
            </Link>

            <ul>
            <Link to="/"> <li>Home</li></Link>
            <Link to="/about-us"><li>About</li></Link>
            <Link to="/contact-us"><li>Contact  </li></Link> 
            </ul>

        </div>
    );
};

export default Navbar;
