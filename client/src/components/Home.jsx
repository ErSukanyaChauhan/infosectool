import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar';
import Card from './Card/Card';
import './Home.css';
import HashDetail from './Hash/HashDetail';
const Home = () => {
    const current_theme = localStorage.getItem('current_theme');
    const [theme, setTheme] = useState(current_theme ? current_theme : "light");
  
    useEffect(() => {
      localStorage.setItem('current_theme', theme);
    }, [theme])
    return (
        <div className={`container ${theme}`}>
            <Navbar theme={theme} setTheme={setTheme} />
            <Card theme={theme} setTheme={setTheme}/>
            
        </div>
    )
}

export default Home