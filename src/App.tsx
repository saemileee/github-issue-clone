import React from 'react';
import {Outlet} from 'react-router-dom';
import Header from './componenets/Header';

const App = () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    );
};

export default App;
