import { Grid, TextField } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';


const SearchBar = ({ keyword, setKeyword }) => {
  const { t } = useTranslation('common');
  return (
    <Grid item container spacing={2}>
      <Grid item>
        <TextField
          label={t('search.general')}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          variant='outlined' />
      </Grid>
      <Grid item>
        <TextField
          label={t('search.reference')}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          variant='outlined' />
      </Grid>
    </Grid>
  );
}

export default SearchBar;