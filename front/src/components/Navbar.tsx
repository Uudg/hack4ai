import { useNavigate } from "react-router-dom";
import './other.css'

interface Document {
    title: string,
    body: string,
    image: string
}

const Navbar = () => {
    const documents: Document[] = JSON.parse(localStorage.getItem('documents') || '[]');
    const navigate = useNavigate();

    const handleClick = (index: number) => {
        navigate('/home', { state: { index } });
    }

    const handleNewClick = () => {
        navigate('/new');
    }

    return (
        <div className="navbar column">
            <div className="logo">
                emotory
            </div>
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