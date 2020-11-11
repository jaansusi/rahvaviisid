import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';

const Header = (() => {
    return (
        <div id="header-container">
            <div className="header-link">
                <Link to="/">Home</Link>
            </div>
            <div className="header-link">
                <Link to="/persons">Isikud</Link>
            </div>
            <div className="header-link">
                <Link to="/tunes">Viisid</Link>
            </div>
        </div>
    );
});

export default Header;