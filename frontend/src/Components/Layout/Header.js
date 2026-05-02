import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, MenuItem } from '@mui/material';
import { AuthService } from '../../Services';
import { tokens as C } from '../../theme';
import logo from '../../assets/logo.png';
import './Header.css';

const NavLink = ({ to, label, active, onClick, asButton }) => {
    const [hov, setHov] = useState(false);
    const color = active ? C.accent : (hov ? C.text : C.muted);
    const sharedStyle = {
        fontFamily: 'Inter, sans-serif',
        fontSize: 13.5,
        fontWeight: active ? 500 : 400,
        color,
        textDecoration: 'none',
        padding: '0 14px',
        height: 64,
        display: 'flex',
        alignItems: 'center',
        borderBottom: active ? `2px solid ${C.accent}` : '2px solid transparent',
        transition: 'color 0.15s, border-color 0.15s',
        letterSpacing: '0.01em',
        userSelect: 'none',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    };
    if (asButton) {
        return (
            <button
                type="button"
                onClick={onClick}
                onMouseEnter={() => setHov(true)}
                onMouseLeave={() => setHov(false)}
                style={{ ...sharedStyle, borderTop: 'none', borderLeft: 'none', borderRight: 'none' }}
            >
                {label}
            </button>
        );
    }
    return (
        <Link
            to={to}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={sharedStyle}
        >
            {label}
        </Link>
    );
};

const isActive = (pathname, target) => {
    if (target === '/') return pathname === '/';
    return pathname === target || pathname.startsWith(target + '/');
};

const Header = ({ authentication, setAuthentication }) => {
    const { t, i18n } = useTranslation('common');
    const { pathname } = useLocation();
    const [langAnchorEl, setLangAnchorEl] = useState(null);
    const [haldaAnchorEl, setHaldaAnchorEl] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditor, setIsEditor] = useState(false);

    useEffect(() => {
        setIsAdmin(AuthService.CanAccess(['admin']));
        setIsEditor(AuthService.CanAccess(['editor', 'admin']));
    }, [authentication]);

    const handleLangClick = (event) => setLangAnchorEl(event.currentTarget);
    const handleLangClose = (event) => {
        setLangAnchorEl(null);
        switch (event.target.textContent) {
            case t('language.est'): i18n.changeLanguage('et'); break;
            case t('language.eng'): i18n.changeLanguage('en'); break;
            default: break;
        }
    };

    const handleHaldaClick = (event) => setHaldaAnchorEl(event.currentTarget);
    const handleHaldaClose = () => setHaldaAnchorEl(null);

    const links = [
        { to: '/otsi/viisid', label: t('header.searchTunes') },
        { to: '/otsi/isikud', label: t('header.searchPersons') },
    ];

    return (
        <nav className="nora-nav">
            <div className="nora-nav__inner">
                <Link to="/" className="nora-nav__logo" aria-label="NORA">
                    <img src={logo} alt="NORA" className="nora-nav__logo-img" />
                </Link>
                <div className="nora-nav__links">
                    {links.map((l) => (
                        <NavLink key={l.to} to={l.to} label={l.label} active={isActive(pathname, l.to)} />
                    ))}
                    {isEditor && (
                        <>
                            <NavLink
                                asButton
                                onClick={handleHaldaClick}
                                label={t('header.halda')}
                                active={isActive(pathname, '/halda')}
                            />
                            <Menu
                                id="halda-menu"
                                anchorEl={haldaAnchorEl}
                                keepMounted
                                open={Boolean(haldaAnchorEl)}
                                onClose={handleHaldaClose}
                            >
                                <MenuItem
                                    component={Link}
                                    to="/halda/klassifikaatorid"
                                    onClick={handleHaldaClose}
                                >
                                    {t('common.classifiers')}
                                </MenuItem>
                                {isAdmin && (
                                    <MenuItem
                                        component={Link}
                                        to="/halda/kasutajad"
                                        onClick={handleHaldaClose}
                                    >
                                        {t('header.users')}
                                    </MenuItem>
                                )}
                            </Menu>
                        </>
                    )}
                </div>
                <div className="nora-nav__right">
                    {authentication === null ? (
                        <Link
                            to="/login"
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: 13.5,
                                color: C.muted,
                                textDecoration: 'none',
                                padding: '0 6px',
                            }}
                        >
                            {t('header.login')}
                        </Link>
                    ) : (
                        <Link
                            to="/"
                            onClick={() => AuthService.Logout(setAuthentication)}
                            style={{
                                fontFamily: 'Inter, sans-serif',
                                fontSize: 13.5,
                                color: C.muted,
                                textDecoration: 'none',
                                padding: '0 6px',
                            }}
                        >
                            {t('header.logout')}
                        </Link>
                    )}
                    <button
                        type="button"
                        onClick={handleLangClick}
                        aria-controls="language-menu"
                        aria-haspopup="true"
                        className="nora-nav__lang"
                    >
                        {t('language.current')}
                    </button>
                    <Menu id="language-menu" anchorEl={langAnchorEl} keepMounted open={Boolean(langAnchorEl)} onClose={handleLangClose}>
                        <MenuItem onClick={handleLangClose}>{t('language.est')}</MenuItem>
                        <MenuItem onClick={handleLangClose}>{t('language.eng')}</MenuItem>
                    </Menu>
                </div>
            </div>
        </nav>
    );
};

export { Header };
