import React from 'react';
import { useTranslation } from "react-i18next";
import { TableRow, TableCell } from '@material-ui/core';
import TunePlayer from '../Tunes/TunePlayer';

const ViewDataFragment = (({ model, elementData, extraComponent }) => {
    const { t } = useTranslation('common');
    return (
        <>
            {
                model.fields.map((modelField, i) => {
                    if (modelField.type === 'array') {
                        let data =
                            modelField.sortBy === undefined
                                ? elementData[modelField.field]
                                : elementData[modelField.field].sort((a, b) => a[modelField.sortBy] - b[modelField.sortBy]);
                        console.log(elementData);
                        return (
                            data.map((elem, j) => (
                                <ViewDataFragment
                                    model={modelField.nested}
                                    elementData={elem}
                                    key={'viewfragment' + i + j}
                                    title={t(modelField.nested.headerName) + (j + 1)}
                                    extraComponent={
                                        modelField.extraComponent === 'TunePlayer' ?
                                            <TunePlayer
                                                formData={elementData}
                                                index={j}
                                            />
                                            : undefined
                                    }
                                />
                            ))
                        );
                    }
                    return modelField.hidden !== undefined && modelField.hidden ? null :
                        <TableRow key={'row' + i}>
                            <TableCell align="left">{t(modelField.headerName)}</TableCell>
                            <TableCell align="left">{elementData[modelField.field]}</TableCell>
                        </TableRow>
                        ;
                })
            }
            {
                extraComponent !== undefined ?
                    <TableRow>
                        <TableCell>
                            {extraComponent}
                        </TableCell>
                    </TableRow> :
                    null
            }
        </>
    );
});

export default ViewDataFragment;