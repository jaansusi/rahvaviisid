import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@material-ui/core";
import { useTranslation } from 'react-i18next';

export const TableViewComponent = ({ value, model }) => {
    const { t } = useTranslation('common');
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {
                            model.fields.map((field, i) => {
                                return (<TableCell align={i === 0 ? 'left' : 'right'} key={i}>{t(field.headerName)}</TableCell>);
                            })
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        value?.map((row, i) => {
                            return (
                                <TableRow key={i}>
                                    {
                                        model.fields.map((field, j) => {
                                            if (row[field.field] === undefined) {
                                                return (<TableCell key={j}> </TableCell>);
                                            }
                                            return (
                                                <TableCell align={j === 0 ? 'left' : 'right'} key={j}>
                                                    {
                                                        field.type === 'url' ?
                                                            // eslint-disable-next-line react/jsx-no-target-blank
                                                            <a
                                                                target="_blank"
                                                                href={field.format.replace('%url%', row[field.field])}
                                                            >
                                                                {t('action.kivike')}
                                                            </a>
                                                            :
                                                            field.type === 'reference' ?
                                                                <a
                                                                    href={field.reference + '/' + row[field.field].id + '/vaata'}
                                                                    title={field.alt ? row[field.field][field.alt] : undefined}
                                                                >
                                                                    {
                                                                        field.selector ?
                                                                            Array.isArray(field.selector) ?
                                                                                field.selector.map(x => row[field.field][x]).join(' ') :
                                                                                row[field.field][field.selector] :
                                                                            row[field.field]
                                                                    }
                                                                </a>
                                                                :
                                                                <span title={field.alt ? row[field.field][field.alt] : undefined}>
                                                                    {
                                                                        field.selector ?
                                                                            Array.isArray(field.selector) ?
                                                                                field.selector.map(x => row[field.field][x]).join(' ') :
                                                                                row[field.field][field.selector] :
                                                                            row[field.field]
                                                                    }
                                                                </span>
                                                    }
                                                </TableCell>
                                            );
                                        })
                                    }
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
}