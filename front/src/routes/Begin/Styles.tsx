import { Dispatch, SetStateAction } from "react";
import pixar from "../../assets/1.jpg"
import anime from "../../assets/2.jpg"
import old_c from "../../assets/3.jpg"
import old_a from "../../assets/7.jpg"
import bright from "../../assets/4.jpg"
import kawaii from "../../assets/9.jpg"
import drawn from "../../assets/8.jpg"
import modern_c from "../../assets/6.jpg"

const imgs = [
    { name: 'Pixar Cartoon', src: pixar },
    { name: 'Anime', src: anime },
    { name: 'Old Cartoon', src: old_c  },
    { name: 'Old Anime', src:  old_a},
    { name: 'Bright Colors', src:  bright},
    { name: 'Kawaii', src:  kawaii},
    { name: 'Drawn', src:  drawn},
    { name: 'Modern Cartoon', src: modern_c },
];

interface StylesProps {
    setPage: Dispatch<SetStateAction<number>>;
    setSelectedImage: Dispatch<SetStateAction<string>>;
}

const Styles = ({setPage, setSelectedImage}: StylesProps) => {

    const handleClick = (el: string) => {
        localStorage.setItem('style', el)
        setPage(1);
        setSelectedImage(el)
    }

    return (
        <div className="styles">
            <div className="container column">
                <h2>
                    1. Pick a style you like the most
                </h2>
                <div className="imgs row">
                    {imgs.map((el, i) => {
                        return (
                            <div className="img" key={i} onClick={() => handleClick(el.name)}>
                                <div className="name">{el.name}</div>
                                <img src={el.src} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default Styles;