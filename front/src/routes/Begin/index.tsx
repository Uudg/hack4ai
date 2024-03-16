import Styles from "./Styles";
import Person from "./Person";
import Document from "../../components/Document";
import './index.css';
import {useState} from "react"

const Begin = () => {
    const [page, setPage] = useState(0);
    const [selectedImage, setSelectedImage] = useState('');
    const [personData, setPersonData] = useState({name: '', age: '', gender: ''});

    return(
        <>
            {page === 0 ? <Styles setPage={setPage} setSelectedImage={setSelectedImage}/> : 
             page === 1 ? <Person selectedImage={selectedImage} setPage={setPage} setPersonData={setPersonData}/> : 
             <Document personData={personData}/>}
        </>
    )
}

export default Begin;