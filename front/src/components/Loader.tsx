import { useState, useEffect } from 'react';
import './loader.css'

const messages = [
    'Connecting to server',
    'Loading assets',
    'Generating content',
    'Waiting for AI',
    'Loading',
    'Baking assets',
    'Hacking',
]

const Loader = () => {
    const [currentMessage, setCurrentMessage] = useState(messages[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * (messages.length - 1)) + 1;
            setCurrentMessage(messages[randomIndex]);
        }, 1500);

        return () => clearInterval(intervalId); // Clean up on component unmount
    }, []);

    return(
        <div className="loader">
            <div>
                <div className="spinner"></div>
                <div className="text">{currentMessage}...</div>
                <div className="apo">Since it is prototype, may take a while :(</div>
            </div>
        </div>
    )
}

export default Loader;