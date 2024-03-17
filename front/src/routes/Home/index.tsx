import { useLocation, useNavigate } from "react-router-dom";
import Document from "../../components/Document";

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const index = location.state?.index;
    const documents = JSON.parse(localStorage.getItem('documents') || '[]');

    if (index === undefined || documents.length === 0) {
        navigate('/new');
    }

    const document = documents[index];

    return(
        <div className="view">
            {document && (
                // Add a key prop to the Document component
                <Document key={index} image={document.image} title={document.title} body={document.body} index={index} />
            )}
        </div>
    )
}

export default Home;