import { ModelService } from '../Services';
import { TuneMelodyModel } from '.';

export const TuneTranscriptionModel = ModelService.GenerateDefaults({
    table: {
        label: 'tune.transcription',
        fields: [
            { field: 'transcriptionSources', headerName: 'transcription.source', selector: 'title' },
            { field: null, headerName: 'transcription.fileReference' },
            {
                field: 'transcriptionsPersonsRoles',
                array: true,
            }
        ]
    },
    view: {
        label: 'tune.transcription',
        fields: [
            { field: 'transcriptionSources', headerName: 'transcription.source', selector: 'title' },
            { field: 'transcriptionsPersonsRoles', headerName: 'transcription.source', selector: 'title',array: true }
        ]
    },
    edit: {
        label: 'tune.coding',
        fields: [
            { field: 'id', hidden: true },
            { field: 'transcriptionSourceId', type: 'dropdown', apiPath: 'transcription-sources', headerName: 'transcription.source' },
            { field: 'created', type: 'view', timestamp: true, headerName: 'date.created' },
            { field: 'modified', type: 'view', timestamp: true, headerName: 'date.modified' }
        ]
    },
});