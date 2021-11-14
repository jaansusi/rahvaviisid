import { Checkbox, FormControlLabel, Grid, TextField } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';


const SearchBar = ({ keyword, setKeyword }) => {
  const { t } = useTranslation('common');
  let [referenceSearch, setReferenceSearch] = useState(false);
  let [searchTerm, setSearchTerm] = useState(keyword);

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
          variant='outlined' />

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