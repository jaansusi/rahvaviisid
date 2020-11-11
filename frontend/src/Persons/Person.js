import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";

const Person = (() => {
    let { id } = useParams();
    let [data, setData] = useState({})

    useEffect(() => {
        fetch("http://localhost:3000/persons/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    console.log(result);
                }
            )
    }, [id]);

    return (
        <table border="1">
            <tbody>
                <tr>
                    <th>PID</th>
                    <td>{data.pid}</td>
                </tr>
                <tr>
                    <th>Eesnimi</th>
                    <td>{data.givenName}</td>
                </tr>
                <tr>
                    <th>Perekonnanimi</th>
                    <td>{data.surname}</td>
                </tr>
                <tr>
                    <th>Kirje loodud</th>
                    <td>{data.created}</td>
                </tr>
            </tbody>
        </table>
    );
});

export default Person;