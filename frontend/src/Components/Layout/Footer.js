import React from 'react';
import { Grid } from '@material-ui/core';
import './Footer.css';
import ekmLogo from '../../assets/ekm-logo.png';
import eraLogo from '../../assets/era-logo.jpg';

const Footer = () => {
    return (
        <Grid
            item
            container
            id='footer-container'
            alignItems='center'
            justify='center'
            direction='row'
        >
            <Grid item>
                <img className='footer-image' src={ekmLogo} alt="Logo"></img>
            </Grid>
            <Grid item>
                <img className='footer-image' src={eraLogo} alt="Logo"></img>
            </Grid>
        </Grid>
    );
};



export { Footer };