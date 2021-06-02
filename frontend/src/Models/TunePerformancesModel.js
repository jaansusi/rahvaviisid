import { ModelService } from '../Services';

export const TunePerformancesModel = ModelService.GenerateDefaults({
    table: {
        label: 'performance.performance',
        fields: [
            { field: 'actualPerformanceTypes', headerName: 'performance.actual.type', selector: 'description'},
            { field: 'traditionalPerformanceTypes', headerName: 'performance.traditional.type', selector: 'description'},
            { field: 'actualActionTypes', headerName: 'performance.actual.action', selector: 'description'},
            { field: null, headerName: 'performance.traditional.action'},
            { field: 'accompaniment', headerName: 'performance.accompaniment'}
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'actualPerformanceTypes', headerName: 'performance.actual.type', selector: 'description'},
            { field: 'traditionalPerformanceTypes', headerName: 'performance.traditional.type', selector: 'description'},
            { field: 'actualActionTypes', headerName: 'performance.actual.action', selector: 'description'},
            { field: 'accompaniment', headerName: 'performance.accompaniment'},
            { field: 'remarks', headerName: 'common.remarks'}
        ]
    }
});