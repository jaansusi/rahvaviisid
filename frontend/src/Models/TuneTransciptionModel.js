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
            {
                field: 'transcriptionsPersonsRoles',
                headerName: 'transcription.source',
                type: 'model',
                nested: {
                    label: 'transcription.label',
                    fields: [
                        { field: 'persons', headerName: 'person.name', selector: ['givenName', 'surname'] },
                        { field: 'transcriptionPersonRoleTypes', selector: 'title' },
                        { field: 'tuneReference', headerName: 'tune.tuneReference' },
                    ]
                }
            }
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