import axios from 'axios';

axios.interceptors.response.use((response) => {
    let replaceNulls = ((tempObj) => {
        for (let field in tempObj) {
            let value = tempObj[field];
            if (value === null) {
                tempObj[field] = '';
                continue;
            }
            if (typeof value === 'object' && value !== null) {
                tempObj[field] = replaceNulls(tempObj[field]);
                continue;
            }
        }
        return tempObj;
    });
    response.data = replaceNulls(response.data); 
    return response;
}, (errorResponse) => {
    console.log(errorResponse);
    return errorResponse;
})