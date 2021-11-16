
import React from 'react';

import { Link } from 'react-router-dom';

const Home = () => {

    return (
        <div>
            <li><Link to={"/main"}>Main Page</Link></li>
            <li><Link to={"/simulation"}>Simulation History Page</Link></li>
        </div>
    );
    
}

export default Home;