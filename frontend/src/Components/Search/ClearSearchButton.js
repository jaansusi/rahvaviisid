import React from 'react';
import {useTranslation} from 'react-i18next';
import {IconButton, InputAdornment} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const ClearSearchButton = ({show, onClick}) => {

    const {t} = useTranslation('common');

    return (
        <InputAdornment position="end">
            <IconButton
                aria-label={t("search.clear")}
                title={t("search.clear")}
                onClick={onClick}
                edge="end"
                size="small"
                style={{visibility: show ? "visible" : "hidden"}}
            >
                <ClearIcon/>
            </IconButton>
        </InputAdornment>
    );
}

export default ClearSearchButton;