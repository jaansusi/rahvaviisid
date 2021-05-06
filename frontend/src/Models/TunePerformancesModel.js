import { ModelService } from '../Services';

export const TunePerformancesModel = ModelService.GenerateDefaults({
    table: {
        label: 'performance.performance',
        fields: [
            { field: 'actualPerformanceTypes', headerName: 'performance.actual.type', selector: 'title'},
            { field: 'traditionalPerformanceTypes', headerName: 'performance.traditional.type', selector: 'title'},
            { field: 'actualActionTypes', headerName: 'performance.actual.action', selector: 'title'},
            { field: 'accompaniment', headerName: 'performance.accompaniment'},
            { field: 'remarks', headerName: 'common.remarks'}
        ]
    },
    edit: {
        fields: [
            { field: 'id', hidden: true },
            { field: 'tunesId', hidden: true },
            { field: 'actualPerformanceTypes', headerName: 'performance.actual.type', selector: 'title'},
            { field: 'traditionalPerformanceTypes', headerName: 'performance.traditional.type', selector: 'title'},
            { field: 'actualActionTypes', headerName: 'performance.actual.action', selector: 'title'},
            { field: 'accompaniment', headerName: 'performance.accompaniment'},
            { field: 'remarks', headerName: 'common.remarks'}
        ]
    }
});