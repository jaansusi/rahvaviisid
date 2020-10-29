import React, { useState } from 'react';
import {
    Link
} from 'react-router-dom';

const PersonsList = (props) => {
    let [ items, setItems ] = useState([]);
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
                            <Link to={`${props.url}` + item.id}>Vaata</Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

}

export default PersonsList;