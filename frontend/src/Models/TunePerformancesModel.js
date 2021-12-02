import { ModelService } from '../Services';

export const TunePerformancesModel = ModelService.GenerateDefaults({
    table: {
        label: 'performance.performance',
        fields: [
            { field: 'actualPerformanceTypes', headerName: 'performance.actual.type', selector: 'title', alt: 'description', type: 'reference', reference: '/klassifikaatorid/tegeliku-esituse-liik' },
            { field: 'traditionalPerformanceTypes', headerName: 'performance.traditional.type', selector: 'title', alt: 'description', type: 'reference', reference: '/klassifikaatorid/traditsioonilise-esituse-liik' },
            { field: 'actualActionTypes', headerName: 'performance.actual.action', selector: 'title', alt: 'description', type: 'reference', reference: '/klassifikaatorid/tegeliku-tegevuse-liik' },
            { field: 'traditionalActionTypes', headerName: 'performance.traditional.action', selector: 'title', alt: 'description' },
            { field: 'accompaniment', headerName: 'performance.accompaniment'},
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks'}
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'actualPerformanceTypeId', type: 'dropdown', apiPath: 'actual-performance-types', headerName: 'performance.actual.type' },
            { field: 'traditionalPerformanceTypeId', type: 'dropdown', apiPath: 'traditional-performance-types', headerName: 'performance.traditional.type' },
            { field: 'actualActionTypeId', type: 'dropdown', apiPath: 'actual-action-types', headerName: 'performance.actual.action' },
            { field: 'traditionalActionTypes', type: 'multiselect', apiPath: 'traditional-action-types', selector: 'id', headerName: 'performance.traditional.action'},
            { field: 'accompaniment', headerName: 'performance.accompaniment'},
            { field: 'remarks', type: 'textbox', headerName: 'common.remarks'}
        ]
    }
});