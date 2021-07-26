import { ModelService } from '../Services';

export const TuneTranscriptionModel = ModelService.GenerateDefaults({
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
                        { field: 'transcriptionPersonRoleTypes', headerName: 'transcription.personRole', selector: 'title' },
                        { field: 'tuneReference', headerName: 'tune.tuneReference' },
                    ]
                }
            }
        ]
    },
    edit: {
        label: 'tune.transcription',
        fields: [
            { field: 'id', hidden: true },
            { field: 'transcriptionSourceId', type: 'dropdown', apiPath: 'transcription-sources', headerName: 'transcription.source' },
            { field: 'fileReference', headerName: 'transcription.fileReference' },
            { field: 'created', type: 'view', timestamp: true, headerName: 'date.created' },
            { field: 'modified', type: 'view', timestamp: true, headerName: 'date.modified' },
            {
                field: 'transcriptionsPersonsRoles',
                headerName: 'transcription.source',
                type: 'table',
                nested: {
                    label: 'transcription.transcriptionPersons',
                    fields: [
                        { field: 'persons', headerName: 'person.name', selector: ['givenName', 'surname'] },
                        { field: 'actionYear', headerName: 'transcription.actionYear' },
                        { field: 'transcriptionPersonRoleTypes', headerName: 'transcription.personRole', selector: 'title' },
                        { field: 'remarks', type: 'textbox', headerName: 'common.remarks' },
                    ]
                },
                edit: {
                    label: '',
                    fields: [
                        { field: 'personId', type: 'dropdown', apiPath: 'persons', headerName: 'person.person', title: ['givenName', 'surname'] },
                        { field: 'actionYear', headerName: 'transcription.actionYear' },
                        { field: 'transcriptionPersonRoleTypeId', type: 'dropdown', apiPath: 'transcription-person-role-types', headerName: 'transcription.personRole' },
                        { field: 'remarks', type: 'textbox', headerName: 'common.remarks' },
                    ]
                }
            }
        ]
    },
});