export const GetDataGridLocale = ((translateFunction) => {

    let locale = DATA_GRID_LOCALE;

    let tempLocale = {};
    Object.keys(locale).map(key =>
        tempLocale[key] = translateFunction(locale[key])
    );

    tempLocale.toolbarFiltersTooltipActive = (count) => count !== 1 ? `${count} ` + translateFunction('datagrid.activeFilter') : `${count} ` + translateFunction('datagrid.activeFilters');
    tempLocale.columnHeaderFiltersTooltipActive = (count) => count !== 1 ? `${count} ` + translateFunction('datagrid.activeFilter') : `${count} ` + translateFunction('datagrid.activeFilters');
    tempLocale.footerRowSelected = (count) => count !== 1 ? `${count.toLocaleString()} ` + translateFunction('datagrid.rowsSelected') : `${count.toLocaleString()} ` + translateFunction('datagrid.rowSelected');
    
    tempLocale.MuiTablePagination = {
        labelRowsPerPage: translateFunction('datagrid.labelRowsPerPage'),
        labelDisplayedRows: ({ from, to, count }) => '' + from + '-' + to + translateFunction('datagrid.of') + count
    };
    
    return tempLocale;
}
);

const DATA_GRID_LOCALE = {
    // Root
    noRowsLabel: 'datagrid.noRows',
    noResultsOverlayLabel: 'datagrid.noResults',
    errorOverlayDefaultLabel: 'datagrid.error',

    // Density selector toolbar button text
    toolbarDensity: 'datagrid.density.label',
    toolbarDensityLabel: 'datagrid.density.label',
    toolbarDensityCompact: 'datagrid.density.compact',
    toolbarDensityStandard: 'datagrid.density.standard',
    toolbarDensityComfortable: 'datagrid.density.comfortable',

    // Columns selector toolbar button text
    toolbarColumns: 'datagrid.toolbar.columns',
    toolbarColumnsLabel: 'datagrid.toolbar.columns',

    // Filters toolbar button text
    toolbarFilters: 'datagrid.toolbar.filters',
    toolbarFiltersLabel: 'datagrid.toolbar.filters',
    toolbarFiltersTooltipHide: 'datagrid.toolbar.hideFilters',
    toolbarFiltersTooltipShow: 'datagrid.toolbar.showFilters',
    toolbarFiltersTooltipActive: (count) => '',

    // Export selector toolbar button text
    toolbarExport: 'datagrid.toolbar.export',
    toolbarExportLabel: 'datagrid.toolbar.export',
    toolbarExportCSV: 'datagrid.toolbar.exportCsv',

    // Columns panel text
    columnsPanelTextFieldLabel: 'datagrid.columns.label',
    columnsPanelTextFieldPlaceholder: 'datagrid.columns.placeholder',
    columnsPanelDragIconLabel: 'datagrid.columns.dragLabel',
    columnsPanelShowAllButton: 'datagrid.columns.showAll',
    columnsPanelHideAllButton: 'datagrid.columns.hideAll',

    // Filter panel text
    filterPanelAddFilter: 'datagrid.filter.add',
    filterPanelDeleteIconLabel: 'datagrid.filter.deleteLabel',
    filterPanelOperators: 'datagrid.filter.operators',
    filterPanelOperatorAnd: 'datagrid.filter.and',
    filterPanelOperatorOr: 'datagrid.filter.or',
    filterPanelColumns: 'datagrid.filter.columns',
    filterPanelInputLabel: 'datagrid.filter.inputLabel',
    filterPanelInputPlaceholder: 'datagrid.filter.inputPlaceholder',

    // Filter operators text
    filterOperatorContains: 'datagrid.filter.operator.contains',
    filterOperatorEquals: 'datagrid.filter.operator.equals',
    filterOperatorStartsWith: 'datagrid.filter.operator.startsWith',
    filterOperatorEndsWith: 'datagrid.filter.operator.endsWith',
    filterOperatorIs: 'datagrid.filter.operator.is',
    filterOperatorNot: 'datagrid.filter.operator.isNot',
    filterOperatorAfter: 'datagrid.filter.operator.isAfter',
    filterOperatorOnOrAfter: 'datagrid.filter.operator.onOrAfter',
    filterOperatorBefore: 'datagrid.filter.operator.isBefore',
    filterOperatorOnOrBefore: 'datagrid.filter.operator.onOrBefore',

    // Filter values text
    filterValueAny: 'datagrid.filter.any',
    filterValueTrue: 'datagrid.filter.true',
    filterValueFalse: 'datagrid.filter.false',

    // Column menu text
    columnMenuLabel: 'datagrid.column.label',
    columnMenuShowColumns: 'datagrid.column.showColumns',
    columnMenuFilter: 'datagrid.column.filter',
    columnMenuHideColumn: 'datagrid.column.hideColumn',
    columnMenuUnsort: 'datagrid.column.unsort',
    columnMenuSortAsc: 'datagrid.column.sortAsc',
    columnMenuSortDesc: 'datagrid.column.sortDesc',

    // Column header text
    columnHeaderFiltersTooltipActive: (count) => '',
    columnHeaderFiltersLabel: 'datagrid.column.filtersLabel',
    columnHeaderSortIconLabel: 'datagrid.column.sortLabel',

    // Rows selected footer text
    footerRowSelected: (count) => '',

    // Total rows footer text
    footerTotalRows: 'datagrid.footerTotalRows',

    // Checkbox selection text
    checkboxSelectionHeaderName: 'datagrid.checkboxSelection',

    // Boolean cell text
    booleanCellTrueLabel: 'datagrid.trueLabel',
    booleanCellFalseLabel: 'datagrid.falseLabel',
}