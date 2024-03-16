import {Outlet} from "react-router-dom"
import Navbar from "./components/Navbar";
import './App.css'
import Header from "./components/Header";

const App = () => {
    return (
        <>  
            <Header/>
            <Navbar/>
            <Outlet/>
        </>
    )
}

export default App
