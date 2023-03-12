import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '../node_modules/react-bootstrap/dist/react-bootstrap'; 
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import App from "./App";
import {UserContextProvider} from './store/UserContext';
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<UserContextProvider><BrowserRouter><App /></BrowserRouter></UserContextProvider>);