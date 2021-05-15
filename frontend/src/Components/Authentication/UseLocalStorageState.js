import React from 'react';

const UseLocalStorageState = localStorageKey => {
    const [value, setValue] = React.useState(
        JSON.parse(localStorage.getItem(localStorageKey)) || null
    );

    React.useEffect(() => {
        if (value === null)
            localStorage.removeItem(localStorageKey);
        else
            localStorage.setItem(localStorageKey, JSON.stringify(value));
        
    }, [value, localStorageKey]);
    return [value, setValue];
};

export default UseLocalStorageState;