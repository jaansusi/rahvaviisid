import React, { useState, useEffect } from 'react';
import {
    Link,
    useRouteMatch
} from 'react-router-dom';

const PersonsList = (props) => {
    let { url } = useRouteMatch();
    let [items, setItems] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/persons")
        .then(res => res.json())
        .then(
            (result) => {
                setItems(result);
            },
            (error) => {
                console.error(error);
            }
        );
    }, []);
    return (
        <table border="1">
            <thead>
                <tr>
                    <td>Id</td>
                    <td>Pid</td>
                    <td>Eesnimi</td>
                    <td>Perekonnanimi</td>
                    <td>Tegevused</td>
                </tr>
            </thead>
            <tbody>
                {items.map(item => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.pid}</td>
                        <td>{item.givenName}</td>
                        <td>{item.surname}</td>
                        <td>
                            <Link to={`${url}/` + item.id}>Vaata</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

}

export default PersonsList;