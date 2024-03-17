import './index.css'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import img1 from "../../assets/1.jpg"
import img2 from "../../assets/2.jpg"
import img3 from "../../assets/3.jpg"
import img4 from "../../assets/4.jpg"
import img5 from "../../assets/5.jpg"
import img6 from "../../assets/6.jpg"
import img7 from "../../assets/7.jpg"
import img8 from "../../assets/8.jpg"
import img9 from "../../assets/9.jpg"
import img10 from "../../assets/10.jpg"
import img11 from "../../assets/11.jpg"

const Welcome = () => {
    const images = [
        img1,
        img2,
        img3,
        img4,
        img5,
        img6,
        img7,
        img8,
        img9,
        img10,
        img11
    ]

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
                        const image = images[imageIndex - 1];
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