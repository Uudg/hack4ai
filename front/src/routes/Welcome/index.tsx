import './index.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Welcome = () => {
    const images = Array.from({ length: 11 }, (_, i) => `./src/assets/${i + 1}.jpg`);

    const [width, setWdith] = useState(Math.ceil(window.innerWidth / 200))
    const [height, setHeight] = useState(Math.ceil(window.innerHeight / 200))
    // const [time, setTime] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            setWdith(Math.ceil(window.innerWidth / 200));
            setHeight(Math.ceil(window.innerHeight / 200));
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setTime(prevTime => prevTime + 1);
    //     }, 2000); // Change every second

    //     return () => {
    //         clearInterval(interval);
    //     }
    // }, []);
    

    return(
        <div className="welcome">
            <div className="bg column">
                {Array.from({ length: height }, (_, i) => (
                <div key={i} className="row">
                    {Array.from({ length: width }, (_, k) => {
                        // if (Math.random() < 0.25) return <div className="img"></div>;
                        const imageIndex = ((k + i * width) % images.length) + 1;
                        const image = `./src/assets/${imageIndex}.jpg`;
                        return (
                            <div key={k} className="img">
                                <img src={image} alt="" />
                            </div>
                        );
                    })}
                </div>
            ))}
            </div>
            <div className="container column">
                <div className='column'>
                    <h1>
                        emotory
                    </h1>
                    <div className='sub'>
                        Bring your emotions into a story
                    </div>
                </div>
                <Link to="/begin">
                    Create your first Story
                </Link>
            </div>
        </div>
    )
}

export default Welcome;