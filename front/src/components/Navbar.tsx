import {useNavigate } from "react-router-dom";
import { useState } from "react";
import './other.css'

interface Document {
    title: string,
    body: string,
    image: string
}

const Navbar = () => {
    const [isActive, setIsActive] = useState(false);
    const documents: Document[] = JSON.parse(localStorage.getItem('documents') || '[]');
    const navigate = useNavigate();

    const handleClick = (index: number) => {
        navigate('/home', { state: { index } });
    }

    const handleNewClick = () => {
        navigate('/new');
        setIsActive(!isActive);
    }

    const handleNavToggle = () => {
        setIsActive(!isActive);
    }

    const handleBgClick = () => {
        setIsActive(false);
    }

    return (
        <div className="navbar column">
            <div className="mobile-nav-btn" onClick={handleNavToggle}>
                <img src={"./src/assets/menu.svg"} alt="" />
            </div>
            <div className={`mobile-nav ${isActive ? 'active' : ''}`}>
                <div className="bg" onClick={handleBgClick}></div>
                <button onClick={() => {navigate('/mood'); setIsActive(false);}}>Moodboard</button>
                <button onClick={handleNewClick}>New Document</button>
                {documents.map((document: Document, index: number) => (
                <button key={index} onClick={() => handleClick(index)}>
                    {document.title}
                </button>
            ))}
            </div>
            <div className="logo" onClick={() => {navigate('/')}}>
                emotory
            </div>
            <hr />
            {documents.map((document: Document, index: number) => (
                <button key={index} onClick={() => handleClick(index)}>
                    {document.title}
                </button>
            ))}
            <button className="new" onClick={handleNewClick}>New Document</button>
        </div>
    )
}

export default Navbar;