import React from 'react';
import ekmLogo from '../../assets/ekm-logo.png';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="nora-footer">
            <div className="nora-footer__inner">
                <div className="nora-footer__brand">
                    <img src={ekmLogo} alt="Eesti Kirjandusmuuseum" className="nora-footer__brand-img" />
                </div>
                <span className="nora-footer__credit">
                    Eesti Rahvaviiside Andmebaas NORA · Tartu, 2021
                </span>
            </div>
        </footer>
    );
};

export { Footer };
