import {Checkbox, FormControlLabel, Grid, TextField} from '@mui/material';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ClearSearchButton from "./ClearSearchButton";

const SearchBar = ({keyword, setKeyword}) => {
    
    const {t} = useTranslation('common');
    
    const [referenceSearch, setReferenceSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState(keyword);

    const handleClear = () => {
        setSearchTerm("");
        setKeyword("");
    }

    useEffect(() => {
        setKeyword(searchTerm, referenceSearch);
    }, [searchTerm, referenceSearch])

    return (
        <Grid item container direction='row' alignItems='center' spacing={2}>
            <Grid item>
                <TextField
                    label={t('search.general')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    variant='outlined'
                    InputProps={{
                        endAdornment: <ClearSearchButton show={searchTerm} onClick={handleClear}/>
                    }}/>

            </Grid>
            <Grid item>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={referenceSearch}
                            value={referenceSearch}
                            name='test'
                            onChange={(e) => {
                                setReferenceSearch(e.target.checked)
                            }}
                            color="primary"
                        />
                    }
                    label={t('search.referenceOnly')}
                />
            </Grid>
        </Grid>
    );
}

export default SearchBar;