import axios from 'axios';
import React, {useState, useEffect, useMemo} from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import config from '../../config';
import {Button, Grid} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import PageComponent from '../PageComponent';
import debounce from 'lodash.debounce';

const SearchComponent = () => {

    const {t} = useTranslation('common');

    const [input, setInput] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isHelpOpen, setIsHelpOpen] = useState(false);
    const [isSearching, setIsSearching] = useState(false);

    const fetchData = async (q, isReferenceSearch) => {

        const url = `${config.apiUrl}/tunes/search?q=${q}&type=${isReferenceSearch ? 'reference' : 'full'}`;

        setIsSearching(true);
        axios.get(url)
            .then(result => {
                setSearchResults(result.data)
            })
            .catch(err => {
                console.error('Search error', err)
            })
            .finally(() => setIsSearching(false));
    };

    const handleInputChange = (value, isReferenceSearch) => {
        setInput(value);
        debouncedFetch(value, isReferenceSearch);
    };

    const debouncedFetch = useMemo(() => debounce(fetchData, 300), []);
    
    useEffect(() => {
        return () => {
            debouncedFetch.cancel();
        };
    }, [debouncedFetch]);
    
    return (
        <Grid item xs={12} container spacing={2} direction='column'>
            <Grid item container direction='row' alignItems='center' justify='space-between'>
                <Grid item>
                    <SearchBar
                        keyword={input}
                        setKeyword={handleInputChange}
                    />
                </Grid>
                <Grid item>
                    <Button onClick={() => setIsHelpOpen(!isHelpOpen)}
                            variant='outlined'>{isHelpOpen ? t('search.closeHelp') : t('search.help')}</Button>
                </Grid>
            </Grid>
            {
                isHelpOpen &&
                <Grid item>
                    <PageComponent name='searchHelp'/>
                </Grid>
            }
            <Grid item>
                <SearchResults
                    isSearching={isSearching}
                    showAll={input.length > 2}
                    assets={searchResults}
                />
            </Grid>
        </Grid>
    );
}

export default SearchComponent;