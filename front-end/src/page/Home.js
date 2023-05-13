import React from 'react';
import '../components/style/Home.css'
import ListServeures from '../components/ListServeures';

const Home = () => {
    return (
        <div className="center-container">
            <div className="center-content">
                <ListServeures />
            </div>
        </div>
    );
}

export default Home;
