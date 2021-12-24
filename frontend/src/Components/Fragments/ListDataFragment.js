import React, { useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { DataGrid } from '@material-ui/data-grid';
import Actions from '../Buttons/Actions';
import CreateButton from '../Buttons/CreateButton';
import { AuthService, DataService } from '../../Services';
import { GetDataGridLocale } from '../../translations/DataGridLocale';
import { Grid } from '@material-ui/core';
import { useLocation } from 'react-router-dom';

const ListDataFragment = (({ model, data, rowCount, updateTable, currentView, additionalButtons, viewOnly, actionUrlOverride }) => {
    const { t } = useTranslation('common');
    let { pathname } = useLocation();

    if (!additionalButtons)
        additionalButtons = [];
    let columns = model.fields.map((modelField) => {
        let x = {};
        x.headerName = t(modelField.headerName);
        x.sortable = false;
        x.field = modelField.field;
        x.width = modelField.width;
        x.valueGetter = (params) => {
            return modelField.selector ?
                params.value[modelField.selector] :
                params.value;
        };
        switch (modelField.type) {
            case 'number':
                x.valueFormatter = (params) => {
                    if (params.value === null)
                        return '';
                    return params.value.toString()
                };
                break;
            case 'parentHref':
                x.valueGetter = (params) => params.row;
                x.renderCell = (params) => {
                    if (params.row[modelField.field] !== undefined)
                        return (
                            <a href={pathname + '/' + params.row[modelField.field].id + '/vaata'}>
                                {DataService.GetValueWithSelector(modelField, params.row)}
                            </a>
                        );
                    return <></>;
                };
                break;
            case 'boolean':
                x.valueGetter = (params) => params.row[x.field] ? t('model.true') : t('model.false');
                break;
            default:
                break;
        }
        return x;
    });
    let canAccess = AuthService.CanAccess(['editor', 'admin']);
    let actionButtonCount = canAccess && !viewOnly ? (currentView !== undefined ? 2 : 3) : 1 + additionalButtons.length;
    let actionsWidth = actionButtonCount === 1 ? 150 : actionButtonCount * 130;
    columns.push({
        field: '', headerName: t('action.actions'), sortable: false, width: actionsWidth,
        renderCell: (params) =>
            <Actions
                auth={canAccess && !viewOnly}
                apiPath={model.apiPath}
                id={params.row.id}
                currentView={currentView}
                additionalButtons={additionalButtons}
                pathOverride={actionUrlOverride}
            />
    });

    useEffect(() => { updateTable(0) }, []);

    let tableWidth = columns.map(x => x.width ? x.width : 130).reduce((x, y) => x + y, 0) + 2;
    return (
        <Grid item
            container
            alignItems='center'
            direction='column'
            spacing={2}
        >
            {
                canAccess &&
                !viewOnly &&
                <Grid item>
                    <CreateButton />
                </Grid>
            }
            <div style={{ width: tableWidth, height: '80vh' }}>
                <DataGrid
                    paginationMode={viewOnly ? 'client' : 'server'}
                    rowCount={rowCount}
                    rows={data}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[]}
                    sortingOrder={[]}
                    onPageChange={(x) => updateTable((x.page) * x.pageSize)}
                    localeText={GetDataGridLocale(t)}
                    componentsProps={{
                        pagination: {
                            labelRowsPerPage: t('datagrid.labelRowsPerPage'),
                            labelDisplayedRows:
                                ({ from, to, count }) => {
                                    return '' + from + '-' + to + t('datagrid.of') + count
                                }
                        }
                    }}
                />
            </div>
        </Grid>
    );
});

export default ListDataFragment;