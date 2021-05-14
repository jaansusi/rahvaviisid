import { ModelService } from '../Services';
import { TuneMelodyModel } from '.';

export const TuneTranscriptionModel = ModelService.GenerateDefaults({
    table: {
        label: 'tune.transcription',
        fields: [
            { field: 'transcriptionSources', headerName: 'transcription.source', selector: 'title' },
            { field: 'created', headerName: 'date.created' },
            { field: 'modified', headerName: 'date.modified' }
        ]
    },
    view: {
        label: 'tune.transcription',
        fields: [
            { field: 'transcriptionSources', headerName: 'transcription.source', selector: 'title' },
            { field: 'created', headerName: 'date.created' },
            { field: 'modified', headerName: 'date.modified' },
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
        label: 'tune.transcription',
        fields: [
            { field: 'id', hidden: true },
            { field: 'transcriptionSourceId', type: 'dropdown', apiPath: 'transcription-sources', headerName: 'transcription.source' },
            { field: 'created', type: 'view', headerName: 'date.created' },
            { field: 'modified', type: 'view', headerName: 'date.modified' },
            // {
            //     field: 'tuneMelodies',
            //     type: 'model',
            //     array: true,
            //     sortBy: 'variationIndex',
            //     nested: TuneMelodyModel.edit
            // }
        ]
    },
});