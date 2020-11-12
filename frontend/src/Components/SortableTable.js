import React from 'react';
import './SortableTable.css';

const SortableTable = ((props) => {

    return (
        <table className='sortable-table'>
            <thead>
                <tr>
                    {
                        props.tableHeaders.map((x, i) => {
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
                                    props.dataGetters.map((x, j) => {
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