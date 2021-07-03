import { ModelService } from '../Services';

export const TunePerformancesModel = ModelService.GenerateDefaults({
    table: {
        label: 'performance.performance',
        fields: [
            { field: 'actualPerformanceTypes', headerName: 'performance.actual.type', selector: 'description'},
            { field: 'traditionalPerformanceTypes', headerName: 'performance.traditional.type', selector: 'description'},
            { field: 'actualActionTypes', headerName: 'performance.actual.action', selector: 'description'},
            { field: null, headerName: 'performance.traditional.action'},
            { field: 'accompaniment', headerName: 'performance.accompaniment'},
            { field: 'remarks', headerName: 'common.remarks'}        
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'actualPerformanceTypeId', type: 'dropdown', apiPath: 'actual-performance-types', headerName: 'performance.actual.type' },
            { field: 'traditionalPerformanceTypeId', type: 'dropdown', apiPath: 'traditional-performance-types', headerName: 'performance.traditional.type' },
            { field: 'actualActionTypeId', type: 'dropdown', apiPath: 'actual-action-types', headerName: 'performance.actual.action' },
            { field: 'accompaniment', headerName: 'performance.accompaniment'},
            { field: 'remarks', headerName: 'common.remarks'}
        ]
    }
});