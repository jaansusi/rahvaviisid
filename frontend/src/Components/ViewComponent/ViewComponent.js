import React, { useState, useEffect } from 'react';
import {
    useParams
} from "react-router-dom";
import config from '../../config';
import { useTranslation } from "react-i18next";

const ViewComponent = ((props) => {
    const { t } = useTranslation('common');
    let { id } = useParams();
    let [data, setData] = useState({})
    let objectMap = props.map;
    useEffect(() => {
        fetch(config.apiUrl + '/' + objectMap.apiPath + '/' + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    console.log(result);
                }
            )
    }, [id, objectMap.apiPath]);

    return (
        <table border="1">
            <tbody>
                {
                    objectMap.view.map((map, i) => {
                        return (
                            <tr>
                                <th>{t(map.header)}</th>
                                <td>{map.getter(data)}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
});

export default ViewComponent;