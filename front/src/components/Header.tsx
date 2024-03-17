import { useNavigate } from "react-router-dom";
import click from '../assets/click.svg';
import profile from '../assets/click.svg';

const Header = () => {
    const navigate = useNavigate();
    const openMoodboard = () => navigate('/mood');
    return(
        <header>
            <div className="row header">
                <div className="mood-link" onClick={openMoodboard}>
                    Moodboard
                    <img src={click} alt="" />
                </div>
                <div className="logo" onClick={() => navigate('/')}>emotory</div>
                <div className="name">{localStorage.getItem('name')}
                <img src={profile} alt="" />
                </div>
            </div>
        </header>
    )
}

export default Header;