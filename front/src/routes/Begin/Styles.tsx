import { Dispatch, SetStateAction } from "react";

const imgs = [
    { name: 'Pixar', src: '1.jpg' },
    { name: 'Anime', src: '2.jpg' },
    { name: 'Old Cartoon', src: '3.jpg' },
    { name: 'Old Anime', src: '7.jpg' },
    { name: 'Bright', src: '4.jpg' },
    { name: 'Kawaii', src: '9.jpg' },
    { name: 'Drawn', src: '8.jpg' },
    { name: 'Modern Cartoon', src: '6.jpg' },
];

interface StylesProps {
    setPage: Dispatch<SetStateAction<number>>;
    setSelectedImage: Dispatch<SetStateAction<string>>;
}

const Styles = ({setPage, setSelectedImage}: StylesProps) => {
    return (
        <div className="styles">
            <div className="container column">
                <h2>
                    1. Pick a style you like the most
                </h2>
                <div className="imgs row">
                    {imgs.map((el, i) => {
                        return (
                            <div className="img" key={i} onClick={() => {setPage(1); setSelectedImage(el.name);}}>
                                <div className="name">{el.name}</div>
                                <img src={`./src/assets/${el.src}`} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Styles;