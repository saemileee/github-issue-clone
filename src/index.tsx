import React from 'react';
import ReactDOM from 'react-dom/client';
import {Router} from './Router';
import {RouterProvider} from 'react-router-dom';
import {RecoilRoot} from 'recoil';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    // <React.StrictMode>
    <RecoilRoot>
        <RouterProvider router={Router} />
    </RecoilRoot>
    // </React.StrictMode>
);
