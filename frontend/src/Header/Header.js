import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import './Header.css';
import logo from '../assets/logo.png';
import { Grid, Button, MenuList, Menu, MenuItem } from '@material-ui/core';
import { AuthService } from '../Services';

const Header = ({ authentication, setAuthentication }) => {
    const { t, i18n } = useTranslation('common');

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (event) => {
        setAnchorEl(null);
        switch (event.target.textContent) {
            case t('language.est'):
                i18n.changeLanguage('et');
                break;
            case t('language.eng'):
                i18n.changeLanguage('en');
                break;
            default:
                i18n.changeLanguage('et');
                break;
        }
    };

    return (
        <Grid id="header-container" container direction='row' justify='center' alignItems='center'>
            <Grid item xs={5} id="logo-container">
                <a className='logo-image' href='/'><img className='logo-image' src={logo} alt="Logo"></img></a>
            </Grid>
            <Grid item xs={5}>
                <MenuList className='menu'>
                    <MenuItem component={Link} to='/'>{t('common.home')}</MenuItem>
                    <MenuItem component={Link} to='/otsing'>{t('header.search')}</MenuItem>
                    <MenuItem component={Link} to='/isikud'>{t('common.persons')}</MenuItem>
                    <MenuItem component={Link} to='/viisid'>{t('common.tunes')}</MenuItem>
                    <MenuItem component={Link} to='/klassifikaatorid'>{t('common.classificators')}</MenuItem>
                    {
                        authentication === null ?
                            <MenuItem component={Link} to='/login'>{t('header.login')}</MenuItem> :
                            <>
                                <MenuItem component={Link} to='/' onClick={() => AuthService.Logout(setAuthentication)}>{t('header.logout')}</MenuItem>
                            </>
                    }
                </MenuList>
            </Grid>
            <Grid item xs={2} id="language-container">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                    {t('language.current')}
                </Button>
                <Menu anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                    <MenuItem onClick={handleClose}>{t('language.est')}</MenuItem>
                    <MenuItem onClick={handleClose}>{t('language.eng')}</MenuItem>
                </Menu>
            </Grid>
        </Grid>
    );
};



export default Header;