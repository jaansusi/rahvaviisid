import axios from 'axios';
import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import config from '../config';

const SearchComponent = (props) => {
    const [input, setInput] = useState('');
    const [searchResultsDefault, setSearchResultsDefault] = useState([]);
    const [searchResults, setSearchResults] = useState([]);

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
        <>
            <SearchBar
                input={input}
                setKeyword={updateInput}
            />
            <SearchResults assets={searchResults} />
        </>
    );
}

export default SearchComponent;