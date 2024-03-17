import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();
    const openMoodboard = () => navigate('/mood');
    return(
        <header>
            <div className="row header">
                <div className="mood-link" onClick={openMoodboard}>
                    Moodboard
                    <img src="./src/assets/click.svg" alt="" />
                </div>
                <div className="logo" onClick={() => navigate('/')}>emotory</div>
                <div className="name">{localStorage.getItem('name')}
                <img src="./src/assets/profile.svg" alt="" />
                </div>
            </div>
        </header>
    )
}

export default Header;