import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import './Header.css';

const Header = (() => {
    const { t, i18n } = useTranslation('common');
    return (
        <div id="header-container">
            <div className="language-container">
                <button onClick={() => i18n.changeLanguage('et')}>est</button>
                <button onClick={() => i18n.changeLanguage('en')}>eng</button>
            </div>
            <div className="link-container">
                <div className="header-link">
                    <Link to="/">{t('common.home')}</Link>
                </div>
                <div className="header-link">
                    <Link to="/persons">{t('common.persons')}</Link>
                </div>
                <div className="header-link">
                    <Link to="/tunes">{t('common.tunes')}</Link>
                </div>
                <div className="header-link">
                    <Link to="/classificators">{t('common.classificators')}</Link>
                </div>
            </div>
        </div>
    );
});

export default Header;