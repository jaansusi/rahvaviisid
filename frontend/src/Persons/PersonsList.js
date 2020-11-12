import React, { useState, useEffect } from 'react';
import {
    Link,
    useRouteMatch
} from 'react-router-dom';
import SortableTable from '../Components/SortableTable';

const PersonsList = (props) => {
    let { url } = useRouteMatch();
    let [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/persons")
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    console.log(result);
                },
                (error) => {
                    console.error(error);
                }
            );
    }, []);
    let headers = [
        'Pid',
        'Perekonnanimi',
        'Eesnimi',
        'Hüüdnimi',
        'Sünniaasta',
        'Surma-aasta',
        'Sugu',
        'Tegevused'
    ];
    let getters = [
        x => x.pid,
        x => x.surname,
        x => x.givenName,
        x => x.nickname,
        x => x.birthYear,
        x => x.deathYear,
        x => x.sexId,
        x => <Link to={`${url}/` + x.id}>Vaata</Link>
    ];
    return (
        <SortableTable tableHeaders={headers} dataGetters={getters} url={url} tableData={data}  />
    );

}

export default PersonsList;