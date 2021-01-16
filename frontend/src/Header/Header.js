import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import './Header.css';
import logo from '../assets/logo.png';
import { Grid, Button, MenuList, Menu, MenuItem } from '@material-ui/core';

const Header = (() => {
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
        <Grid id="header-container" container direction='row'>
            <Grid xs={5} id="logo-container">
                <a href="/"><img src={logo} alt="Logo"></img></a>
            </Grid>
            <Grid xs={5} direction='row' container justify='center' alignItems='center'>
                <MenuList className='menu'>
                    <MenuItem component={Link} to='/'>{t('common.home')}</MenuItem>
                    <MenuItem component={Link} to='/isikud'>{t('common.persons')}</MenuItem>
                    <MenuItem component={Link} to='/viisid'>{t('common.tunes')}</MenuItem>
                    <MenuItem component={Link} to='/klassifikaatorid'>{t('common.classificators')}</MenuItem>
                </MenuList>
            </Grid>
            <Grid xs={2} direction='row' container justify='center' alignItems="center" id="language-container">
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
});



export default Header;