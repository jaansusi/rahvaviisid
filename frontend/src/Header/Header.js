import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import './Header.css';
import logo from '../assets/logo.png';

const Header = (() => {
    const { t, i18n } = useTranslation('common');
    let [langOptionsVisible, setLangOptionsVisible] = useState(false);
    const ToggleLanguages = (() => {
        setLangOptionsVisible(!langOptionsVisible);
        console.log(langOptionsVisible);
    });
    return (
        <div id="header-container">
            <div id="logo-container">
                <a href="/"><img src={logo} alt="Logo"></img></a>
            </div>
            <div id="link-container">
                <Link className="header-link" to="/">{t('common.home')}</Link>
                <Link className="header-link" to="/isikud">{t('common.persons')}</Link>
                <Link className="header-link" to="/viisid">{t('common.tunes')}</Link>
                <Link className="header-link" to="/klassifikaatorid">{t('common.classificators')}</Link>
            </div>
            <div id="language-container">
                <button className="select-language" onClick={ToggleLanguages}>{t('language.current')}</button>
                <div id="language-choices" className={langOptionsVisible ? "visible" : "hidden"}>
                    <button className="language-button" onClick={() => i18n.changeLanguage('et')}>{t('language.est')}</button>
                    <button className="language-button" onClick={() => i18n.changeLanguage('en')}>{t('language.eng')}</button>
                </div>
            </div>
        </div>
    );
});



export default Header;