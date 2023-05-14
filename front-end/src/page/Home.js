import React from 'react';
import '../components/style/Home.css'
import ListServeures from '../components/ListServeures';
import BackgrounAN from './BackgrounAN';

const Home = () => {
    return (

        <div >
            <ListServeures />
            <BackgrounAN />
        </div>

    );
}

export default Home;
