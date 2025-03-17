import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalProvider } from './GLOBAL/Global';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalProvider>
            <App />
    </GlobalProvider>
);