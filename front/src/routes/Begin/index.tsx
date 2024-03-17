import { SetStateAction, useState } from "react";
import { useNavigate } from "react-router-dom";
import Styles from "./Styles";
import Person from "./Person";
import './index.css';

const Begin = () => {
    const [page, setPage] = useState(0);
    const [selectedImage, setSelectedImage] = useState('');
    const [, setPersonData] = useState({name: '', age: '', gender: ''});
    const navigate = useNavigate();

    const nextPage = (newPage: SetStateAction<number>) => {
        setPage(newPage);
        if (newPage === 1) {
        } else if (newPage === 2) {
            navigate('/new');
        }
    };

    return(
        <>
            {page === 0 ? <Styles setPage={nextPage} setSelectedImage={setSelectedImage}/> : 
             page === 1 ? <Person selectedImage={selectedImage} setPage={nextPage} setPersonData={setPersonData}/> : null}
        </>
    )
}

export default Begin;