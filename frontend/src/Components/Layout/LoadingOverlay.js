import React from 'react';
import {Backdrop, CircularProgress} from "@mui/material";

const LoadingOverlay = ({show}) => {

    return (
        <Backdrop
            open={show}
            sx={{
                position: 'absolute',
                zIndex: 1,
                bgcolor: 'rgba(255, 255, 255, 0.5)',
            }}
        >
            <CircularProgress/>
        </Backdrop>
    );
};

export {LoadingOverlay};