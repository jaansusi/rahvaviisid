import { TextField } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';


const SearchBar = ({keyword,setKeyword}) => {
    const { t } = useTranslation('common');
    return (
      <TextField
        label={t('search.reference')} 
        value={keyword} 
        onChange={(e) => setKeyword(e.target.value)} 
        variant='outlined' />
    );
  }

export default SearchBar;