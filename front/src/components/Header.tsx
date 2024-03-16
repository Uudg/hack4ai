const Header = () => {
    return(
        <header>
            <div className="row header">
                <div className="name">{localStorage.getItem('name')}
                <img src="./src/assets/profile.svg" alt="" />
                </div>
            </div>
        </header>
    )
}

export default Header;