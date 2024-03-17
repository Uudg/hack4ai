import {createBrowserRouter} from 'react-router-dom'
import Welcome from './routes/Welcome';
import Home from './routes/Home';
import App from './App';
import Begin from "./routes/Begin";
import Document from './components/Document';
import Moodboard from './routes/Moodboard';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Welcome/>,   
    },
    {
        path: '/begin',
        element: <Begin/>
    },
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '/home',
                element: <Home/>
            },
            {
                path: '/new',
                element:
                <div className="view">
                    <Document image={null} body={null} title={null} index={null}/>
                </div>                 
            },
            {
                path: '/mood',
                element: 
                 <div className="view">
                    <Moodboard/>    
                </div>   
            }
        ]
    },
])

export default router;