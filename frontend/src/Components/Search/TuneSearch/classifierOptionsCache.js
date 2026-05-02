import axios from 'axios';
import config from '../../../config';

// Per-apiPath in-flight + resolved promise cache so each option list is fetched
// at most once per page lifetime, regardless of how many filter widgets ask.
const cache = new Map();

export const fetchClassifierOptions = (apiPath) => {
    if (!cache.has(apiPath)) {
        const promise = axios
            .get(`${config.apiUrl}/${apiPath}`)
            .then(res => Array.isArray(res.data) ? res.data : [])
            .catch(err => {
                console.error(`Failed to load classifier ${apiPath}`, err);
                cache.delete(apiPath);
                return [];
            });
        cache.set(apiPath, promise);
    }
    return cache.get(apiPath);
};
