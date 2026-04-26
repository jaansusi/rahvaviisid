import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, MenuItem } from '@mui/material';
import { AuthService } from '../../Services';
import { tokens as C } from '../../theme';
import logo from '../../assets/logo.png';
import './Header.css';

const NavLink = ({ to, label, active }) => {
    const [hov, setHov] = useState(false);
    const color = active ? C.accent : (hov ? C.text : C.muted);
    return (
        <Link
            to={to}
            onMouseEnter={() => setHov(true)}
            onMouseLeave={() => setHov(false)}
            style={{
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
            }}
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
    const [anchorEl, setAnchorEl] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(AuthService.CanAccess(['admin']));
    }, [authentication]);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = (event) => {
        setAnchorEl(null);
        switch (event.target.textContent) {
            case t('language.est'): i18n.changeLanguage('et'); break;
            case t('language.eng'): i18n.changeLanguage('en'); break;
            default: break;
        }
    };

    const links = [
        { to: '/', label: t('common.home') },
        { to: '/otsing', label: t('header.search') },
        { to: '/viisid', label: t('common.tunes') },
        { to: '/isikud', label: t('common.persons') },
        { to: '/klassifikaatorid', label: t('common.classifiers') },
    ];
    if (isAdmin) {
        links.push({ to: '/kasutajad', label: t('header.users') });
    }

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
                        onClick={handleClick}
                        aria-controls="language-menu"
                        aria-haspopup="true"
                        className="nora-nav__lang"
                    >
                        {t('language.current')}
                    </button>
                    <Menu id="language-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={handleClose}>{t('language.est')}</MenuItem>
                        <MenuItem onClick={handleClose}>{t('language.eng')}</MenuItem>
                    </Menu>
                </div>
            </div>
        </nav>
    );
};

export { Header };
