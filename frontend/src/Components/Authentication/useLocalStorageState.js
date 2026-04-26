import React from 'react';

const useLocalStorageState = localStorageKey => {
    const [value, setValue] = React.useState(() => {
        try {
            return JSON.parse(localStorage.getItem(localStorageKey)) || null;
        } catch {
            return null;
        }
    });

    React.useEffect(() => {
        if (value === null)
            localStorage.removeItem(localStorageKey);
        else
            localStorage.setItem(localStorageKey, JSON.stringify(value));
        
    }, [value, localStorageKey]);
    return [value, setValue];
};

export default useLocalStorageState;