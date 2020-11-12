import React from 'react';
import './SortableTable.css';

const SortableTable = ((props) => {

    return (
        <table className='sortable-table'>
            <thead>
                <tr>
                    {
                        props.tableHeaders.map(x => {
                            return (<th>{x}</th>)
                        })
                    }
                </tr>
            </thead>
            <tbody>
                {
                    props.tableData.map(item => {
                        return (
                            <tr>
                                {
                                    props.dataGetters.map(x => {
                                        return (
                                            <td>{x(item)}</td>
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