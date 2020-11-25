import React from 'react';
import Actions from '../Components/Actions';
import { useTranslation } from "react-i18next";
import './SortableTable.css';

const SortableTable = ((props) => {
    const { t } = useTranslation('common');
    return (
        <table className='sortable-table'>
            <thead>
                <tr>
                    {
                        props.tableHeaders
                            .concat([t('action.actions')])
                            .map((x, i) => {
                                return (<th key={i}>{x}</th>)
                            })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.tableData.map((item, i) => {
                        return (
                            <tr key={i}>
                                {
                                    props.dataGetters
                                        .concat([x => <Actions url={props.url} id={x.id} />])
                                        .map((x, j) => {
                                            return (
                                                <td key={j}>{x(item)}</td>
                                            )
                                        })
                                }
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    );
});

export default SortableTable;