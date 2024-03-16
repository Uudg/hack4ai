import {createBrowserRouter} from 'react-router-dom'
import Welcome from './routes/Welcome';
import Home from './routes/Home';
import App from './App';
import Begin from './routes/Begin';
import Document from './components/Document';

const router = createBrowserRouter([
    {
        path: '/welcome',
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
            }
        ]
    },
])

export default router;