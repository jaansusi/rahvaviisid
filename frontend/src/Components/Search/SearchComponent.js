import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import config from '../../config';
import { Grid } from '@material-ui/core';

const SearchComponent = (props) => {
    let [input, setInput] = useState('');
    let [searchResultsDefault, setSearchResultsDefault] = useState([]);
    let [searchResults, setSearchResults] = useState([]);

    const fetchData = async () => {
        axios
            .get(config.apiUrl + '/tunes')
            .then((result) => {
                setSearchResults(result.data);
                setSearchResultsDefault(result.data);
            });
    }

    const updateInput = async (input) => {
        const filtered = searchResultsDefault.filter(result => {
            let lowInput = input.toLowerCase();
            return result.tuneReference.toLowerCase().includes(lowInput) ||
                result.textReference.toLowerCase().includes(lowInput) ||
                result.soundReference.toLowerCase().includes(lowInput) ||
                result.videoReference.toLowerCase().includes(lowInput)
        })
        setInput(input);
        setSearchResults(filtered);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Grid item xs={11} container spacing={2} direction='column'>
            <Grid item>
                <SearchBar
                    input={input}
                    setKeyword={updateInput}
                />
            </Grid>
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