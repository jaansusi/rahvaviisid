import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import config from '../../config';
import { Button, Grid } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import PageComponent from '../PageComponent';

const SearchComponent = (props) => {
    const { t } = useTranslation('common');
    let [input, setInput] = useState('');
    let [searchResultsDefault, setSearchResultsDefault] = useState([]);
    let [searchResults, setSearchResults] = useState([]);
    let [isHelpOpen, setIsHelpOpen] = useState(false);

    const fetchData = async () => {
        axios
            .get(config.apiUrl + '/tunes')
            .then((result) => {
                setSearchResults(result.data);
                setSearchResultsDefault(result.data);
            });
    }

    const updateInput = async (input, isReferenceSearch) => {
        const filtered = searchResultsDefault.filter(result => {
            let lowInput = input.toLowerCase();
            if (isReferenceSearch)
                return result.tuneReference?.toLowerCase().includes(lowInput) ||
                    result.textReference?.toLowerCase().includes(lowInput) ||
                    result.soundReference?.toLowerCase().includes(lowInput) ||
                    result.videoReference?.toLowerCase().includes(lowInput);
            return result.tuneReference?.toLowerCase().includes(lowInput) ||
                result.textReference?.toLowerCase().includes(lowInput) ||
                result.soundReference?.toLowerCase().includes(lowInput) ||
                result.videoReference?.toLowerCase().includes(lowInput) ||
                result.catalogue?.toLowerCase().includes(lowInput) ||
                result.remarks?.toLowerCase().includes(lowInput) ||
                result.publications?.toLowerCase().includes(lowInput);
        })
        setInput(input);
        setSearchResults(filtered);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Grid item xs={12} container spacing={2} direction='column'>
            <Grid item container direction='row' alignItems='center' justify='space-between'>
                <Grid item>
                    <SearchBar
                        keyword={input}
                        setKeyword={updateInput}
                    />
                </Grid>
                <Grid item>
                    <Button onClick={() => setIsHelpOpen(!isHelpOpen)} variant='outlined'>{isHelpOpen ? t('search.closeHelp') : t('search.help')}</Button>
                </Grid>
            </Grid>
            {
                isHelpOpen &&
                <Grid item>
                    <PageComponent name='searchHelp' />
                </Grid>
            }
            <Grid item>
                <SearchResults
                    showAll={input.length > 2}
                    assets={searchResults}
                />
            </Grid>
        </Grid>
    );
}

export default SearchComponent;