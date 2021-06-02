import { ModelService } from '../Services';
import { TuneMelodyModel } from '.';

export const TuneTranscriptionModel = ModelService.GenerateDefaults({
    table: {
        label: 'tune.transcription',
        fields: [
            { field: 'transcriptionSources', headerName: 'transcription.source', selector: 'title' },
            { field: null, headerName: 'transcription.fileReference' }
        ]
    },
    view: {
        label: 'tune.transcription',
        fields: [
            { field: 'transcriptionSources', headerName: 'transcription.source', selector: 'title' },
            {
                field: 'tuneMelodies',
                type: 'model',
                array: true,
                sortBy: 'variationIndex',
                nested: TuneMelodyModel.view
            }
        ]
    },
    edit: {
        label: 'tune.coding',
        fields: [
            { field: 'id', hidden: true },
            { field: 'transcriptionSourceId', type: 'dropdown', apiPath: 'transcription-sources', headerName: 'transcription.source' },
            { field: 'created', type: 'view', timestamp: true, headerName: 'date.created' },
            { field: 'modified', type: 'view', timestamp: true, headerName: 'date.modified' },
            {
                field: 'tuneMelodies',
                type: 'model',
                array: true,
                sortBy: 'variationIndex',
                nested: TuneMelodyModel.edit
            }
        ]
    },
});