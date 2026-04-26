import React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { DataService } from '../../../Services';
import { FIELD_TYPES } from '../../../constants';

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
                                                return (<TableCell key={j}></TableCell>);
                                            }
                                            return (
                                                <TableCell align={j === 0 ? 'left' : 'right'} key={j}>
                                                    {
                                                        field.type === 'url' ?
                                                            <a
                                                                target="_blank"
                                                                rel="noreferrer noopener"
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
                                                                field.type === FIELD_TYPES.DROPDOWN ?
                                                                    <a
                                                                        href={field.reference + '/' + row[field.field].id + '/vaata'}
                                                                        title={field.alt ? row[field.field][field.alt] : undefined}
                                                                    >
                                                                        {
                                                                            DataService.GetValueWithSelector(field, row)
                                                                        }
                                                                    </a>
                                                                    :
                                                                    field.type === FIELD_TYPES.BOOLEAN ?
                                                                        <>{row[field.field] ? t('model.true') : t('model.false')}</>
                                                                        :
                                                                        <span title={field.alt ? row[field.field][field.alt] : undefined}>
                                                                            {
                                                                                DataService.GetValueWithSelector(field, row)
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